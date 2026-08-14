import { afterEach, describe, expect, it, vi } from 'vitest';
import worker from '../src/worker.js';

const signInHtml = `<!doctype html>
<html>
	<head><title>Sign in</title></head>
	<body>
		<form id="new_user" action="/users/sign_in" method="post">
			<input name="authenticity_token" value="token-from-school">
		</form>
	</body>
</html>`;

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe('school routing', () => {
	it('loads and marks the selected school on the sign-in page', async () => {
		const upstreamFetch = vi.fn(async () => new Response(signInHtml, {
			headers: {
				'content-type': 'text/html; charset=utf-8',
				'set-cookie': '_idu_session=s19-session; Domain=.idu.edu.pl; Path=/',
			},
		}));
		vi.stubGlobal('fetch', upstreamFetch);

		const response = await worker.fetch(new Request(
			'https://app.example/users/sign_in?idu_school=s19',
			{ headers: { cookie: '_idu_session=old; idu_school=s35' } }
		));

		expect(upstreamFetch).toHaveBeenCalledOnce();
		const [upstreamUrl, options] = upstreamFetch.mock.calls[0];
		expect(upstreamUrl).toBe('https://s19.idu.edu.pl/users/sign_in');
		expect(options.headers.host).toBe('s19.idu.edu.pl');
		expect(options.headers.cookie).toBe('_idu_session=old');

		const html = await response.text();
		expect(html).toContain('id="idu_school"');
		expect(html).toMatch(/value="s19" selected(?:="")?/);
		expect(response.headers.get('set-cookie')).toContain('idu_school=s19');
		expect(response.headers.get('set-cookie')).toContain('Domain=app.example');
	});

	it('posts credentials to the selected school without leaking the proxy field', async () => {
		const upstreamFetch = vi.fn(async () => new Response(null, {
			status: 302,
			headers: { location: 'https://s19.idu.edu.pl/' },
		}));
		vi.stubGlobal('fetch', upstreamFetch);

		const body = new URLSearchParams({
			'authenticity_token': 'token-from-s19',
			'user[login]': 'student',
			'user[password]': 'secret',
			idu_school: 's19',
		});
		const response = await worker.fetch(new Request('https://app.example/users/sign_in', {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				cookie: 'idu_school=s35; _idu_session=s19-session',
				origin: 'https://app.example',
			},
			body,
		}));

		const [upstreamUrl, options] = upstreamFetch.mock.calls[0];
		expect(upstreamUrl).toBe('https://s19.idu.edu.pl/users/sign_in');
		expect(options.headers.origin).toBe('https://s19.idu.edu.pl/');
		expect(options.headers.cookie).toBe('_idu_session=s19-session');
		const forwardedBody = new URLSearchParams(new TextDecoder().decode(options.body));
		expect(forwardedBody.get('user[login]')).toBe('student');
		expect(forwardedBody.get('idu_school')).toBeNull();
		expect(response.headers.get('location')).toBe('https://app.example/');
		expect(response.headers.get('set-cookie')).toContain('idu_school=s19');
	});

	it('uses the saved school for later requests and rejects unknown hosts', async () => {
		const upstreamFetch = vi.fn(async () => new Response('ok', {
			headers: { 'content-type': 'text/plain' },
		}));
		vi.stubGlobal('fetch', upstreamFetch);

		await worker.fetch(new Request('https://app.example/messages', {
			headers: { cookie: 'idu_school=s19; session=abc' },
		}));
		await worker.fetch(new Request('https://app.example/users/sign_in?idu_school=attacker', {
			headers: { cookie: 'session=abc' },
		}));

		expect(upstreamFetch.mock.calls[0][0]).toBe('https://s19.idu.edu.pl/messages');
		expect(upstreamFetch.mock.calls[0][1].headers.cookie).toBe('session=abc');
		expect(upstreamFetch.mock.calls[1][0]).toBe('https://s35.idu.edu.pl/users/sign_in');
	});
});
