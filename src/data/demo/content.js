/**
 * DEMO DATA — Livres, Publications, Cours
 * ------------------------------------------------------------------
 * Fictional works (`isDemo: true`). No real publisher, collection,
 * ISBN or journal is used. Covers are generated SVG placeholders.
 */

export const books = [
  {
    isDemo: true,
    slug: 'la-langue-habitee',
    title: 'La Langue habitée',
    subtitle: 'Essai sur la lecture comme demeure',
    kind: 'Essai — ouvrage principal',
    year: 2026,
    status: 'En préparation',
    pages: 224,
    publisher: 'Éditeur à confirmer — contenu de démonstration',
    isbn: null, // no fake ISBN
    cover: 'images/couverture-la-langue-habitee.svg',
    summary:
      'Ouvrage de démonstration. Le projet : suivre la lecture comme on suit une maison — ses pièces, ses seuils, ses lieux de passage — et demander ce que signifie « habiter » un texte.',
    description: [
      'Ce livre — dont la présentation est ici fictive — propose de penser la lecture comme une forme d’habitation. On n’y traverse pas les textes comme des couloirs : on s’y installe, on y revient, on y laisse des traces.',
      'Chaque chapitre explore une pièce de cette maison : le seuil (commencer), la fenêtre (le point de vue), la marge (habiter le bord), la bibliothèque (les pièces communes).',
      'Contenu de démonstration — le résumé, la table et l’extrait seront remplacés par les éléments réels de l’ouvrage.',
    ],
    toc: ['Seuil — commencer', 'Fenêtre — le point de vue', 'Marge — habiter le bord', 'Bibliothèque — les pièces communes', 'Escalier — la relecture'],
    excerptQuote: 'Habiter un texte, c’est accepter qu’il nous démeuble un peu.',
    related: ['lire-a-l-ere-des-ecrans', 'la-bibliotheque-comme-paysage'],
  },
  {
    isDemo: true,
    slug: 'carnets-du-seuil',
    title: 'Carnets du seuil',
    subtitle: 'Fragments sur l’écriture qui commence',
    kind: 'Récit — carnets',
    year: 2024,
    status: 'Projet fictif',
    pages: 132,
    publisher: 'Éditeur à confirmer — contenu de démonstration',
    isbn: null,
    cover: 'images/couverture-carnets-du-seuil.svg',
    summary:
      'Ouvrage de démonstration. Une suite de fragments sur le moment où l’écriture commence : la première phrase, la page blanche, les faux départs.',
    description: [
      'Ces carnets fictifs rassemblent des fragments écrits « au seuil » : avant le livre, avant le plan, au moment où l’écriture n’est encore qu’une hésitation qui s’essaie.',
      'Contenu de démonstration — présentation à remplacer.',
    ],
    toc: ['Faux départs', 'La première phrase', 'Listes', 'Ce que l’on n’écrira pas'],
    excerptQuote: 'Commencer, c’est consentir à ne pas encore savoir.',
    related: ['le-carnet-avant-le-livre'],
  },
];

export const publications = [
  {
    isDemo: true,
    slug: 'lecture-et-hospitalite',
    title: 'La lecture comme hospitalité',
    venue: 'Revue fictive de démonstration — Cahiers de littérature comparée (à confirmer)',
    year: 2026,
    type: 'Article de revue',
    abstract:
      'Résumé de démonstration — une étude du geste de lecture comme accueil : ouvrir un texte, c’est lui faire une place, avec ce que tout accueil suppose de règles et de risques.',
  },
  {
    isDemo: true,
    slug: 'marges-vivantes',
    title: 'Marges vivantes : pour une histoire de l’annotation',
    venue: 'Revue fictive de démonstration — Études de lettres (à confirmer)',
    year: 2025,
    type: 'Article de revue',
    abstract:
      'Résumé de démonstration — jalons pour une histoire culturelle de l’annotation, de la glose médiévale aux carnets numériques.',
  },
  {
    isDemo: true,
    slug: 'traduire-sa-propre-voix',
    title: 'Traduire sa propre voix',
    venue: 'Actes de colloque fictifs — Rencontres de la traduction littéraire (à confirmer)',
    year: 2025,
    type: 'Communication',
    abstract:
      'Résumé de démonstration — l’autotraduction comme atelier d’écriture : ce que la seconde langue révèle de la première.',
  },
  {
    isDemo: true,
    slug: 'la-classe-atelier',
    title: 'La classe comme atelier de lecture',
    venue: 'Revue fictive de démonstration — Pratiques d’enseignement (à confirmer)',
    year: 2024,
    type: 'Article de revue',
    abstract:
      'Résumé de démonstration — dispositifs de lecture en classe : lecture à voix haute, comparaison de traductions, écriture en marge.',
  },
  {
    isDemo: true,
    slug: 'bibliotheques-intimes',
    title: 'Bibliothèques intimes',
    venue: 'Chapitre d’ouvrage fictif — Lieux de lecture (collectif, à confirmer)',
    year: 2023,
    type: 'Chapitre d’ouvrage',
    abstract:
      'Résumé de démonstration — les bibliothèques personnelles comme autobiographies involontaires.',
  },
];

export const courses = [
  {
    isDemo: true,
    slug: 'atelier-ecriture-de-soi',
    title: 'Atelier d’écriture : le carnet et la voix',
    short: 'Un cycle d’ateliers pour apprendre à tenir un carnet, trouver sa voix et passer du fragment au texte.',
    duration: '6 séances de 2 h',
    format: 'En ligne, en direct',
    level: 'Tous niveaux',
    status: 'Ouvert aux inscriptions',
    price: 240,
    nextSession: 'Octobre 2026',
    objectives: [
      'Installer une pratique régulière d’écriture',
      'Explorer les formes du carnet (liste, fragment, scène)',
      'Passer du carnet au texte destiné à être lu',
      'Apprendre à relire et à retravailler ses propres pages',
    ],
    program: [
      { module: 'Séance 1', title: 'Le carnet comme matière', detail: 'Pourquoi écrire avant de savoir ; premiers exercices de fragmentation.' },
      { module: 'Séance 2', title: 'La voix', detail: 'Ton, rythme, adresse : qui parle quand j’écris ?' },
      { module: 'Séance 3', title: 'La scène', detail: 'Du fragment à la scène : temps, espace, personnages.' },
      { module: 'Séance 4', title: 'La relecture', detail: 'Relire sans juger ; couper, déplacer, approfondir.' },
      { module: 'Séance 5', title: 'Le texte pour autrui', detail: 'Préparer un texte à la lecture ; choix et renoncements.' },
      { module: 'Séance 6', title: 'Lecture finale', detail: 'Lecture croisée des textes produits ; perspectives de suite.' },
    ],
    audience: 'Toute personne souhaitant débuter ou reprendre une pratique d’écriture. Aucun prérequis.',
  },
  {
    isDemo: true,
    slug: 'lire-les-classiques',
    title: 'Lire les classiques autrement',
    short: 'Un parcours de lecture pour revenir aux grands textes sans la distance scolaire — et les lire comme des contemporains.',
    duration: '8 semaines',
    format: 'Hybride (en ligne + une rencontre)',
    level: 'Intermédiaire',
    status: 'Prochaine session',
    price: 320,
    nextSession: 'Janvier 2027',
    objectives: [
      'Aborder un classique sans appréhension ni révérence',
      'Lire lentement : méthodes de lecture attentive',
      'Situer un texte dans son époque sans l’y enfermer',
      'Formuler et défendre une interprétation personnelle',
    ],
    program: [
      { module: 'Semaines 1–2', title: 'Recommencer les commencements', detail: 'Incipit célèbres : ce qu’une première phrase engage.' },
      { module: 'Semaines 3–4', title: 'La voix du récit', detail: 'Narrateurs fiables ou non ; le point de vue comme choix moral.' },
      { module: 'Semaines 5–6', title: 'Le monde du texte', detail: 'Décor, temps, objets : comment un roman construit un monde.' },
      { module: 'Semaines 7–8', title: 'Fins et retrouvailles', detail: 'Chutes, ouvertures, relectures ; présentation des lectures.' },
    ],
    audience: 'Lectrices et lecteurs curieux, étudiant·es, enseignant·es en reconversion littéraire.',
  },
  {
    isDemo: true,
    slug: 'seminaire-memoire-recit',
    title: 'Séminaire : mémoire et récit',
    short: 'Un séminaire de recherche ouvert sur les formes narratives de la mémoire — lecture, discussion, écriture.',
    duration: '4 rencontres mensuelles',
    format: 'Présentiel (Genève — lieu à confirmer)',
    level: 'Avancé',
    status: 'Sur dossier',
    price: 180,
    nextSession: 'Printemps 2027',
    objectives: [
      'Constituer un corpus personnel sur mémoire et récit',
      'Comparer des approches (littérature, histoire, anthropologie)',
      'Présenter une analyse et la soumettre à la discussion',
      'Ébaucher un texte académique ou littéraire sur le thème',
    ],
    program: [
      { module: 'Rencontre 1', title: 'Témoin et archive', detail: 'Ce que la mémoire garde, ce que l’archive impose.' },
      { module: 'Rencontre 2', title: 'Les formes du souvenir', detail: 'Récit, fragment, liste, photographie.' },
      { module: 'Rencontre 3', title: 'Les silences', detail: 'L’indicible et ses stratégies narratives.' },
      { module: 'Rencontre 4', title: 'Restitutions', detail: 'Présentation des travaux ; discussion collective.' },
    ],
    audience: 'Doctorant·es, chercheur·ses, écrivain·es engagé·es dans un projet sur la mémoire.',
  },
];
