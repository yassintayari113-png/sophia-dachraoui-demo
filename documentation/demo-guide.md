# Guide de la démonstration — SOPHIA-DEMO-V2

## Scénario de présentation (10 minutes)

1. **Accueil (`/`)** — faire défiler : les 11 sections numérotées (à propos, parcours,
   recherche, ouvrage, publications, articles, premium, cours, ouvrages collectifs,
   newsletter, pied de page). Souligner la bannière « site de démonstration ».
2. **Article libre** — *Lire à l'ère des écrans* : typographie de lecture, lettrine,
   citation, articles liés.
3. **Paywall** — *Écrire entre les langues* : aperçu, offre à CHF 4.50.
4. **Compte** — se connecter avec `demo-member@example.test` / `DemoOnly-2026!`
   (identifiants affichés sur la page de connexion).
5. **Paiement simulé** — accepter des valeurs fictives, lire l'avertissement
   « aucune transaction réelle », confirmer.
6. **Déblocage** — retour à l'article : le texte intégral apparaît ; vérifier l'espace
   membre (contenus achetés, commandes).
7. **Recherche (`/rechercher/`)** — taper « mémoire », filtrer par type, montrer l'état vide.
8. **Ouvrages collectifs** — ouvrir un appel, *Proposer une contribution*, envoyer,
   montrer la confirmation avec référence fictive.
9. **Atelier (`/atelier/`)** — tableau de bord (statistiques étiquetées fictives), listes
   filtrables, actions simulées, page réglages avec les limites de la démo.
10. **Mobile** — refaire le parcours à 390 px : menu, hero, paywall, formulaires.

## Questions probables de la cliente

- **« Est-ce que mes vrais textes peuvent remplacer ces contenus ? »** — Oui : tout vit dans
  `src/data/demo/`, un fichier par type de contenu, rien n'est dispersé dans les pages.
- **« Le paiement est-il réel ? »** — Non : simulation explicite. La production intégrera un
  prestataire certifié (Stripe, Payrexx) avec montants calculés côté serveur.
- **« Peut-on retirer la bannière de démonstration ? »** — Oui, au lancement, avec les
  contenus réels et les mentions légales définitives.
- **« Le portrait et les couvertures ? »** — Placeholders SVG générés : remplacer les fichiers
  dans `public/images/` en conservant les noms.

## Réinitialiser la démo

Dans l'espace membre → *Réglages* → **Effacer mes données de démonstration**
(supprime session, achats, inscriptions et propositions locales).
