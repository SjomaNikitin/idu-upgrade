(() => {
    const css = __IDU_CSS_LITERAL__;
    const installStyles = () => {
        if (document.getElementById('idu-custom-styles')) return true;
        if (!document.head) return false;
        const style = document.createElement('style');
        style.id = 'idu-custom-styles';
        style.textContent = css;
        document.head.appendChild(style);
        console.info('[IDU2] Cloudflare styles loaded', { bytes: css.length });
        return true;
    };
    if (!installStyles()) {
        const observer = new MutationObserver(() => {
            if (installStyles()) observer.disconnect();
        });
        observer.observe(document, { childList: true, subtree: true });
        document.addEventListener('DOMContentLoaded', installStyles, { once: true });
    }
    document.addEventListener('DOMContentLoaded', () => {
        const style = document.getElementById('idu-custom-styles');
        if (style && document.head) {
            document.head.appendChild(style);
            console.info('[IDU2] Cloudflare styles moved after page styles');
        }
    }, { once: true });
})();
