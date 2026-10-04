# Architecture — SOPHIA-DEMO-V2

## Vue d'ensemble

Générateur de site statique sans dépendances. Le build Node.js rend chaque page en HTML
complet ; le navigateur ne reçoit du JavaScript que pour l'interactivité. Cette approche
donne : performance, SEO natif, lisibilité sans JS, et un chemin de migration simple vers
un backend (les fonctions de rendu peuvent devenir des templates serveur).

## Flux de build

```
src/config/site.js ──┐
src/data/demo/*.js ──┼─► src/pages/*.js (fonctions page) ─► src/templates/* (layout,
public/ (assets) ────┘        composants, échappement) ─► build/build.js ─► docs/
src/scripts/*.js ───────────────────────────────────────────────────────────► docs/assets/
src/styles/*.css ───────────────────────────────────────────────────────────► docs/assets/
```

Produits dérivés au build : `search-index.json` (recherche instantanée),
`premium-content.js` (corps des articles premium, chargé uniquement après déblocage démo),
`sitemap.xml`, `robots.txt`.

## Couche de données

Modèles présents dans `src/data/demo/` : `Profile`, `Article`, `Publication`, `Book`,
`Course`, `Call`, `Proposal`, `Order`, `NewsletterSubscriber`, `User`, `Review`,
`AdminStats`, `Activity`. Chaque enregistrement incertain porte `isDemo: true`.

Remplacement futur : une fonction d'accès par collection (`getArticles()`…) peut être
interposée entre `src/data/demo/` et `src/pages/` sans toucher aux templates.

## Frontière de confiance (démo)

```
navigateur ── localStorage : session démo, achats démo, newsletter démo, propositions démo
           └─ TOUT y est forgeable → rien de sensible ne doit en dépendre.
```

Le code part du principe que le client ne fait jamais autorité : paywall, prix, rôles et
statuts sont ré-affichés comme des simulations, et la roadmap production détaille les
contrôles serveur correspondants.

## Composants

`src/templates/components.js` : `sectionHeading`, `articleCard`, `bookCard`, `courseCard`,
`badge`, `demoNote`, `newsletterInline`, `bodyBlocks`, `emptyState`. Tout HTML généré passe
par `esc()` (échappement) sauf contenu de template de confiance.

## Scripts client (chargés à la demande par page)

| Script | Pages | Rôle |
|---|---|---|
| `app.js` | toutes | menu mobile, reveal, filtres articles, formulaires, recherche |
| `auth.js` | connexion/inscription/oubli | service d'authentification simulé (isolé) |
| `member.js` | espace membre | tableau de bord, onglets, achats locaux |
| `checkout.js` | paiement | simulation de paiement, allow-list d'articles |
| `premium.js` | articles premium | déblocage après achat démo |
| `admin.js` | atelier | filtres de tables, actions simulées, toasts |
