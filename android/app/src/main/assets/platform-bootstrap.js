(() => {
    // Android lays out the WebView inside the system bars, so the shared CSS
    // needs no additional iOS inset. Do not impersonate the iOS platform.
    const configurePage = () => {
        const html = document.documentElement;
        if (html) {
            html.setAttribute('data-app-platform', 'android');
            html.classList.add('android-app');
            html.style.setProperty('--ios-safe-top', '0px');
        }
        if (document.head && !document.getElementById('idu-custom-viewport')) {
            const viewport = document.createElement('meta');
            viewport.id = 'idu-custom-viewport';
            viewport.name = 'viewport';
            viewport.content = 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no';
            document.head.appendChild(viewport);
        }
        if (document.body) document.body.setAttribute('path', window.location.pathname);
        return !!html && !!document.head && !!document.body;
    };
    if (!configurePage()) {
        const observer = new MutationObserver(() => {
            if (configurePage()) observer.disconnect();
        });
        observer.observe(document, { childList: true, subtree: true });
        document.addEventListener('DOMContentLoaded', configurePage, { once: true });
    }
})();
