/**
 * Homepage — editorial composition in eleven numbered movements.
 */
import { site } from '../config/site.js';
import { profile } from '../data/demo/profile.js';
import { parcours, recherche } from '../data/demo/parcours.js';
import { articles } from '../data/demo/articles.js';
import { books, courses, publications } from '../data/demo/content.js';
import { calls } from '../data/demo/admin.js';
import { rel, frDate, esc } from '../templates/helpers.js';
import { sectionHeading, articleCard, courseCard, newsletterInline, demoNote } from '../templates/components.js';

const premium = articles.filter((a) => a.premium);
const free = articles.filter((a) => !a.premium);

function hero() {
  return `
<section class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div>
      <div class="hero-rule" aria-hidden="true"></div>
      <p class="hero-roles">${esc(site.tagline)}</p>
      <h1 class="hero-name" id="hero-title">${esc(site.name)}</h1>
      <p class="hero-statement">${esc(profile.intro)}</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="./a-propos/">Découvrir son travail</a>
        <a class="btn btn-outline" href="./publications/">Explorer les publications</a>
      </div>
      ${demoNote('Démonstration — les contenus de ce site sont fictifs et remplaçables.')}
    </div>
    <div class="hero-aside">
      <blockquote>
        <p>«&nbsp;Un site est une maison&nbsp;: chaque page une pièce, chaque texte une fenêtre.&nbsp;»</p>
        <cite>Note d’intention — démonstration</cite>
      </blockquote>
      <figure class="hero-portrait">
        <img src="${rel(0, profile.portrait.src)}" alt="${esc(profile.portrait.alt)}" width="600" height="750">
        <figcaption>${esc(profile.portrait.caption)}</figcaption>
      </figure>
    </div>
  </div>
</section>`;
}

function sectionAbout() {
  return `
<section class="section" aria-labelledby="s-apropos">
  <div class="wrap">
    ${sectionHeading({ num: '01', title: 'À propos', link: '/a-propos/', linkLabel: 'Lire la présentation' })}
    <div class="split">
      <p class="lead" id="s-apropos">Entre écriture et recherche, un même mouvement&nbsp;: lire le monde, et le rendre lisible.</p>
      <div class="prose">
        <p>${esc(profile.aboutShort)}</p>
        <div class="grid-2" style="margin-top: var(--space-3)">
          ${profile.domains
            .map(
              (d) => `
          <div class="reveal">
            <h3 style="font-size: var(--fs-h3)">${esc(d.label)}</h3>
            <p style="font-size: var(--fs-small)">${esc(d.text)}</p>
          </div>`
            )
            .join('')}
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function sectionParcours() {
  return `
<section class="section section-tint" aria-labelledby="s-parcours">
  <div class="wrap">
    ${sectionHeading({ num: '02', title: 'Parcours', link: '/parcours/', linkLabel: 'Voir le parcours' })}
    <div class="split">
      <div class="split-sticky">
        <p class="lead" id="s-parcours">Un itinéraire entre les textes, les salles de classe et les bibliothèques.</p>
        ${demoNote('Trame fictive — les étapes réelles seront validées par la cliente.')}
      </div>
      <ol class="timeline">
        ${parcours.steps
          .map(
            (s) => `
        <li class="timeline-item reveal">
          <p class="timeline-period">${esc(s.period)}</p>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
        </li>`
          )
          .join('')}
      </ol>
    </div>
  </div>
</section>`;
}

function sectionRecherche() {
  return `
<section class="section" aria-labelledby="s-recherche">
  <div class="wrap">
    ${sectionHeading({ num: '03', title: 'Recherche', link: '/recherche/', linkLabel: 'Axes de recherche' })}
    <p class="lead" id="s-recherche" style="max-width: 40ch; margin-bottom: var(--space-4)">Trois chantiers, une même question&nbsp;: que font les textes à ceux qui les lisent&nbsp;?</p>
    <div>
      ${recherche.axes
        .map(
          (a) => `
      <div class="axis reveal">
        <span class="axis-num" aria-hidden="true">${esc(a.num)}</span>
        <div>
          <h3>${esc(a.title)}</h3>
          <p class="axis-problem">${esc(a.problem)}</p>
          <div class="tag-row">${a.keywords.map((k) => `<span class="badge badge-neutral">${esc(k)}</span>`).join('')}</div>
        </div>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>`;
}

function sectionMainBook() {
  const b = books[0];
  return `
<section class="section section-tint" aria-labelledby="s-ouvrage">
  <div class="wrap">
    ${sectionHeading({ num: '04', title: 'Ouvrage en préparation', link: `/livres/${b.slug}/`, linkLabel: 'Découvrir l’ouvrage' })}
    <div class="split">
      <div>
        <a href="${rel(0, `/livres/${b.slug}/`)}" tabindex="-1" aria-hidden="true">
          <img src="${rel(0, b.cover)}" alt="" width="320" height="480" class="book-cover" loading="lazy">
        </a>
      </div>
      <div class="rule-vertical" id="s-ouvrage">
        <p class="eyebrow">${esc(b.kind)} · ${b.year} · ${esc(b.status)}</p>
        <h3 style="font-size: var(--fs-h2); margin-bottom: 0.3rem">${esc(b.title)}</h3>
        <p class="call-theme">${esc(b.subtitle)}</p>
        <div class="prose" style="margin-top: var(--space-3)">
          ${b.description.slice(0, 2).map((p) => `<p>${esc(p)}</p>`).join('')}
        </div>
        <blockquote class="pull-quote" style="margin-top: var(--space-3)">
          <p>«&nbsp;${esc(b.excerptQuote)}&nbsp;»</p>
          <cite>Extrait fictif — démonstration</cite>
        </blockquote>
      </div>
    </div>
  </div>
</section>`;
}

function sectionPublications() {
  const recent = publications.slice(0, 3);
  return `
<section class="section" aria-labelledby="s-publications">
  <div class="wrap">
    ${sectionHeading({ num: '05', title: 'Publications récentes', link: '/publications/', linkLabel: 'Toutes les publications' })}
    <div id="s-publications">
      ${recent
        .map(
          (p) => `
      <article class="pub-item reveal">
        <span class="pub-year">${p.year}</span>
        <div>
          <p class="article-meta">${esc(p.type)}</p>
          <h3>${esc(p.title)}</h3>
          <p class="pub-venue">${esc(p.venue)}</p>
        </div>
      </article>`
        )
        .join('')}
    </div>
    ${demoNote('Références fictives — aucune publication réelle n’est mentionnée.')}
  </div>
</section>`;
}

function sectionArticles() {
  return `
<section class="section section-tint" aria-labelledby="s-articles">
  <div class="wrap">
    ${sectionHeading({ num: '06', title: 'Articles', link: '/articles/', linkLabel: 'Tous les articles' })}
    <div class="grid-3" id="s-articles">
      ${free.map((a) => articleCard(a)).join('')}
    </div>
  </div>
</section>`;
}

function sectionPremium() {
  return `
<section class="section" aria-labelledby="s-premium">
  <div class="wrap">
    ${sectionHeading({ num: '07', title: 'Articles premium', link: '/articles-premium/', linkLabel: 'Découvrir l’offre premium' })}
    <div class="split">
      <p class="lead" id="s-premium">Des essais longs, réservés aux membres — lus lentement, relus souvent.</p>
      <div class="grid-2">
        ${premium.map((a) => articleCard(a)).join('')}
      </div>
    </div>
  </div>
</section>`;
}

function sectionCours() {
  return `
<section class="section section-tint" aria-labelledby="s-cours">
  <div class="wrap">
    ${sectionHeading({ num: '08', title: 'Cours & ateliers', link: '/cours/', linkLabel: 'Tous les cours' })}
    <div class="grid-3" id="s-cours">
      ${courses.map((c) => courseCard(c)).join('')}
    </div>
  </div>
</section>`;
}

function sectionCollectifs() {
  return `
<section class="section" aria-labelledby="s-collectifs">
  <div class="wrap">
    ${sectionHeading({ num: '09', title: 'Ouvrages collectifs', link: '/ouvrages-collectifs/', linkLabel: 'Appels en cours' })}
    <div class="split">
      <p class="lead" id="s-collectifs">Écrire ensemble&nbsp;: des appels à contributions ouverts aux chercheur·ses et aux écrivain·es.</p>
      <div>
        ${calls
          .map(
            (c) => `
        <article class="reveal" style="border-top: 1px solid var(--line-strong); padding-block: var(--space-3)">
          <p class="article-meta">${esc(c.status)} · limite&nbsp;: <time datetime="${esc(c.deadline)}">${frDate(c.deadline)}</time></p>
          <h3 style="font-size: var(--fs-h3)"><a href="${rel(0, `/ouvrages-collectifs/${c.slug}/`)}" style="text-decoration:none">${esc(c.title)}</a></h3>
          <p class="article-card-sub">${esc(c.theme)}</p>
          <a class="link-more" href="${rel(0, `/proposer-une-contribution/?appel=${c.slug}`)}">Proposer une contribution<span aria-hidden="true"> →</span></a>
        </article>`
          )
          .join('')}
      </div>
    </div>
  </div>
</section>`;
}

function sectionNewsletter() {
  return `
<section class="section section-tint" aria-labelledby="s-newsletter">
  <div class="wrap">
    ${sectionHeading({ num: '10', title: 'Newsletter' })}
    <div class="split">
      <p class="lead" id="s-newsletter">Une lettre sobre&nbsp;: les nouveaux textes, les appels en cours, rien d’autre.</p>
      <div>
        ${newsletterInline()}
      </div>
    </div>
  </div>
</section>`;
}

export const homePage = {
  path: '/',
  file: 'index.html',
  depth: 0,
  title: '',
  description: site.description,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: 'fr',
  },
  body() {
    return [
      hero(),
      sectionAbout(),
      sectionParcours(),
      sectionRecherche(),
      sectionMainBook(),
      sectionPublications(),
      sectionArticles(),
      sectionPremium(),
      sectionCours(),
      sectionCollectifs(),
      sectionNewsletter(),
    ].join('\n');
  },
};
