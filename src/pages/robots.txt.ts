import type { APIRoute } from 'astro';

export const GET: APIRoute = (context) => {
  const site = context.site?.origin || 'https://merkan.ir';

  const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
