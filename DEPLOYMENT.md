# SOPHIA — déploiement

## GitHub Pages

Le dossier `docs/` est volontairement généré et suivi par Git. Dans GitHub : **Settings → Pages → Deploy from a branch → `main` → `/docs`**. GitHub Pages accepte comme dossier de publication le root ou `/docs`.

Le site fonctionne sans serveur grâce au fallback navigateur. Les comptes, achats et formulaires de démonstration restent alors locaux au navigateur.

## Render + Neon

Le projet inclut `render.yaml`. Render peut exécuter un Web Service Node avec `npm install && npm run build`, puis `npm start`; `runtime: node` et `healthCheckPath` sont pris en charge par les Blueprints Render.

Dans Render, renseigner `DATABASE_URL` avec la connexion Neon et `SESSION_SECRET` avec une valeur aléatoire longue. Le serveur initialise automatiquement les tables nécessaires au premier démarrage. Le driver PostgreSQL `pg` est utilisé pour Neon/Postgres; Neon fournit également un driver serverless officiel si une future architecture edge est souhaitée.

Le serveur gère actuellement les sessions, comptes de démo, achats simulés, newsletter, messages, propositions et état du CMS de démonstration. Les paiements restent intentionnellement simulés.

## Comptes de démonstration

- Propriétaire : `demo-owner@example.test` / `DemoOnly-2026!`
- Membre : `demo-member@example.test` / `DemoOnly-2026!`

Ne jamais réutiliser ces identifiants en production.
