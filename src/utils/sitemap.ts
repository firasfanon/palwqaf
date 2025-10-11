export interface SitemapPage {
  url: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
}

export const sitemapPages: SitemapPage[] = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/news', changefreq: 'daily', priority: 0.9 },
  { url: '/announcements', changefreq: 'daily', priority: 0.9 },
  { url: '/services', changefreq: 'weekly', priority: 0.8 },
  { url: '/e-services', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/minister', changefreq: 'monthly', priority: 0.7 },
  { url: '/vision', changefreq: 'monthly', priority: 0.7 },
  { url: '/structure', changefreq: 'monthly', priority: 0.7 },
  { url: '/former-ministers', changefreq: 'yearly', priority: 0.6 },
  { url: '/activities', changefreq: 'weekly', priority: 0.8 },
  { url: '/social-services', changefreq: 'weekly', priority: 0.8 },
  { url: '/friday-sermons', changefreq: 'weekly', priority: 0.8 },
  { url: '/mosques', changefreq: 'weekly', priority: 0.8 },
  { url: '/projects', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/search', changefreq: 'daily', priority: 0.6 },
  { url: '/sitemap', changefreq: 'monthly', priority: 0.5 },
  { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms', changefreq: 'yearly', priority: 0.3 }
];

export function generateSitemapXML(baseUrl: string): string {
  const urlset = sitemapPages.map(page => {
    const lastmod = page.lastmod || new Date().toISOString().split('T')[0];
    return `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
}
