# SOPHIA — DEMO V2.1

Site éditorial, littéraire et académique de démonstration pour Sophia Dachraoui.

## Architecture

`src/` = source of truth · `build/` = générateur · `docs/` = publication GitHub Pages / fichiers statiques · `server/` = API Node pour Render + Neon · `db/schema.sql` = schéma PostgreSQL.

La version publique reste explicitement en mode démonstration tant que `DEMO_MODE=true` : pas de vrai paiement, pas de vrai envoi d’e-mail, pas de contenu premium sécurisé côté serveur de production.

## Local

```bash
npm install
npm run build
npm start
```

## Déploiement

Voir `DEPLOYMENT.md` et `render.yaml`.

## Démo

`demo-owner@example.test` / `DemoOnly-2026!`

`demo-member@example.test` / `DemoOnly-2026!`
