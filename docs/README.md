# NIDU public website

Static, Polish-language marketing site for GitHub Pages. No build step is needed.

## Pages

- `index.html`: home and interactive timetable demo
- `about.html`: mission and creators
- `updates.html`: searchable, filterable development updates
- `app.html`: verified App Store and Google Play download links
- `support.html`: support contacts and expandable FAQ (formerly the homepage)
- `privacy.html`: existing privacy policy at its original URL, with unchanged policy text

All pages share `styles.css` and `site.js`. Links are relative so the site works under the repository path. Motion respects the visitor's reduced-motion setting; content and navigation links remain usable without JavaScript on desktop. Mobile navigation also has a no-JavaScript fallback.

## Local preview

From the repository root:

```sh
python3 -m http.server 4173 --directory docs
```

Open http://localhost:4173.

## Publish with GitHub Pages

Push these files to the branch used by Pages. In repository Settings → Pages, select **Deploy from a branch**, that branch, and **/docs**. The existing `.nojekyll` file bypasses Jekyll. No application build or Cloudflare deployment is needed.

The default repository URL is https://sjomanikitin.github.io/idu-upgrade/. Sitemap and canonical URLs use that base; update them if you use a custom domain. Search engines can crawl the HTML directly, but publication does not guarantee immediate indexing.

## Editing content

Edit the relevant HTML page directly. Update entries are `.update-row` articles with a `data-category` matching the filter buttons. Update the visible count and archive count when adding entries. The dates shown in the development journal are illustrative and are not assertions of store release dates. Creator portraits use decorative monograms, not photographs.

The download URLs are in `app.html`. Shared navigation/footer markup is static and should be updated across all six pages when adding another page.
