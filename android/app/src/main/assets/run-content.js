(() => {
    const run = () => {
        console.info('[IDU2] Cloudflare JavaScript loaded');
        __IDU_CONTENT_SOURCE__
    };
    // Chromium may invoke document-start before <html> exists. The shared
    // bundle reads document.documentElement immediately, so wait only for
    // that node, not for page completion or DOMContentLoaded.
    if (document.documentElement) {
        run();
    } else {
        const observer = new MutationObserver(() => {
            if (document.documentElement) {
                observer.disconnect();
                run();
            }
        });
        observer.observe(document, { childList: true });
    }
})();
