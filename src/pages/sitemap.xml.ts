import type { APIRoute } from 'astro';

const pages = [
  { path: '', priority: '1.0' },
  { path: 'about', priority: '0.8' },
  { path: 'contact', priority: '0.8' },
  { path: 'how-we-work', priority: '0.8' },
  { path: 'services', priority: '0.8' },
];

const locales = ['en', 'fa', 'tr'] as const;
const lastmod = '2026-07-21';

export const GET: APIRoute = (context) => {
  const site = context.site?.origin || 'https://merkan.ir';

  const urls = pages.flatMap(({ path, priority }) =>
    locales.map((locale) => {
      const pagePath = path ? `/${locale}/${path}` : `/${locale}/`;
      const loc = `${site}${pagePath}`;

      const alternates = locales
        .map((l) => {
          const altPath = path ? `/${l}/${path}` : `/${l}/`;
          return `    <xhtml:link rel="alternate" hreflang="${l}" href="${site}${altPath}" />`;
        })
        .join('\n');

      const xDefaultPath = path ? `/en/${path}` : `/en/`;
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${xDefaultPath}" />`;

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
${alternates}
${xDefault}
  </url>`;
    })
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
