import { afterEach, describe, expect, it, vi } from 'vitest';
import worker from '../src/worker.js';

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe('automatic school-prefix routing', () => {
	it('logs in through the generic host and saves the prefix from its redirect', async () => {
		const upstreamFetch = vi.fn(async () => new Response(null, {
			status: 302,
			headers: {
				location: 'https://s19.idu.edu.pl/',
				'set-cookie': '_idu_session=abc; Domain=.idu.edu.pl; Path=/',
			},
		}));
		vi.stubGlobal('fetch', upstreamFetch);

		const response = await worker.fetch(new Request('https://app.example/users/sign_in', {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				cookie: 'idu_school_prefix=s35; _idu_session=old',
				origin: 'https://app.example',
			},
			body: new URLSearchParams({
				'user[login]': 'student',
				'user[password]': 'secret',
			}),
		}));

		const [upstreamUrl, options] = upstreamFetch.mock.calls[0];
		expect(upstreamUrl).toBe('https://idu.edu.pl/users/sign_in');
		expect(options.headers.host).toBe('idu.edu.pl');
		expect(options.headers.origin).toBe('https://idu.edu.pl/');
		expect(options.headers.cookie).toBe('_idu_session=old');
		expect(response.headers.get('location')).toBe('https://app.example/');
		expect(response.headers.get('set-cookie')).toContain('idu_school_prefix=s19');
		expect(response.headers.get('set-cookie')).not.toContain('Domain=.idu.edu.pl');
	});

	it('uses the saved prefix for requests after login', async () => {
		const upstreamFetch = vi.fn(async () => new Response('ok', {
			headers: { 'content-type': 'text/plain' },
		}));
		vi.stubGlobal('fetch', upstreamFetch);

		await worker.fetch(new Request('https://app.example/messages', {
			headers: { cookie: 'idu_school_prefix=s247; session=abc' },
		}));

		expect(upstreamFetch.mock.calls[0][0]).toBe('https://s247.idu.edu.pl/messages');
		expect(upstreamFetch.mock.calls[0][1].headers.cookie).toBe('session=abc');
	});

	it('ignores invalid saved prefixes and always sends sign-in to the generic host', async () => {
		const upstreamFetch = vi.fn(async () => new Response('ok', {
			headers: { 'content-type': 'text/plain' },
		}));
		vi.stubGlobal('fetch', upstreamFetch);

		await worker.fetch(new Request('https://app.example/messages', {
			headers: { cookie: 'idu_school_prefix=attacker' },
		}));
		await worker.fetch(new Request('https://app.example/users/sign_in', {
			headers: { cookie: 'idu_school_prefix=s19' },
		}));

		expect(upstreamFetch.mock.calls[0][0]).toBe('https://idu.edu.pl/messages');
		expect(upstreamFetch.mock.calls[1][0]).toBe('https://idu.edu.pl/users/sign_in');
	});
});
