/**
 * DEMO DATA — Ouvrages collectifs (appels à contributions)
 *              + données de démonstration pour l'Atelier (admin)
 * ------------------------------------------------------------------
 * Everything here is fictional (`isDemo: true`). Deadlines are set in
 * the future relative to the demo year (2026). Admin records are
 * explicitly marked as fake demo data.
 */

export const calls = [
  {
    isDemo: true,
    slug: 'lieux-de-lecture',
    title: 'Lieux de lecture',
    theme: 'Où lit-on aujourd’hui — et que font ces lieux à la lecture ?',
    status: 'Appel ouvert',
    deadline: '2027-03-15',
    volume: 'Ouvrage collectif — direction à confirmer (démonstration)',
    description:
      'Appel fictif de démonstration. L’ouvrage collectif « Lieux de lecture » souhaite rassembler des contributions — articles, essais, témoignages — sur les lieux où la lecture se pratique : bibliothèques, trains, cafés, chambres, écrans. Que révèlent ces lieux de nos manières de lire ?',
    axes: [
      'Géographies intimes : la chambre, le lit, le fauteuil',
      'Lire en public : transports, cafés, parcs, salles d’attente',
      'Bibliothèques et librairies : architectures de la lecture',
      'Lieux numériques : lire sur écran, lire en réseau',
    ],
    requirements: [
      'Proposition de 500 mots maximum, en français',
      'Contribution finale envisagée : 15 000 à 25 000 signes',
      'Préciser l’approche (recherche, essai, témoignage)',
      'Date limite des propositions : 15 mars 2027 (fictive)',
    ],
  },
  {
    isDemo: true,
    slug: 'traduire-la-memoire',
    title: 'Traduire la mémoire',
    theme: 'Mémoire, récit et passage entre les langues.',
    status: 'Appel ouvert',
    deadline: '2027-06-30',
    volume: 'Ouvrage collectif — direction à confirmer (démonstration)',
    description:
      'Appel fictif de démonstration. Ce deuxième volume collectif interroge le lien entre mémoire et traduction : que devient un souvenir lorsqu’il change de langue ? Comment se transmettent les récits familiaux dans les familles plurilingues ?',
    axes: [
      'Récits familiaux plurilingues',
      'Traduire un témoignage : éthique et fidélité',
      'Mots intraduisibles de la mémoire',
      'Exil, retour, transmission',
    ],
    requirements: [
      'Proposition de 500 mots maximum, en français',
      'Contribution finale envisagée : 15 000 à 25 000 signes',
      'Joindre une brève présentation du corpus ou du terrain',
      'Date limite des propositions : 30 juin 2027 (fictive)',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Admin demo data — clearly fake business data.                       */
/* The admin UI must always label these as « Données fictives ».       */
/* ------------------------------------------------------------------ */

export const adminStats = {
  isDemo: true,
  articlesTotal: 6,
  articlesPublished: 5,
  articlesDraft: 1,
  premiumArticles: 2,
  books: 2,
  courses: 3,
  openCalls: 2,
  proposalsPending: 3,
  newsletterSubscribers: 128,
  members: 34,
  ordersMonth: 12,
  revenueMonthCHF: 486.5,
};

export const proposals = [
  {
    isDemo: true,
    id: 'PROP-2026-0041',
    call: 'Lieux de lecture',
    author: 'A. Exemple',
    email: 'a.exemple@example.test',
    title: 'Lire dans le train : la lecture en transit',
    status: 'À examiner',
    received: '2026-09-28',
    abstract: 'Proposition fictive — la lecture dans les transports comme pratique de l’entre-deux.',
  },
  {
    isDemo: true,
    id: 'PROP-2026-0040',
    call: 'Lieux de lecture',
    author: 'B. Démo',
    email: 'b.demo@example.test',
    title: 'La bibliothèque de quartier comme salon',
    status: 'À examiner',
    received: '2026-09-21',
    abstract: 'Proposition fictive — sociabilités ordinaires autour des collections de proximité.',
  },
  {
    isDemo: true,
    id: 'PROP-2026-0039',
    call: 'Traduire la mémoire',
    author: 'C. Spécimen',
    email: 'c.specimen@example.test',
    title: 'Le mot « maison » dans trois langues',
    status: 'Acceptée',
    received: '2026-09-12',
    abstract: 'Proposition fictive — enquête sur un mot de la mémoire familiale et ses passages.',
  },
];

export const orders = [
  { isDemo: true, id: 'CMD-2026-0112', date: '2026-09-30', item: 'Article premium — Écrire entre les langues', amount: 4.5, status: 'Payée (simulation)' },
  { isDemo: true, id: 'CMD-2026-0111', date: '2026-09-29', item: 'Cours — Atelier d’écriture', amount: 240, status: 'Payée (simulation)' },
  { isDemo: true, id: 'CMD-2026-0110', date: '2026-09-27', item: 'Article premium — La marge et le texte', amount: 4.5, status: 'Payée (simulation)' },
  { isDemo: true, id: 'CMD-2026-0109', date: '2026-09-25', item: 'Cours — Lire les classiques autrement', amount: 320, status: 'Remboursée (simulation)' },
];

export const subscribers = [
  { isDemo: true, email: 'lecture@example.test', date: '2026-09-30', status: 'Confirmée (démo)' },
  { isDemo: true, email: 'atelier@example.test', date: '2026-09-28', status: 'Confirmée (démo)' },
  { isDemo: true, email: 'seminaire@example.test', date: '2026-09-24', status: 'Confirmée (démo)' },
];

export const users = [
  { isDemo: true, name: 'Propriétaire (démo)', email: 'demo-owner@example.test', role: 'owner', since: '2026-01-01' },
  { isDemo: true, name: 'Membre (démo)', email: 'demo-member@example.test', role: 'member', since: '2026-03-14' },
  { isDemo: true, name: 'L. Fictif', email: 'l.fictif@example.test', role: 'member', since: '2026-06-02' },
];

export const reviews = [
  { isDemo: true, author: 'Lectrice (démo)', item: 'Lire à l’ère des écrans', rating: 5, text: 'Avis fictif — un essai qui donne envie de relire lentement.', status: 'Approuvé (démo)' },
  { isDemo: true, author: 'Lecteur (démo)', item: 'Atelier d’écriture : le carnet et la voix', rating: 4, text: 'Avis fictif — un atelier exigeant et généreux.', status: 'En attente (démo)' },
];

export const activity = [
  { isDemo: true, when: '30.09.2026', what: 'Commande simulée CMD-2026-0112 — article premium' },
  { isDemo: true, when: '28.09.2026', what: 'Nouvelle proposition reçue — « Lieux de lecture »' },
  { isDemo: true, when: '27.09.2026', what: 'Article publié — « Lire à l’ère des écrans » (démo)' },
  { isDemo: true, when: '24.09.2026', what: 'Inscription newsletter (démo) — seminaire@example.test' },
];
