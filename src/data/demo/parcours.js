/**
 * DEMO DATA — Parcours (timeline) & Recherche
 * ------------------------------------------------------------------
 * All entries are fictional placeholders (`isDemo: true`). No real
 * university, employer, award or date is claimed. Replace with the
 * client's validated biography.
 */

export const parcours = {
  isDemo: true,
  intro:
    'Le parcours ci-dessous est une trame de démonstration : les étapes, dates et intitulés sont fictifs et seront remplacés par le parcours réel de l’auteure.',
  note:
    'Données fictives de démonstration — aucune étape ne correspond à un fait biographique confirmé.',
  steps: [
    {
      period: 'Années de formation',
      title: 'Formation littéraire et académique',
      text: 'Étape de démonstration — parcours de formation à compléter (études, institutions, mémoires).',
    },
    {
      period: 'Premières publications',
      title: 'Entrée en écriture',
      text: 'Étape de démonstration — premiers textes publiés, revues, rencontres éditoriales.',
    },
    {
      period: 'Recherche',
      title: 'Un questionnement dans la durée',
      text: 'Étape de démonstration — axes de recherche, séminaires, collaborations.',
    },
    {
      period: 'Transmission',
      title: 'Cours, ateliers, conférences',
      text: 'Étape de démonstration — enseignements, ateliers d’écriture, interventions publiques.',
    },
    {
      period: 'Aujourd’hui — 2026',
      title: 'Projets en cours',
      text: 'Étape de démonstration — ouvrage en préparation, ouvrages collectifs, nouvelles publications.',
    },
  ],
};

export const recherche = {
  isDemo: true,
  intro:
    'Les axes de recherche présentés ici sont des contenus de démonstration. Ils illustrent la manière dont les travaux réels pourront être décrits : problématique, corpus, méthode, publications associées.',
  axes: [
    {
      id: 'axe-1',
      num: 'I',
      title: 'Littérature et mémoire',
      problem: 'Comment la fiction accueille-t-elle ce que l’histoire ne peut pas dire ?',
      text: 'Axe de démonstration — une réflexion sur les formes narratives de la mémoire : témoins, archives, silences, et la part que la littérature prend à leur transmission.',
      keywords: ['mémoire', 'récit', 'archive', 'témoignage'],
    },
    {
      id: 'axe-2',
      num: 'II',
      title: 'Poétique de la lecture',
      problem: 'Que fait lire au texte — et que fait le texte à celui qui lit ?',
      text: 'Axe de démonstration — une étude des gestes de lecture : annotation, citation, relecture, et la manière dont les lecteurs deviennent à leur tour des auteurs.',
      keywords: ['lecture', 'réception', 'annotation', 'citation'],
    },
    {
      id: 'axe-3',
      num: 'III',
      title: 'Écrire entre les langues',
      problem: 'Qu’advient-il d’une phrase lorsqu’elle passe d’une langue à l’autre ?',
      text: 'Axe de démonstration — une exploration de l’écriture plurilingue : traduction de soi, exil linguistique, hospitalité des langues.',
      keywords: ['plurilinguisme', 'traduction', 'exil', 'hospitalité'],
    },
  ],
  method:
    'Méthode (texte de démonstration) — croiser l’analyse littéraire, l’histoire des idées et l’attention aux pratiques : lire les textes, mais aussi les gestes qui les entourent.',
};
