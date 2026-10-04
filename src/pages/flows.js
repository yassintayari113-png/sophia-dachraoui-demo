/**
 * Flow pages — Recherche, Connexion, Inscription, Mot de passe oublié,
 * Espace membre, Paiement (démo), Confirmation.
 */
import { rel, esc, chf, frDate } from '../templates/helpers.js';
import { demoNote } from '../templates/components.js';
import { articles } from '../data/demo/articles.js';
import { courses } from '../data/demo/content.js';

function pageHero(depth, breadcrumb, eyebrowText, title, lead) {
  return `
<section class="page-hero">
  <div class="wrap">
    <nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="${rel(depth, '/')}">Accueil</a><span aria-hidden="true">/</span><span>${esc(breadcrumb)}</span></nav>
    <p class="eyebrow">${esc(eyebrowText)}</p>
    <h1>${esc(title)}</h1>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
  </div>
</section>`;
}

/* ------------------------------ Recherche ----------------------------- */

export const searchPage = {
  path: '/rechercher/',
  file: 'rechercher/index.html',
  depth: 1,
  title: 'Rechercher',
  description: 'Rechercher dans les articles, publications, livres, cours et axes de recherche du site.',
  body() {
    return `
<section class="page-hero search-hero">
  <div class="wrap">
    <nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="../">Accueil</a><span aria-hidden="true">/</span><span>Rechercher</span></nav>
    <p class="eyebrow">Explorer</p>
    <h1 id="search-title">Rechercher</h1>
    <form role="search" data-search-form style="margin-top: var(--space-3)">
      <label class="sr-only" for="search-input">Rechercher sur le site</label>
      <input id="search-input" type="search" name="q" placeholder="Un mot, un titre, un thème…" autocomplete="off" data-search-input>
    </form>
    <div class="search-filters" role="group" aria-label="Filtrer les résultats" data-search-filters>
      <button class="filter-chip" type="button" data-type="all" aria-pressed="true">Tout</button>
      <button class="filter-chip" type="button" data-type="article" aria-pressed="false">Articles</button>
      <button class="filter-chip" type="button" data-type="publication" aria-pressed="false">Publications</button>
      <button class="filter-chip" type="button" data-type="livre" aria-pressed="false">Livres</button>
      <button class="filter-chip" type="button" data-type="cours" aria-pressed="false">Cours</button>
      <button class="filter-chip" type="button" data-type="recherche" aria-pressed="false">Recherche</button>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <p class="search-count" data-search-count role="status" aria-live="polite">Saisissez un terme pour lancer la recherche.</p>
    <div data-search-results></div>
    <div data-search-empty hidden>
      <div class="empty-state">
        <p class="empty-state-mark" aria-hidden="true">· · ·</p>
        <h2 class="empty-state-title">Aucun résultat</h2>
        <p>Aucun contenu ne correspond à votre recherche. Essayez un autre terme, ou parcourez les <a href="../articles/" style="color: var(--wine)">articles</a>.</p>
        <button class="btn btn-outline" type="button" data-search-clear>Effacer la recherche</button>
      </div>
    </div>
  </div>
</section>`;
  },
};

/* --------------------------- Authentification -------------------------- */

const demoCreds = `
<div class="demo-credentials">
  <h2>Comptes de démonstration</h2>
  <p style="margin: 0 0 0.4rem">Propriétaire&nbsp;: <code>demo-owner@example.test</code> · <code>DemoOnly-2026!</code></p>
  <p style="margin: 0">Membre&nbsp;: <code>demo-member@example.test</code> · <code>DemoOnly-2026!</code></p>
</div>`;

export const loginPage = {
  path: '/connexion/',
  file: 'connexion/index.html',
  depth: 1,
  title: 'Connexion',
  description: 'Connexion à l’espace membre (démonstration).',
  noindex: true,
  extraScripts: `<script src="../assets/auth.js" defer></script>`,
  body() {
    return `
${pageHero(1, 'Connexion', 'Espace membre', 'Connexion', 'Retrouvez vos achats, vos articles enregistrés et vos cours.')}
<section class="section">
  <div class="wrap">
    <div class="form-card">
      <form data-login-form novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="lg-email">Adresse e-mail</label>
            <input id="lg-email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="lg-password">Mot de passe</label>
            <input id="lg-password" name="password" type="password" autocomplete="current-password" required>
          </div>
          <button class="btn btn-primary" type="submit">Se connecter</button>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </div>
      </form>
      <p class="auth-alt"><a href="../mot-de-passe-oublie/">Mot de passe oublié&nbsp;?</a> · <a href="../inscription/">Créer un compte</a></p>
      ${demoCreds}
      ${demoNote('Authentification simulée côté navigateur — en production, sessions sécurisées côté serveur.')}
    </div>
  </div>
</section>`;
  },
};

export const registerPage = {
  path: '/inscription/',
  file: 'inscription/index.html',
  depth: 1,
  title: 'Créer un compte',
  description: 'Créer un compte membre (démonstration).',
  noindex: true,
  extraScripts: `<script src="../assets/auth.js" defer></script>`,
  body() {
    return `
${pageHero(1, 'Inscription', 'Espace membre', 'Créer un compte', 'Un compte pour lire les essais premium, suivre les cours et enregistrer vos articles.')}
<section class="section">
  <div class="wrap">
    <div class="form-card">
      <form data-register-form novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="rg-nom">Nom</label>
            <input id="rg-nom" name="nom" type="text" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="rg-email">Adresse e-mail</label>
            <input id="rg-email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="rg-password">Mot de passe</label>
            <input id="rg-password" name="password" type="password" autocomplete="new-password" required minlength="10" aria-describedby="rg-hint">
            <p class="form-hint" id="rg-hint">10 caractères minimum. Démo : ne réutilisez jamais un vrai mot de passe.</p>
          </div>
          <div class="field-check">
            <input id="rg-consent" name="consent" type="checkbox" required>
            <label for="rg-consent" style="margin: 0">J’ai lu les <a href="../confidentialite/" style="color: var(--wine)">informations de confidentialité</a> et je comprends que ce compte est une démonstration.</label>
          </div>
          <button class="btn btn-primary" type="submit">Créer mon compte</button>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </div>
      </form>
      <p class="auth-alt">Déjà membre&nbsp;? <a href="../connexion/">Se connecter</a></p>
      ${demoNote('Aucun mot de passe réel n’est stocké : la démo garde uniquement une session locale simulée.')}
    </div>
  </div>
</section>`;
  },
};

export const forgotPage = {
  path: '/mot-de-passe-oublie/',
  file: 'mot-de-passe-oublie/index.html',
  depth: 1,
  title: 'Mot de passe oublié',
  description: 'Réinitialisation du mot de passe (démonstration).',
  noindex: true,
  extraScripts: `<script src="../assets/auth.js" defer></script>`,
  body() {
    return `
${pageHero(1, 'Mot de passe oublié', 'Espace membre', 'Mot de passe oublié', 'Indiquez votre adresse : en production, un lien de réinitialisation vous serait envoyé.')}
<section class="section">
  <div class="wrap">
    <div class="form-card">
      <form data-forgot-form novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="fg-email">Adresse e-mail</label>
            <input id="fg-email" name="email" type="email" autocomplete="email" required>
          </div>
          <button class="btn btn-primary" type="submit">Recevoir le lien (démo)</button>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </div>
      </form>
      <p class="auth-alt"><a href="../connexion/">Retour à la connexion</a></p>
      ${demoNote('Démonstration — aucun e-mail n’est réellement envoyé.')}
    </div>
  </div>
</section>`;
  },
};

/* ---------------------------- Espace membre ---------------------------- */

export const memberPage = {
  path: '/espace-membre/', file: 'espace-membre/index.html', depth: 1,
  title: 'Espace membre', description: 'Espace membre — achats, articles enregistrés, cours, commandes et réglages.', noindex: true,
  extraScripts: `<script src="../assets/auth.js" defer></script><script src="../assets/member.js" defer></script>`,
  body() { return `
<section class="page-hero"><div class="wrap"><nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="../">Accueil</a><span aria-hidden="true">/</span><span>Espace membre</span></nav><p class="eyebrow">Votre bibliothèque</p><h1>Espace membre</h1>${demoNote('Démonstration — vos actions utilisent le serveur sur Render et un mode local de secours sur GitHub Pages.')}</div></section>
<section class="section"><div class="wrap" data-member-root>
  <div class="empty-state" data-member-gate>
    <p class="empty-state-mark" aria-hidden="true">✦</p><h2 class="empty-state-title">Connexion requise</h2>
    <p>Cet espace est réservé aux membres. Connectez-vous avec un compte de démonstration pour le découvrir.</p>
    <div class="hero-ctas member-cta"><a class="btn btn-primary" href="../connexion/">Se connecter</a><a class="btn btn-outline" href="../inscription/">Créer un compte</a></div>
    <div class="demo-credentials member-credentials"><h2>Comptes de démonstration</h2><p>Propriétaire : <code>demo-owner@example.test</code> · <code>DemoOnly-2026!</code></p><p>Membre : <code>demo-member@example.test</code> · <code>DemoOnly-2026!</code></p></div>
  </div>
  <div class="member-grid" data-member-app hidden>
    <nav class="member-nav" aria-label="Navigation de l’espace membre" data-member-nav>
      <a href="#profil" data-tab="profil" aria-current="true">Profil</a><a href="#achats" data-tab="achats">Contenus achetés</a><a href="#enregistres" data-tab="enregistres">Articles enregistrés</a><a href="#cours" data-tab="cours">Mes cours</a><a href="#commandes" data-tab="commandes">Commandes</a><a href="#reglages" data-tab="reglages">Réglages</a><a href="#" data-logout>Se déconnecter</a>
    </nav>
    <div class="member-panel" data-member-panel aria-live="polite"></div>
  </div>
</div></section>`; }
};

/* ------------------------------ Paiement ------------------------------- */

function checkoutItem() {
  return { articles, courses };
}

export const checkoutPage = {
  path: '/paiement/',
  file: 'paiement/index.html',
  depth: 1,
  title: 'Paiement (démonstration)',
  description: 'Paiement de démonstration — aucune transaction réelle n’est effectuée.',
  noindex: true,
  extraScripts: `<script>window.__DEMO_ITEMS__=${JSON.stringify({
    articles: Object.fromEntries(articles.filter((a) => a.premium).map((a) => [a.slug, { title: a.title, price: a.price, kind: 'Article premium' }])),
    courses: Object.fromEntries(courses.map((c) => [c.slug, { title: c.title, price: c.price, kind: 'Cours' }])),
  })};</script><script src="../assets/checkout.js" defer></script>`,
  body() {
    return `
${pageHero(1, 'Paiement', 'Finaliser', 'Paiement de démonstration', 'Cette page simule un paiement. Aucune transaction réelle n’est effectuée, aucune donnée bancaire n’est enregistrée.')}
<section class="section">
  <div class="wrap checkout-grid">
    <div class="form-card" style="margin: 0; max-width: none">
      <form data-checkout-form novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="ck-nom">Nom sur la carte</label>
            <input id="ck-nom" name="nom" type="text" autocomplete="cc-name" required>
          </div>
          <div class="field">
            <label for="ck-email">Adresse e-mail</label>
            <input id="ck-email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="ck-card">Numéro de carte (fictif)</label>
            <input id="ck-card" name="carte" type="text" inputmode="numeric" placeholder="0000 0000 0000 0000" maxlength="19" required pattern="[0-9 ]{15,19}">
            <p class="form-hint">Démo : saisissez n’importe quelle suite de chiffres — elle n’est ni envoyée ni conservée.</p>
          </div>
          <div class="grid-2" style="gap: var(--space-3)">
            <div class="field">
              <label for="ck-exp">Expiration</label>
              <input id="ck-exp" name="exp" type="text" inputmode="numeric" placeholder="MM/AA" maxlength="5" required pattern="(0[1-9]|1[0-2])/\\d{2}">
            </div>
            <div class="field">
              <label for="ck-cvc">CVC</label>
              <input id="ck-cvc" name="cvc" type="text" inputmode="numeric" placeholder="123" maxlength="4" required pattern="\\d{3,4}">
            </div>
          </div>
          <div class="field-check">
            <input id="ck-consent" name="consent" type="checkbox" required>
            <label for="ck-consent" style="margin: 0">Je comprends qu’il s’agit d’un <strong>paiement de démonstration</strong>&nbsp;: aucune transaction réelle n’est effectuée.</label>
          </div>
          <button class="btn btn-wine" type="submit">Payer (simulation)</button>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </div>
      </form>
    </div>
    <aside class="order-summary" aria-labelledby="os-title">
      <h2 id="os-title">Votre commande</h2>
      <div data-order-lines>
        <p style="color: var(--ink-soft); font-size: var(--fs-small)">Aucun article sélectionné — cette page s’ouvre depuis un article premium ou un cours.</p>
      </div>
      ${demoNote('En production : prestataire de paiement certifié (Stripe, Payrexx), montants calculés et vérifiés côté serveur.')}
    </aside>
  </div>
</section>`;
  },
};

export const successPage = {
  path: '/paiement/confirmation/', file: 'paiement/confirmation/index.html', depth: 2,
  title: 'Paiement confirmé (démonstration)', description: 'Confirmation de paiement simulé — aucune transaction réelle.', noindex: true,
  body() { return `
<section class="notfound wrap"><p class="form-success-mark" aria-hidden="true">✦</p><h1>Paiement confirmé.</h1>
<p class="prose success-copy">Votre <strong>paiement de démonstration</strong> est confirmé. Aucune transaction réelle n’a eu lieu. Le contenu est maintenant disponible dans votre espace membre.</p>
<div class="hero-ctas success-actions"><a class="btn btn-primary" href="../../espace-membre/">Ouvrir mon espace membre</a><a class="btn btn-outline" href="../../articles-premium/">Continuer à explorer</a></div><p class="success-ref"><span class="badge badge-neutral">Commande fictive — référence locale</span></p></section>`; }
};
