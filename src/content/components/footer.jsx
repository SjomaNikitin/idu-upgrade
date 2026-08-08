import { h } from 'preact';

const supportUrl = 'https://sjomanikitin.github.io/idu-upgrade/';
const privacyUrl = 'https://sjomanikitin.github.io/idu-upgrade/privacy.html';
const sourceUrl = 'https://github.com/SjomaNikitin/idu-upgrade';

export function Footer() {
	const isSignInPage =
		window.location.pathname === '/users/sign_in' && !window.__IDU_MOCK_DATA;

	return (
		<div
			className="idu-app-footer"
			style={isSignInPage ? { display: 'none', bottom: '0px' } : undefined}
		>
			<div className="idu-app-footer__identity">
				<strong>IDU2</strong>
				<span>Życie szkolne w jednym miejscu</span>
			</div>
			<nav className="idu-app-footer__links" aria-label="Informacje o aplikacji">
				<a href={privacyUrl}>Polityka prywatności</a>
				<a href={supportUrl}>Pomoc</a>
				<a href={sourceUrl}>Kod źródłowy</a>
			</nav>
			<p className="idu-app-footer__legal">
				© 2026 IDU2 · Projekt niezależny
			</p>
		</div>
	);
}
