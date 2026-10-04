/**
 * Static editorial pages: À propos, Parcours, Recherche, Contact,
 * Newsletter, legal pages, 404.
 */
import { profile } from '../data/demo/profile.js';
import { parcours, recherche } from '../data/demo/parcours.js';
import { rel, esc } from '../templates/helpers.js';
import { demoNote } from '../templates/components.js';

function pageHero(breadcrumb, eyebrowText, title, lead) {
  return `
<section class="page-hero">
  <div class="wrap">
    <nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="./">Accueil</a><span aria-hidden="true">/</span><span>${esc(breadcrumb)}</span></nav>
    <p class="eyebrow">${esc(eyebrowText)}</p>
    <h1>${esc(title)}</h1>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
  </div>
</section>`;
}

export const aProposPage = {
  path: '/a-propos/',
  file: 'a-propos/index.html',
  depth: 1,
  title: 'À propos',
  description: 'Présentation de Sophia Dachraoui — écriture, littérature, recherche et transmission. Contenu de démonstration.',
  body() {
    return `
${pageHero('À propos', 'Présentation', 'À propos', profile.intro)}
<section class="section">
  <div class="wrap split">
    <div class="split-sticky">
      <figure class="hero-portrait" style="max-width: 340px">
        <img src="${rel(1, profile.portrait.src)}" alt="${esc(profile.portrait.alt)}" width="600" height="750">
        <figcaption>${esc(profile.portrait.caption)}</figcaption>
      </figure>
      ${demoNote('Cette présentation est un texte fictif de démonstration : elle ne décrit aucun fait biographique confirmé et sera remplacée par la biographie réelle de la cliente.')}
    </div>
    <div class="prose" style="font-size: 1.08rem">
      ${profile.aboutLong.map((p) => `<p>${esc(p)}</p>`).join('\n')}
      <div class="grid-2" style="margin-top: var(--space-4)">
        ${profile.domains
          .map(
            (d) => `
        <div class="reveal" style="border-top: 1px solid var(--line-strong); padding-top: var(--space-2)">
          <h2 style="font-size: var(--fs-h3)">${esc(d.label)}</h2>
          <p style="font-size: var(--fs-small)">${esc(d.text)}</p>
        </div>`
          )
          .join('')}
      </div>
    </div>
  </div>
</section>`;
  },
};

export const parcoursPage = {
  path: '/parcours/',
  file: 'parcours/index.html',
  depth: 1,
  title: 'Parcours',
  description: 'Parcours de démonstration — trame fictive en attente de la biographie validée.',
  body() {
    return `
${pageHero('Parcours', 'Itinéraire', 'Parcours', parcours.intro)}
<section class="section">
  <div class="wrap">
    ${demoNote(parcours.note)}
    <ol class="timeline" style="margin-top: var(--space-4); max-width: 720px">
      ${parcours.steps
        .map(
          (s) => `
      <li class="timeline-item reveal">
        <p class="timeline-period">${esc(s.period)}</p>
        <h2 style="font-size: var(--fs-h3)">${esc(s.title)}</h2>
        <p>${esc(s.text)}</p>
      </li>`
        )
        .join('')}
    </ol>
  </div>
</section>`;
  },
};

export const recherchePage = {
  path: '/recherche/',
  file: 'recherche/index.html',
  depth: 1,
  title: 'Recherche',
  description: 'Axes de recherche (contenu de démonstration) — littérature et mémoire, poétique de la lecture, écriture entre les langues.',
  body() {
    return `
${pageHero('Recherche', 'Chantiers en cours', 'Recherche', recherche.intro)}
<section class="section">
  <div class="wrap">
    ${recherche.axes
      .map(
        (a) => `
    <article class="axis reveal">
      <span class="axis-num" aria-hidden="true">${esc(a.num)}</span>
      <div>
        <h2 style="font-size: var(--fs-h2)">${esc(a.title)}</h2>
        <p class="axis-problem">${esc(a.problem)}</p>
        <p style="color: var(--ink-soft); max-width: var(--measure)">${esc(a.text)}</p>
        <div class="tag-row">${a.keywords.map((k) => `<span class="badge badge-neutral">${esc(k)}</span>`).join('')}</div>
      </div>
    </article>`
      )
      .join('')}
    <div class="prose" style="margin-top: var(--space-4)">
      <h2 style="font-size: var(--fs-h3)">Méthode</h2>
      <p>${esc(recherche.method)}</p>
    </div>
    ${demoNote('Axes fictifs de démonstration — les travaux réels seront décrits ici après validation.')}
  </div>
</section>`;
  },
};

export const contactPage = {
  path: '/contact/',
  file: 'contact/index.html',
  depth: 1,
  title: 'Contact',
  description: 'Contacter Sophia Dachraoui — formulaire de contact (démonstration).',
  body() {
    return `
${pageHero('Contact', 'Écrire', 'Contact', 'Pour une invitation, une collaboration éditoriale, un cours ou une question de recherche.')}
<section class="section">
  <div class="wrap split">
    <div>
      <div class="prose">
        <p>Les messages sont lus avec attention. Pour les propositions d’ouvrages collectifs, merci d’utiliser le <a href="${rel(1, '/ouvrages-collectifs/')}" style="color: var(--wine)">formulaire dédié</a>.</p>
        <p style="font-size: var(--fs-small)">Adresse professionnelle&nbsp;: <em>à confirmer par la cliente</em> — aucune adresse réelle n’est affichée dans cette démonstration.</p>
      </div>
      ${demoNote('Démonstration — le formulaire simule l’envoi ; aucun message n’est réellement transmis.')}
    </div>
    <div class="form-card" style="margin-inline: 0; max-width: none">
      <form data-contact-form novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="ct-nom">Nom</label>
            <input id="ct-nom" name="nom" type="text" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="ct-email">Adresse e-mail</label>
            <input id="ct-email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="ct-objet">Objet</label>
            <select id="ct-objet" name="objet" required>
              <option value="">Choisir…</option>
              <option>Invitation / conférence</option>
              <option>Collaboration éditoriale</option>
              <option>Cours et ateliers</option>
              <option>Question de recherche</option>
              <option>Autre</option>
            </select>
          </div>
          <div class="field">
            <label for="ct-msg">Message</label>
            <textarea id="ct-msg" name="message" required minlength="20"></textarea>
            <p class="form-hint">20 caractères minimum.</p>
          </div>
          <button class="btn btn-primary" type="submit">Envoyer le message</button>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </div>
      </form>
    </div>
  </div>
</section>`;
  },
};

export const newsletterPage = {
  path: '/newsletter/',
  file: 'newsletter/index.html',
  depth: 1,
  title: 'Newsletter',
  description: 'S’inscrire à la newsletter — nouveaux textes et appels à contributions (démonstration).',
  body() {
    return `
${pageHero('Newsletter', 'La lettre', 'Newsletter', 'Une lettre peu fréquente : les nouveaux textes, les appels en cours, les cours à venir.')}
<section class="section">
  <div class="wrap" style="max-width: 640px">
    <div class="form-card" style="max-width: none">
      <form data-newsletter-full novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="nl-email">Adresse e-mail</label>
            <input id="nl-email" name="email" type="email" autocomplete="email" required placeholder="vous@exemple.ch">
          </div>
          <div class="field-check">
            <input id="nl-consent" name="consent" type="checkbox" required>
            <label for="nl-consent" style="margin: 0">J’accepte de recevoir la lettre et je comprends que cette inscription est une démonstration&nbsp;: aucun e-mail réel ne sera envoyé.</label>
          </div>
          <button class="btn btn-primary" type="submit">S’inscrire (démonstration)</button>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </div>
      </form>
    </div>
    ${demoNote('Inscription simulée côté navigateur. En production, l’inscription serait enregistrée côté serveur avec double confirmation.')}
  </div>
</section>`;
  },
};

function legalBody(title, intro, sections) {
  return `
${pageHero(title, 'Informations', title, intro)}
<section class="section">
  <div class="wrap prose" style="max-width: 720px">
    ${sections.map(([h, t]) => `<h2 style="font-size: var(--fs-h3); margin-top: var(--space-4)">${esc(h)}</h2><p>${esc(t)}</p>`).join('\n')}
    ${demoNote('Page de démonstration — les mentions légales définitives (éditeur, hébergement, protection des données, droit suisse) seront rédigées avant la mise en production.')}
  </div>
</section>`;
}

export const mentionsLegalesPage = {
  path: '/mentions-legales/',
  file: 'mentions-legales/index.html',
  depth: 1,
  title: 'Mentions légales',
  description: 'Mentions légales — page de démonstration.',
  noindex: true,
  body() {
    return legalBody('Mentions légales', 'Informations relatives à l’édition de ce site (démonstration).', [
      ['Éditeur', 'Site personnel de démonstration préparé pour Sophia Dachraoui. Les coordonnées d’édition réelles seront publiées ici avant le lancement.'],
      ['Contenus', 'Tous les contenus marqués comme démonstration sont fictifs et ne présentent aucun fait réel.'],
      ['Hébergement', 'Les informations d’hébergement seront indiquées lors de la mise en production.'],
    ]);
  },
};

export const confidentialitePage = {
  path: '/confidentialite/',
  file: 'confidentialite/index.html',
  depth: 1,
  title: 'Confidentialité',
  description: 'Politique de confidentialité — page de démonstration.',
  noindex: true,
  body() {
    return legalBody('Confidentialité', 'Comment cette démonstration traite les données (et ce que la version de production devra garantir).', [
      ['Démonstration', 'Cette version de démonstration ne transmet aucune donnée à un serveur : formulaires, comptes et paiements sont simulés localement dans votre navigateur.'],
      ['Production', 'La version de production appliquera la législation suisse (nLPD) et, le cas échéant, le RGPD : minimisation des données, consentement explicite, droit d’accès et de suppression, durées de conservation documentées.'],
      ['Cookies', 'Aucun cookie de mesure d’audience n’est déposé dans cette démonstration.'],
    ]);
  },
};

export const notFoundPage = {
  path: '/404.html',
  file: '404.html',
  depth: 0,
  title: 'Page introuvable',
  description: 'Cette page s’est égarée.',
  noindex: true,
  bodyClass: 'page-404',
  body() {
    return `
<section class="notfound wrap">
  <p class="notfound-code" aria-hidden="true">404</p>
  <h1>Cette page s’est égarée.</h1>
  <p class="prose" style="margin-inline: auto; max-width: 44ch">Le texte que vous cherchez n’est pas à cette adresse — ou n’a pas encore été écrit.</p>
  <div class="hero-ctas" style="justify-content: center">
    <a class="btn btn-primary" href="./">Retour à l’accueil</a>
    <a class="btn btn-outline" href="./rechercher/">Rechercher un texte</a>
  </div>
</section>`;
  },
};
