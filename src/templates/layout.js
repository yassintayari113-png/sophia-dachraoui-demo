/**
 * Public layout — shared head, header, language switcher and footer.
 */
import { site } from '../config/site.js';
import { esc, rel } from './helpers.js';

const NAV = [
  { href: '/a-propos/', label: 'À propos' },
  { href: '/recherche/', label: 'Recherche' },
  { href: '/livres/', label: 'Livres' },
  { href: '/articles/', label: 'Articles' },
  { href: '/cours/', label: 'Cours' },
  { href: '/ouvrages-collectifs/', label: 'Ouvrages collectifs' },
  { href: '/contact/', label: 'Contact' },
];

function head(page, depth) {
  const canonical = `${site.url}${page.path}`;
  const title = page.title ? `${page.title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  const desc = page.description || site.description;
  return `<!doctype html>
<html lang="${esc(site.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="sophia-demo-mode" content="${site.demoMode ? 'true' : 'false'}">
${site.demoMode ? '' : `<link rel="canonical" href="${esc(canonical)}">`}
<meta name="robots" content="${site.demoMode ? 'noindex, nofollow, noarchive' : (page.noindex ? 'noindex, nofollow' : 'index, follow')}">
<meta name="theme-color" content="#f7f3ec">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:locale" content="fr_CH">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${rel(depth, 'icons/favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${rel(depth, 'assets/main.css')}">
${page.jsonLd ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>` : ''}
</head>`;
}

function languageSwitcher() {
  return `
<div class="language-switcher" data-language-switcher role="group" aria-label="Choisir la langue">
  <button class="language-button" type="button" data-lang-choice="fr-CH" aria-label="Français" title="Français" aria-pressed="true">FR</button>
  <button class="language-button" type="button" data-lang-choice="en" aria-label="English" title="English" aria-pressed="false">EN</button>
  <button class="language-button" type="button" data-lang-choice="de-CH" aria-label="Deutsch (Schweiz)" title="Deutsch (Schweiz)" aria-pressed="false">DE-CH</button>
</div>`;
}

function header(depth, currentPath) {
  const links = NAV.map(
    (n) => `<li><a href="${rel(depth, n.href)}"${currentPath.startsWith(n.href) ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`
  ).join('');
  const mobileLinks = NAV.map(
    (n) => `<li><a href="${rel(depth, n.href)}">${esc(n.label)}</a></li>`
  ).join('');
  return `
<a class="skip-link" href="#contenu" data-i18n="Aller au contenu">Aller au contenu</a>
<div class="demo-banner" role="note" data-i18n="Site de démonstration — contenus fictifs, paiement et comptes simulés. Aucune donnée réelle.">Site de démonstration — contenus fictifs, paiement et comptes simulés. Aucune donnée réelle.</div>
<header class="site-header" data-header>
  <div class="wrap header-inner">
    <a class="brand" href="${rel(depth, '/')}" aria-label="${esc(site.name)} — accueil">
      <span class="brand-name">${esc(site.name)}</span>
      <span class="brand-sub" data-i18n="Écriture &amp; recherche">Écriture &amp; recherche</span>
    </a>
    <nav class="main-nav" aria-label="Navigation principale" data-i18n-aria-label="Navigation principale">
      <ul>${links}</ul>
    </nav>
    <div class="header-actions">
      ${languageSwitcher()}
      <a class="icon-link" href="${rel(depth, '/rechercher/')}" aria-label="Rechercher" data-i18n-aria-label="Rechercher">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>
      </a>
      <a class="icon-link" href="${rel(depth, '/espace-membre/')}" data-auth-link aria-label="Espace membre" data-i18n-aria-label="Espace membre">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.6-3.4 4.4-5 8-5s6.4 1.6 8 5"/></svg>
      </a>
      <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="menu-mobile">
        <span class="menu-toggle-label" data-i18n="Menu">Menu</span>
        <span class="menu-toggle-lines" aria-hidden="true"><span></span><span></span></span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="menu-mobile" data-mobile-menu hidden>
    <nav aria-label="Navigation mobile">
      <ul>
        <li><a href="${rel(depth, '/') }" data-i18n="Accueil">Accueil</a></li>
        ${mobileLinks}
        <li><a href="${rel(depth, '/publications/') }" data-i18n="Publications">Publications</a></li>
        <li><a href="${rel(depth, '/articles-premium/') }" data-i18n="Articles premium">Articles premium</a></li>
        <li><a href="${rel(depth, '/parcours/') }" data-i18n="Parcours">Parcours</a></li>
        <li><a href="${rel(depth, '/newsletter/') }" data-i18n="Newsletter">Newsletter</a></li>
        <li><a href="${rel(depth, '/rechercher/') }" data-i18n="Rechercher">Rechercher</a></li>
        <li><a href="${rel(depth, '/espace-membre/') }" data-i18n="Espace membre">Espace membre</a></li>
      </ul>
    </nav>
  </div>
</header>`;
}

function footer(depth) {
  return `
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <p class="footer-name">${esc(site.name)}</p>
      <p class="footer-statement">${esc(site.tagline)}</p>
      <p class="footer-note" data-i18n="Un espace personnel dédié à la littérature, à la recherche et à la transmission.">Un espace personnel dédié à la littérature, à la recherche et à la transmission.</p>
    </div>
    <nav class="footer-col" aria-label="Navigation de pied de page">
      <h2 class="footer-title" data-i18n="Naviguer">Naviguer</h2>
      <ul>
        <li><a href="${rel(depth, '/a-propos/') }" data-i18n="À propos">À propos</a></li>
        <li><a href="${rel(depth, '/parcours/') }" data-i18n="Parcours">Parcours</a></li>
        <li><a href="${rel(depth, '/recherche/') }" data-i18n="Recherche">Recherche</a></li>
        <li><a href="${rel(depth, '/contact/') }" data-i18n="Contact">Contact</a></li>
      </ul>
    </nav>
    <nav class="footer-col" aria-label="Contenus">
      <h2 class="footer-title" data-i18n="Contenus">Contenus</h2>
      <ul>
        <li><a href="${rel(depth, '/livres/') }" data-i18n="Livres">Livres</a></li>
        <li><a href="${rel(depth, '/publications/') }" data-i18n="Publications">Publications</a></li>
        <li><a href="${rel(depth, '/articles/') }" data-i18n="Articles">Articles</a></li>
        <li><a href="${rel(depth, '/articles-premium/') }" data-i18n="Articles premium">Articles premium</a></li>
        <li><a href="${rel(depth, '/cours/') }" data-i18n="Cours">Cours</a></li>
        <li><a href="${rel(depth, '/ouvrages-collectifs/') }" data-i18n="Ouvrages collectifs">Ouvrages collectifs</a></li>
      </ul>
    </nav>
    <div class="footer-col">
      <h2 class="footer-title" data-i18n="Newsletter">Newsletter</h2>
      <p class="footer-note" data-i18n="Recevoir les nouveaux textes et les appels en cours.">Recevoir les nouveaux textes et les appels en cours.</p>
      <a class="btn btn-outline-light" href="${rel(depth, '/newsletter/') }" data-i18n="S’inscrire à la newsletter">S’inscrire à la newsletter</a>
      <p class="footer-demo" data-i18n="Démonstration — aucun e-mail réel n’est envoyé.">Démonstration — aucun e-mail réel n’est envoyé.</p>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>© ${site.builtYear} ${esc(site.name)} — <span data-i18n="Démonstration">Démonstration</span>.</p>
    <ul class="footer-legal">
      <li><a href="${rel(depth, '/mentions-legales/') }" data-i18n="Mentions légales">Mentions légales</a></li>
      <li><a href="${rel(depth, '/confidentialite/') }" data-i18n="Confidentialité">Confidentialité</a></li>
      <li><a href="${rel(depth, '/atelier/') }" data-i18n="Atelier (démo)">Atelier (démo)</a></li>
    </ul>
  </div>
</footer>`;
}

export function renderLayout(page, bodyHtml) {
  const depth = page.depth ?? 0;
  return `${head(page, depth)}
<body class="${esc(page.bodyClass || '')}">
${header(depth, page.path)}
<main id="contenu"${page.mainClass ? ` class="${esc(page.mainClass)}"` : ''}>
${bodyHtml}
</main>
${footer(depth)}
<script src="${rel(depth, 'assets/i18n.js')}" defer></script>
<script src="${rel(depth, 'assets/api.js')}" defer></script>
<script src="${rel(depth, 'assets/app.js')}" defer></script>
${page.extraScripts || ''}
</body>
</html>`;
}
