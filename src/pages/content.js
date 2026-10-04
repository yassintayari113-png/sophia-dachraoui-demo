/**
 * Content pages — Livres, Publications, Articles (+ paywall),
 * Articles premium, Cours, Ouvrages collectifs, Proposition.
 */
import { articles, articleCategories } from '../data/demo/articles.js';
import { books, publications, courses } from '../data/demo/content.js';
import { calls } from '../data/demo/admin.js';
import { esc, rel, frDate, chf } from '../templates/helpers.js';
import { sectionHeading, articleCard, bookCard, courseCard, bodyBlocks, badge, demoNote, emptyState } from '../templates/components.js';

function pageHero(breadcrumb, eyebrowText, title, lead) {
  return `
<section class="page-hero">
  <div class="wrap">
    <nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="${rel(breadcrumbDepth(breadcrumb), '/')}">Accueil</a><span aria-hidden="true">/</span><span>${esc(breadcrumb)}</span></nav>
    <p class="eyebrow">${esc(eyebrowText)}</p>
    <h1>${esc(title)}</h1>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
  </div>
</section>`;
}
// breadcrumb depth == page depth here (list pages live at depth 1, details at depth 2+)
function breadcrumbDepth() {
  return CURRENT_DEPTH;
}
let CURRENT_DEPTH = 1;
function withDepth(depth, fn) {
  CURRENT_DEPTH = depth;
  const html = fn();
  CURRENT_DEPTH = 1;
  return html;
}

/* ------------------------------- Livres ------------------------------ */

export const livresPage = {
  path: '/livres/',
  file: 'livres/index.html',
  depth: 1,
  title: 'Livres',
  description: 'Livres de Sophia Dachraoui — présentations d’ouvrages (contenu de démonstration).',
  body() {
    return withDepth(1, () => `
${pageHero('Livres', 'Bibliothèque', 'Livres', 'Des ouvrages présentés comme des lieux : entrer, s’installer, revenir.')}
<section class="section">
  <div class="wrap" style="display: grid; gap: var(--space-5)">
    ${books.map((b) => bookCard(b, 1)).join('\n')}
    ${demoNote('Ouvrages fictifs de démonstration — éditeurs, collections et parutions à confirmer.')}
  </div>
</section>`);
  },
};

export const bookDetailPages = books.map((b) => ({
  path: `/livres/${b.slug}/`,
  file: `livres/${b.slug}/index.html`,
  depth: 2,
  title: b.title,
  description: `${b.title} — ${b.subtitle}. ${b.kind} (démonstration).`,
  ogType: 'book',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: b.title,
    author: { '@type': 'Person', name: 'Sophia Dachraoui' },
    inLanguage: 'fr',
    bookFormat: 'https://schema.org/Paperback',
    datePublished: String(b.year),
  },
  body() {
    const relatedArticles = articles.filter((a) => b.related.includes(a.slug));
    return `
<section class="wrap book-hero">
  <div class="book-hero-cover reveal">
    <img src="${rel(2, b.cover)}" alt="Couverture de démonstration — ${esc(b.title)}" width="320" height="480">
  </div>
  <div>
    <nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="${rel(2, '/')}">Accueil</a><span aria-hidden="true">/</span><a href="${rel(2, '/livres/')}">Livres</a><span aria-hidden="true">/</span><span>${esc(b.title)}</span></nav>
    <p class="eyebrow">${esc(b.kind)}</p>
    <h1 style="font-size: var(--fs-h1)">${esc(b.title)}</h1>
    <p class="reading-sub">${esc(b.subtitle)}</p>
    <dl class="book-facts">
      <div><dt>Année</dt><dd>${b.year}</dd></div>
      <div><dt>Statut</dt><dd>${esc(b.status)}</dd></div>
      <div><dt>Pages</dt><dd>${b.pages} (démo)</dd></div>
      <div><dt>Éditeur</dt><dd>${esc(b.publisher)}</dd></div>
    </dl>
    <div class="hero-ctas">
      <a class="btn btn-primary" href="${rel(2, '/contact/')}">Être informé·e de la parution</a>
      <a class="btn btn-outline" href="${rel(2, '/livres/')}">Tous les livres</a>
    </div>
  </div>
</section>
<section class="section section-tint">
  <div class="wrap split">
    <div>
      <h2 style="font-size: var(--fs-h2)">Présentation</h2>
      ${demoNote('Présentation fictive — le texte réel de l’ouvrage remplacera ce contenu.')}
    </div>
    <div class="prose">
      ${b.description.map((p) => `<p>${esc(p)}</p>`).join('\n')}
      <blockquote class="pull-quote"><p>«&nbsp;${esc(b.excerptQuote)}&nbsp;»</p><cite>Extrait fictif — démonstration</cite></blockquote>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap split">
    <div><h2 style="font-size: var(--fs-h2)">Table (provisoire)</h2></div>
    <ol class="toc-list">${b.toc.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>
  </div>
</section>
${
  relatedArticles.length
    ? `<section class="section section-tint">
  <div class="wrap">
    ${sectionHeading({ num: '', title: 'En lien avec cet ouvrage' })}
    <div class="grid-3">${relatedArticles.map((a) => articleCard(a, 2)).join('')}</div>
  </div>
</section>`
    : ''
}`;
  },
}));

/* ---------------------------- Publications --------------------------- */

export const publicationsPage = {
  path: '/publications/',
  file: 'publications/index.html',
  depth: 1,
  title: 'Publications',
  description: 'Publications (contenu de démonstration) — articles de revue, communications, chapitres d’ouvrage.',
  body() {
    const sorted = [...publications].sort((a, b) => b.year - a.year);
    return withDepth(1, () => `
${pageHero('Publications', 'Travaux publiés', 'Publications', 'Articles, communications et chapitres — présentés ici avec leurs références fictives de démonstration.')}
<section class="section">
  <div class="wrap">
    ${sorted
      .map(
        (p) => `
    <article class="pub-item reveal">
      <span class="pub-year">${p.year}</span>
      <div>
        <p class="article-meta">${esc(p.type)}</p>
        <h2 style="font-size: var(--fs-h3)">${esc(p.title)}</h2>
        <p class="pub-venue">${esc(p.venue)}</p>
        <p>${esc(p.abstract)}</p>
      </div>
    </article>`
      )
      .join('')}
    ${demoNote('Toutes les références ci-dessus sont fictives (revues, colloques, dates). Elles seront remplacées par la bibliographie réelle.')}
  </div>
</section>`);
  },
};

/* ------------------------------ Articles ----------------------------- */

export const articlesPage = {
  path: '/articles/',
  file: 'articles/index.html',
  depth: 1,
  title: 'Articles',
  description: 'Articles et essais (contenu de démonstration) — lecture libre et textes premium.',
  body() {
    return withDepth(1, () => `
${pageHero('Articles', 'Le journal', 'Articles', 'Essais, chroniques et notes de recherche — certains en accès libre, d’autres réservés aux membres.')}
<section class="section">
  <div class="wrap">
    <div class="search-filters" role="group" aria-label="Filtrer par catégorie" data-article-filters>
      <button class="filter-chip" type="button" data-filter="all" aria-pressed="true">Tous</button>
      ${articleCategories.map((c) => `<button class="filter-chip" type="button" data-filter="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}
    </div>
    <p class="search-count" data-article-count aria-live="polite">${articles.length} articles</p>
    <div class="grid-3" data-article-grid>
      ${articles.map((a) => `<div data-category="${esc(a.category)}">${articleCard(a, 1)}</div>`).join('')}
    </div>
    <div data-article-empty hidden>
      ${emptyState('Aucun article dans cette catégorie', 'Essayez une autre catégorie ou revenez à la liste complète.')}
    </div>
  </div>
</section>`);
  },
};

export const premiumPage = {
  path: '/articles-premium/',
  file: 'articles-premium/index.html',
  depth: 1,
  title: 'Articles premium',
  description: 'Essais longs réservés aux membres (démonstration) — aperçu gratuit, accès complet après inscription.',
  body() {
    const premiumArticles = articles.filter((a) => a.premium);
    return withDepth(1, () => `
${pageHero('Articles premium', 'Essais réservés', 'Articles premium', 'Des textes longs, travaillés, réservés aux membres. Un aperçu est toujours offert.')}
<section class="section">
  <div class="wrap">
    <div class="split" style="margin-bottom: var(--space-4)">
      <div class="prose">
        <p>L’accès premium soutient directement le travail d’écriture et de recherche. Chaque essai est proposé à l’unité, sans abonnement obligatoire.</p>
      </div>
      <div>${demoNote('Paiement de démonstration — aucune transaction réelle n’est effectuée. En production, l’accès serait vérifié côté serveur.')}</div>
    </div>
    <div class="grid-2">
      ${premiumArticles.map((a) => articleCard(a, 1)).join('')}
    </div>
  </div>
</section>`);
  },
};

export const articleDetailPages = articles.map((a, i) => ({
  path: `/articles/${a.slug}/`,
  file: `articles/${a.slug}/index.html`,
  depth: 2,
  title: a.title,
  description: a.excerpt,
  ogType: 'article',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    inLanguage: 'fr',
    author: { '@type': 'Person', name: 'Sophia Dachraoui' },
    isAccessibleForFree: !a.premium,
  },
  extraScripts: a.premium ? `<script src="${rel(2, 'assets/premium.js')}" defer></script>` : '',
  body() {
    const related = articles.filter((r) => r.slug !== a.slug).slice(0, 3);
    const previewBlocks = a.premium ? a.preview : a.body;
    return `
<article>
  <header class="wrap reading-head">
    <nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="${rel(2, '/')}">Accueil</a><span aria-hidden="true">/</span><a href="${rel(2, '/articles/')}">Articles</a><span aria-hidden="true">/</span><span>${esc(a.category)}</span></nav>
    <p class="eyebrow">${esc(a.category)}${a.premium ? ' · Premium' : ''}</p>
    <h1>${esc(a.title)}</h1>
    <p class="reading-sub">${esc(a.subtitle)}</p>
    <p class="reading-meta">
      <span>Par <strong>${esc('Sophia Dachraoui')}</strong></span>
      <time datetime="${esc(a.date)}">${frDate(a.date)}</time>
      <span>${a.readingTime} min de lecture</span>
      ${a.premium ? badge('Accès membre', 'premium') : badge('Accès libre', 'pub')}
    </p>
    <div class="article-tools">
      <button class="btn btn-outline btn-small" type="button" data-save-article data-save-slug="${esc(a.slug)}" data-save-title="${esc(a.title)}" data-save-category="${esc(a.category)}" data-save-url="${rel(2, `/articles/${a.slug}/`)}">Enregistrer cet article</button>
      <span class="form-status" data-save-status role="status" aria-live="polite"></span>
    </div>
  </header>
  <div class="wrap prose-article" data-article-body>
    ${bodyBlocks(previewBlocks)}
  </div>
  ${
    a.premium
      ? `
  <section class="wrap" aria-labelledby="paywall-title">
    <div class="paywall" data-paywall data-article-slug="${esc(a.slug)}">
      <p class="paywall-mark" aria-hidden="true">✦</p>
      <h2 id="paywall-title">La suite est réservée aux membres</h2>
      <p>Cet essai complet (${a.readingTime} minutes) est proposé à ${chf(a.price)} — un achat unique, sans abonnement. Créez un compte ou connectez-vous pour continuer la lecture.</p>
      <div class="paywall-ctas">
        <a class="btn btn-wine" href="${rel(2, `/paiement/?article=${a.slug}`)}">Débloquer cet essai — ${chf(a.price)}</a>
        <a class="btn btn-outline" href="${rel(2, '/connexion/')}">J’ai déjà un compte</a>
      </div>
      ${demoNote('Paiement de démonstration — aucune transaction réelle n’est effectuée. En production, le contenu intégral serait servi uniquement après vérification côté serveur.')}
    </div>
    <div class="prose-article premium-body" data-premium-body data-article-slug="${esc(a.slug)}" hidden></div>
  </section>`
      : ''
  }
  <div class="wrap">
    <aside class="article-footer-note">
      <p style="margin: 0"><strong>Note de démonstration.</strong> Ce texte est un contenu fictif rédigé pour présenter le site ; il ne constitue pas une publication réelle. <a href="${rel(2, '/contact/')}" style="color: var(--wine)">Contacter l’auteure</a>.</p>
    </aside>
  </div>
</article>
<section class="section section-tint" aria-labelledby="related-title">
  <div class="wrap">
    ${sectionHeading({ num: '', title: 'À lire ensuite', id: 'related-title' })}
    <div class="related-list">${related.map((r) => articleCard(r, 2)).join('')}</div>
  </div>
</section>`;
  },
}));

/* ------------------------------- Cours ------------------------------- */

export const coursPage = {
  path: '/cours/',
  file: 'cours/index.html',
  depth: 1,
  title: 'Cours & ateliers',
  description: 'Cours, ateliers d’écriture et séminaires (démonstration) — formats, niveaux, sessions.',
  body() {
    return withDepth(1, () => `
${pageHero('Cours', 'Transmettre', 'Cours & ateliers', 'Trois formats — atelier, parcours de lecture, séminaire — pour écrire et lire autrement.')}
<section class="section">
  <div class="wrap">
    <div class="grid-3">
      ${courses.map((c) => courseCard(c, 1)).join('')}
    </div>
    ${demoNote('Cours fictifs de démonstration — programmes, tarifs et dates à confirmer.')}
  </div>
</section>`);
  },
};

export const courseDetailPages = courses.map((c) => ({
  path: `/cours/${c.slug}/`,
  file: `cours/${c.slug}/index.html`,
  depth: 2,
  title: c.title,
  description: `${c.title} — ${c.short}`,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.title,
    description: c.short,
    provider: { '@type': 'Person', name: 'Sophia Dachraoui' },
    inLanguage: 'fr',
  },
  body() {
    return `
<section class="page-hero">
  <div class="wrap">
    <nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="${rel(2, '/')}">Accueil</a><span aria-hidden="true">/</span><a href="${rel(2, '/cours/')}">Cours</a><span aria-hidden="true">/</span><span>${esc(c.title)}</span></nav>
    <p class="eyebrow">${esc(c.format)} · ${esc(c.level)} · ${esc(c.duration)}</p>
    <h1>${esc(c.title)}</h1>
    <p class="lead">${esc(c.short)}</p>
    <div class="hero-ctas">
      <a class="btn btn-primary" href="${rel(2, `/paiement/?cours=${c.slug}`)}">S’inscrire — ${chf(c.price)} (démo)</a>
      <a class="btn btn-outline" href="${rel(2, '/contact/')}">Poser une question</a>
    </div>
    ${demoNote('Inscription de démonstration — aucune transaction réelle n’est effectuée.')}
  </div>
</section>
<section class="section">
  <div class="wrap split">
    <div class="split-sticky">
      ${badge(c.status, c.status.includes('Ouvert') ? 'open' : 'neutral')}
      <dl class="course-facts" style="margin-top: var(--space-3)">
        <div><dt>Format</dt><dd>${esc(c.format)}</dd></div>
        <div><dt>Niveau</dt><dd>${esc(c.level)}</dd></div>
        <div><dt>Durée</dt><dd>${esc(c.duration)}</dd></div>
        <div><dt>Prochaine session</dt><dd>${esc(c.nextSession)}</dd></div>
        <div><dt>Tarif (démo)</dt><dd>${chf(c.price)}</dd></div>
      </dl>
      <p class="prose" style="font-size: var(--fs-small); margin-top: var(--space-3)"><strong>Public&nbsp;:</strong> ${esc(c.audience)}</p>
    </div>
    <div>
      <h2 style="font-size: var(--fs-h2); margin-bottom: var(--space-2)">Objectifs</h2>
      <ul style="display: grid; gap: 0.6rem; margin-bottom: var(--space-4)">
        ${c.objectives.map((o) => `<li style="border-left: 2px solid var(--gold); padding-left: var(--space-2)">${esc(o)}</li>`).join('')}
      </ul>
      <h2 style="font-size: var(--fs-h2); margin-bottom: var(--space-2)">Programme</h2>
      <div>
        ${c.program
          .map(
            (m) => `
        <div class="axis" style="padding-block: var(--space-3)">
          <span class="axis-num" style="font-size: 1rem; font-family: var(--sans); letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold)">${esc(m.module)}</span>
          <div>
            <h3 style="font-size: var(--fs-h3)">${esc(m.title)}</h3>
            <p style="color: var(--ink-soft); margin: 0.3rem 0 0">${esc(m.detail)}</p>
          </div>
        </div>`
          )
          .join('')}
      </div>
    </div>
  </div>
</section>`;
  },
}));

/* ------------------------ Ouvrages collectifs ------------------------ */

export const collectifsPage = {
  path: '/ouvrages-collectifs/',
  file: 'ouvrages-collectifs/index.html',
  depth: 1,
  title: 'Ouvrages collectifs',
  description: 'Appels à contributions en cours (démonstration) — proposer un texte pour un ouvrage collectif.',
  body() {
    return withDepth(1, () => `
${pageHero('Ouvrages collectifs', 'Écrire ensemble', 'Ouvrages collectifs', 'Des volumes construits à plusieurs voix. Les appels ci-dessous sont ouverts aux propositions.')}
<section class="section">
  <div class="wrap">
    ${calls
      .map(
        (c) => `
    <article class="call-card reveal">
      <div>
        ${badge(c.status, 'open')}
        <h3><a href="${rel(1, `/ouvrages-collectifs/${c.slug}/`)}" style="text-decoration:none">${esc(c.title)}</a></h3>
        <p class="call-theme">${esc(c.theme)}</p>
        <p style="color: var(--ink-soft); max-width: var(--measure)">${esc(c.description)}</p>
        <a class="btn btn-primary" href="${rel(1, `/proposer-une-contribution/?appel=${c.slug}`)}">Proposer une contribution</a>
      </div>
      <div class="rule-vertical">
        <p class="eyebrow">Repères</p>
        <dl class="course-facts">
          <div><dt>Date limite (fictive)</dt><dd><time datetime="${esc(c.deadline)}">${frDate(c.deadline)}</time></dd></div>
          <div><dt>Volume</dt><dd>${esc(c.volume)}</dd></div>
        </dl>
        <a class="link-more" href="${rel(1, `/ouvrages-collectifs/${c.slug}/`)}">Lire l’appel complet<span aria-hidden="true"> →</span></a>
      </div>
    </article>`
      )
      .join('')}
    ${demoNote('Appels fictifs de démonstration — thèmes, calendriers et modalités à confirmer.')}
  </div>
</section>`);
  },
};

export const callDetailPages = calls.map((c) => ({
  path: `/ouvrages-collectifs/${c.slug}/`,
  file: `ouvrages-collectifs/${c.slug}/index.html`,
  depth: 2,
  title: `Appel — ${c.title}`,
  description: `Appel à contributions « ${c.title} » (démonstration) — ${c.theme}`,
  body() {
    return `
<section class="page-hero">
  <div class="wrap">
    <nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="${rel(2, '/')}">Accueil</a><span aria-hidden="true">/</span><a href="${rel(2, '/ouvrages-collectifs/')}">Ouvrages collectifs</a><span aria-hidden="true">/</span><span>${esc(c.title)}</span></nav>
    ${badge(c.status, 'open')}
    <h1 style="margin-top: 0.6rem">${esc(c.title)}</h1>
    <p class="lead">${esc(c.theme)}</p>
    <div class="hero-ctas">
      <a class="btn btn-primary" href="${rel(2, `/proposer-une-contribution/?appel=${c.slug}`)}">Proposer une contribution</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap split">
    <div class="split-sticky">
      <dl class="course-facts">
        <div><dt>Date limite (fictive)</dt><dd><time datetime="${esc(c.deadline)}">${frDate(c.deadline)}</time></dd></div>
        <div><dt>Volume</dt><dd>${esc(c.volume)}</dd></div>
      </dl>
      ${demoNote('Appel fictif — les modalités réelles seront publiées ici.')}
    </div>
    <div>
      <div class="prose" style="margin-bottom: var(--space-4)"><p>${esc(c.description)}</p></div>
      <h2 style="font-size: var(--fs-h2); margin-bottom: var(--space-2)">Axes suggérés</h2>
      <ul style="display: grid; gap: 0.6rem; margin-bottom: var(--space-4)">
        ${c.axes.map((ax) => `<li style="border-left: 2px solid var(--wine); padding-left: var(--space-2)">${esc(ax)}</li>`).join('')}
      </ul>
      <h2 style="font-size: var(--fs-h2); margin-bottom: var(--space-2)">Modalités de proposition</h2>
      <ul style="display: grid; gap: 0.6rem">
        ${c.requirements.map((r) => `<li style="border-left: 2px solid var(--gold); padding-left: var(--space-2)">${esc(r)}</li>`).join('')}
      </ul>
    </div>
  </div>
</section>`;
  },
}));

/* ------------------------- Proposer contribution ---------------------- */

export const proposerPage = {
  path: '/proposer-une-contribution/',
  file: 'proposer-une-contribution/index.html',
  depth: 1,
  title: 'Proposer une contribution',
  description: 'Formulaire de proposition de contribution pour les ouvrages collectifs (démonstration).',
  body() {
    return withDepth(1, () => `
${pageHero('Proposer une contribution', 'Ouvrages collectifs', 'Proposer une contribution', 'Présentez votre projet de texte en quelques minutes. Une réponse vous sera apportée après examen par le comité de rédaction.')}
<section class="section">
  <div class="wrap" style="max-width: 680px">
    <div class="form-card" style="max-width: none" data-proposal-shell>
      <form data-proposal-form novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="pp-call">Appel concerné</label>
            <select id="pp-call" name="appel" required>
              <option value="">Choisir un appel…</option>
              ${calls.map((c) => `<option value="${esc(c.slug)}">${esc(c.title)} — limite ${frDate(c.deadline)}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label for="pp-nom">Nom complet</label>
            <input id="pp-nom" name="nom" type="text" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="pp-email">Adresse e-mail</label>
            <input id="pp-email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="pp-titre">Titre de la proposition</label>
            <input id="pp-titre" name="titre" type="text" required maxlength="160">
          </div>
          <div class="field">
            <label for="pp-resume">Résumé (500 mots maximum)</label>
            <textarea id="pp-resume" name="resume" required minlength="50" maxlength="3500"></textarea>
            <p class="form-hint">50 caractères minimum. Décrivez l’objet, l’approche et le corpus.</p>
          </div>
          <div class="field">
            <label for="pp-msg">Message au comité (facultatif)</label>
            <textarea id="pp-msg" name="message" style="min-height: 90px"></textarea>
          </div>
          <div class="field">
            <label for="pp-file">Pièce jointe — démonstration</label>
            <input id="pp-file" name="piece" type="file" accept=".pdf,.doc,.docx">
            <p class="form-hint">Démo : le fichier n’est pas téléversé, seul son nom est affiché.</p>
            <p class="form-status" data-file-status aria-live="polite"></p>
          </div>
          <div class="field-check">
            <input id="pp-consent" name="consent" type="checkbox" required>
            <label for="pp-consent" style="margin: 0">Je confirme que cette proposition est la mienne et j’accepte d’être contacté·e. Je comprends qu’il s’agit d’un formulaire de démonstration.</label>
          </div>
          <button class="btn btn-primary" type="submit">Envoyer ma proposition</button>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </div>
      </form>
      <div class="form-success" data-proposal-success hidden>
        <p class="form-success-mark" aria-hidden="true">✦</p>
        <h2 style="font-size: var(--fs-h2)">Proposition reçue — merci.</h2>
        <p style="color: var(--ink-soft)">Votre proposition a bien été enregistrée <em>dans cette démonstration</em>. En production, un accusé de réception serait envoyé par e-mail et le comité examinerait votre texte.</p>
        <p class="demo-credentials" style="text-align: left">Référence de suivi (fictive)&nbsp;: <code data-proposal-ref>PROP-2026-XXXX</code></p>
        <a class="btn btn-outline" href="${rel(1, '/ouvrages-collectifs/')}">Retour aux appels</a>
      </div>
    </div>
  </div>
</section>`);
  },
};
