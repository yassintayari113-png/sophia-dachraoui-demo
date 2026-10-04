/**
 * Build — zero-dependency static site generator.
 * Renders every page from the data layer into /docs (GitHub Pages + Render publish root).
 * Usage: node build/build.js
 */
import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from '../src/config/site.js';
import { renderLayout } from '../src/templates/layout.js';
import { renderAdminLayout, adminPages } from '../src/templates/admin.js';
import { homePage } from '../src/pages/home.js';
import {
  aProposPage, parcoursPage, recherchePage, contactPage,
  newsletterPage, mentionsLegalesPage, confidentialitePage, notFoundPage,
} from '../src/pages/static.js';
import {
  livresPage, bookDetailPages, publicationsPage, articlesPage,
  articleDetailPages, premiumPage, coursPage, courseDetailPages,
  collectifsPage, callDetailPages, proposerPage,
} from '../src/pages/content.js';
import {
  searchPage, loginPage, registerPage, forgotPage,
  memberPage, checkoutPage, successPage,
} from '../src/pages/flows.js';

import { articles } from '../src/data/demo/articles.js';
import { books, publications, courses } from '../src/data/demo/content.js';
import { recherche } from '../src/data/demo/parcours.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'docs');

const publicPages = [
  homePage, aProposPage, parcoursPage, recherchePage, contactPage,
  newsletterPage, mentionsLegalesPage, confidentialitePage, notFoundPage,
  livresPage, ...bookDetailPages, publicationsPage, articlesPage,
  ...articleDetailPages, premiumPage, coursPage, ...courseDetailPages,
  collectifsPage, ...callDetailPages, proposerPage,
  searchPage, loginPage, registerPage, forgotPage,
  memberPage, checkoutPage, successPage,
];

async function emit(file, html) {
  const target = path.join(DIST, file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  return file;
}

function searchIndex() {
  const entries = [
    ...articles.map((a) => ({ type: 'article', title: a.title, text: `${a.subtitle} ${a.excerpt}`, url: `/articles/${a.slug}/`, meta: a.premium ? 'Premium' : 'Accès libre' })),
    ...publications.map((p) => ({ type: 'publication', title: p.title, text: p.abstract, url: '/publications/', meta: `${p.type} · ${p.year}` })),
    ...books.map((b) => ({ type: 'livre', title: b.title, text: `${b.subtitle} ${b.summary}`, url: `/livres/${b.slug}/`, meta: `${b.kind} · ${b.year}` })),
    ...courses.map((c) => ({ type: 'cours', title: c.title, text: c.short, url: `/cours/${c.slug}/`, meta: `${c.format} · ${c.level}` })),
    ...recherche.axes.map((r) => ({ type: 'recherche', title: r.title, text: `${r.problem} ${r.text}`, url: '/recherche/', meta: 'Axe de recherche' })),
  ];
  return entries.map((e) => ({ ...e, isDemo: true }));
}

function premiumContent() {
  // Gated bodies shipped separately — loaded only after the demo unlock.
  // In production this content would be served by the backend after
  // server-side entitlement checks; never shipped to the browser.
  const gated = {};
  for (const a of articles.filter((x) => x.premium)) gated[a.slug] = a.body;
  return `// DEMO ONLY — simulated gated content. Production: serve from backend after auth check.\nwindow.__PREMIUM_CONTENT__=${JSON.stringify(gated)};`;
}

function sitemap(pages) {
  const urls = pages
    .filter((p) => !p.noindex && !p.path.includes('404'))
    .map((p) => `  <url><loc>${site.url}${p.path}</loc><changefreq>monthly</changefreq></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  console.log('Building SOPHIA-DEMO-V2…');
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  let count = 0;
  for (const page of publicPages) {
    await emit(page.file, renderLayout(page, page.body()));
    count++;
  }
  for (const page of adminPages) {
    const file = page.path === '/atelier/' ? 'atelier/index.html' : `${page.path.slice(1)}index.html`;
    await emit(file, renderAdminLayout(page, page.body()));
    count++;
  }

  // Deployment assets: styles, scripts, public files
  await mkdir(path.join(DIST, 'assets'), { recursive: true });
  await cp(path.join(ROOT, 'src/styles'), path.join(DIST, 'assets'), { recursive: true });
  await cp(path.join(ROOT, 'src/scripts'), path.join(DIST, 'assets'), { recursive: true });
  await cp(path.join(ROOT, 'public'), DIST, { recursive: true });

  // Search index + gated demo content
  await writeFile(path.join(DIST, 'assets/search-index.json'), JSON.stringify(searchIndex(), null, 2), 'utf8');
  await writeFile(path.join(DIST, 'assets/premium-content.js'), premiumContent(), 'utf8');

  
  // GitHub Pages should never try to build the folder with Jekyll.
  await writeFile(path.join(DIST, '.nojekyll'), '', 'utf8');

  // SEO files
  if (site.demoMode) {
    await rm(path.join(DIST, 'sitemap.xml'), { force: true });
    await writeFile(
      path.join(DIST, 'robots.txt'),
      `User-agent: *\nDisallow: /\n`,
      'utf8'
    );
  } else {
    await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(publicPages), 'utf8');
    await writeFile(
      path.join(DIST, 'robots.txt'),
      `User-agent: *\nAllow: /\nDisallow: /atelier/\nDisallow: /paiement/\nDisallow: /espace-membre/\nSitemap: ${site.url}/sitemap.xml\n`,
      'utf8'
    );
  }


  console.log(`✔ ${count} pages générées dans docs/`);
}

main().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
