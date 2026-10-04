/**
 * DEMO DATA — Profil
 * ------------------------------------------------------------------
 * IMPORTANT: nothing here is a confirmed biographical fact about
 * Sophia Dachraoui. All texts are neutral placeholders written so the
 * client can replace them with her real biography. `isDemo: true`
 * marks every record that must be validated before production.
 */

export const profile = {
  isDemo: true,
  name: 'Sophia Dachraoui',
  role: 'Écriture · Littérature · Recherche · Transmission',
  // Neutral, non-biographical introduction. Replace with the client's own words.
  intro:
    'Un espace dédié à la littérature, à la recherche et à la transmission — où l’écriture se pense comme une manière d’habiter le monde et de le partager.',
  aboutShort:
    'Ce site rassemble un travail mené entre écriture et recherche : des essais, des publications, des cours et des projets éditoriaux collectifs. Chaque texte de cette démonstration est un contenu fictif, destiné à être remplacé par les contenus réels de l’auteure.',
  // Longer « À propos » paragraphs — intentionally generic, no fabricated facts.
  aboutLong: [
    'Cet espace personnel réunit les différentes dimensions d’une même pratique : écrire, chercher, transmettre. Il se veut à la fois une bibliothèque ouverte, un carnet de recherche et un lieu de rencontre avec les lectrices et les lecteurs.',
    'Les pages qui suivent présentent des contenus de démonstration : articles, publications, cours et appels à contributions y sont fictifs. Ils donnent à voir la structure et l’esprit du site définitif, dont les contenus seront validés et fournis par l’auteure.',
    'La démarche qui anime ce site tient en quelques convictions simples : la littérature est une expérience partagée, la recherche gagne à être racontée avec clarté, et la transmission est un geste d’hospitalité intellectuelle.',
  ],
  portrait: {
    src: 'images/portrait.svg',
    alt: 'Portrait de Sophia Dachraoui — visuel de démonstration',
    caption: 'Visuel de démonstration — portrait à confirmer par la cliente.',
  },
  // Areas of focus shown as themes (not as CV claims).
  domains: [
    { label: 'Écriture', text: 'Essais, récits et textes littéraires — le travail de la langue comme matière première.' },
    { label: 'Recherche', text: 'Un questionnement mené dans la durée, entre littérature, histoire des idées et pratiques de lecture.' },
    { label: 'Transmission', text: 'Cours, ateliers et conférences : faire circuler les textes et les outils pour les lire.' },
    { label: 'Édition', text: 'Direction d’ouvrages collectifs et accompagnement de projets d’écriture.' },
  ],
};
