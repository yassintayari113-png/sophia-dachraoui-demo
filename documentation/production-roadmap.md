# Feuille de route production — SOPHIA-DEMO-V2

Ordre recommandé, du fondement vers la surface.

## Phase 1 — Contenus réels

- [ ] Biographie, parcours et axes de recherche validés par la cliente (remplacer
      `src/data/demo/profile.js` et `parcours.js`).
- [ ] Publications vérifiées (références complètes, DOI le cas échéant).
- [ ] Photographie de portrait et couvertures d'ouvrages (droits d'image vérifiés).
- [ ] Adresse e-mail professionnelle et liens sociaux confirmés (`src/config/site.js`).
- [ ] Mentions légales et politique de confidentialité définitives (droit suisse, nLPD).
- [ ] Suppression de la bannière « démonstration » après relecture complète.

## Phase 2 — Backend

- [ ] Base de données (PostgreSQL) avec les modèles déjà définis : User, Article,
      Publication, Book, Course, Order, PremiumAccess, Proposal, NewsletterSubscriber,
      Review, SiteSettings.
- [ ] API (REST ou tRPC) consommée par les templates existants.
- [ ] Authentification serveur : hachage Argon2id/bcrypt, sessions en cookie httpOnly
      `Secure; SameSite=Lax`, CSRF tokens, vérification d'e-mail, réinitialisation de mot
      de passe signée et expirante, limitation de débit sur login/inscription.
- [ ] Remplacer `src/scripts/auth.js` par des appels API — l'interface publique
      (`AuthSession.read()`) reste le point d'entrée unique.
- [ ] Rôles et autorisations **côté serveur** : jamais de confiance au `role` client.

## Phase 3 — Paiement & premium

- [ ] Stripe ou Payrexx (prestataire suisse) : Payment Intent créé côté serveur, montants
      lus depuis la base (jamais depuis le navigateur), webhooks signés pour accorder
      l'accès (`PremiumAccess`).
- [ ] Contenus premium servis par le backend après vérification d'habilitation ;
      supprimer `assets/premium-content.js`.
- [ ] Factures PDF, TVA suisse le cas échéant, politique de remboursement.

## Phase 4 — CMS réel

- [ ] L'Atelier devient une interface sur l'API : CRUD complet, brouillon/publié,
      planification, upload d'images, gestion des appels et des propositions
      (workflow : reçue → en revue → acceptée/refusée, e-mails de notification).
- [ ] Journal d'audit des actions d'administration.

## Phase 5 — Communications

- [ ] Newsletter : service transactionnel (double opt-in obligatoire), désinscription en
      un clic, registre de consentement.
- [ ] Formulaires (contact, propositions) : envoi serveur, anti-spam (honeypot + Turnstile),
      pièces jointes analysées (type, taille, antivirus).

## Phase 6 — Durcissement & exploitation

- [ ] En-têtes : CSP stricte (nonces), HSTS, `X-Content-Type-Options`, `Referrer-Policy`.
- [ ] Journalisation serveur, alerting, sauvegardes chiffrées.
- [ ] Tests : unitaires sur les modèles, E2E (Playwright) sur les parcours de cette démo,
      scan de dépendances en CI.
- [ ] Mesure d'audience respectueuse (Matomo auto-hébergé) avec bannière de consentement.
- [ ] Validation finale accessibilité (WCAG 2.2 AA) et performance (Core Web Vitals).
