(() => {
    const readSavedInset = (key) => {
        try {
            const value = Number(localStorage.getItem(key));
            return Number.isFinite(value) && value >= 0 && value <= 200 ? value : 0;
        } catch (_) {
            return 0;
        }
    };
    // Restore the last bottom inset at document start. The header's top spacing
    // is intentionally fixed in install-styles.js so device insets cannot resize it.
    const savedSafeBottom = readSavedInset('iduAndroidSafeBottom');
    const configurePage = () => {
        const html = document.documentElement;
        if (html) {
            html.setAttribute('data-app-platform', 'android');
            html.classList.add('android-app');
            html.style.setProperty('--ios-safe-top', '0px');
            html.style.setProperty('--android-safe-bottom', `${savedSafeBottom}px`);
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
