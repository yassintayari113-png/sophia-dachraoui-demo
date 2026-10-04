/**
 * DEMO DATA — Articles
 * ------------------------------------------------------------------
 * All articles are fictional editorial content written for the demo
 * (`isDemo: true`). They are original demo texts about literature in
 * general — they do not quote real works at length and do not claim
 * to be real publications.
 *
 * Body format: array of blocks, rendered by the article template:
 *   { t: 'p',   x: 'paragraph' }
 *   { t: 'h2',  x: 'section heading' }
 *   { t: 'quote', x: 'pull quote', cite?: 'source label' }
 * Premium articles: `preview` blocks are public, `body` is gated.
 */

export const articles = [
  {
    isDemo: true,
    slug: 'lire-a-l-ere-des-ecrans',
    title: 'Lire à l’ère des écrans',
    subtitle: 'Ce que l’attention fragmentée fait à la lecture — et ce que la lecture peut encore pour elle.',
    category: 'Essai',
    date: '2026-09-14',
    readingTime: 8,
    premium: false,
    featured: true,
    excerpt:
      'La lecture n’a jamais été un geste simple. Mais quelque chose a changé lorsque l’écran est devenu notre première page : une réflexion sur l’attention, la lenteur et la persistance du texte.',
    quote: { x: 'La lenteur n’est pas le contraire de la vitesse : elle est le contraire de la distraction.', cite: 'Carnet de lecture — texte de démonstration' },
    body: [
      { t: 'p', x: 'Il y a une différence entre voir un texte et le lire. L’écran nous a rendus experts du premier geste : survoler, repérer, extraire. Le second demande autre chose — un consentement à la durée, l’acceptation de ne pas savoir tout de suite où la phrase nous mène.' },
      { t: 'p', x: 'Ce n’est pas une déploration. Les écrans ont aussi élargi l’accès aux textes, multiplié les bibliothèques portables, permis des lectures que le papier ne permettait pas. La question n’est pas de choisir un camp, mais de comprendre ce que chaque support fait à l’attention.' },
      { t: 'h2', x: 'L’attention comme matière première' },
      { t: 'p', x: 'Toute économie de l’information repose sur une ressource rare : l’attention de celles et ceux qui lisent. Or la lecture littéraire est peut-être la pratique qui cultive cette ressource sans l’épuiser. Elle demande de la concentration et la rend, augmentée.' },
      { t: 'p', x: 'Relire est ici un geste décisif. Là où le flux pousse au neuf, la relecture installe un rapport au temps que rien ne peut accélérer : on ne revient jamais deux fois au même texte, parce que ce n’est jamais le même lecteur qui revient.' },
      { t: 'h2', x: 'La page comme lieu' },
      { t: 'p', x: 'Une page imprimée a une géographie : on se souvient qu’un passage se trouvait en bas à gauche, près d’une marge cornée. L’écran tend à dissoudre cette mémoire spatiale. Contre cette dissolution, certaines pratiques simples — annoter, recopier, citer de mémoire — réancrent le texte dans un corps et dans un lieu.' },
      { t: 'p', x: 'Ce texte est un contenu de démonstration. Il sera remplacé par les essais réels de l’auteure ; sa fonction est de montrer le rythme, la typographie et la respiration d’une page de lecture.' },
    ],
  },
  {
    isDemo: true,
    slug: 'la-bibliotheque-comme-paysage',
    title: 'La bibliothèque comme paysage',
    subtitle: 'Ce que nos étagères racontent de nous — et ce qu’elles taisent.',
    category: 'Chronique',
    date: '2026-08-02',
    readingTime: 6,
    premium: false,
    featured: true,
    excerpt:
      'Une bibliothèque n’est pas un meuble : c’est une autobiographie involontaire, un paysage intérieur que chaque livre déplace un peu.',
    quote: { x: 'Nos étagères sont des cartes où l’on devine les voyages que nous n’avons pas encore faits.', cite: 'Texte de démonstration' },
    body: [
      { t: 'p', x: 'On range rarement une bibliothèque par hasard. L’ordre choisi — par auteur, par couleur, par affection — dessine une géographie personnelle où les voisinages comptent autant que les livres eux-mêmes.' },
      { t: 'p', x: 'Il y a les livres lus, ceux que l’on prétend avoir lus, et ceux qui attendent. Les derniers sont peut-être les plus importants : ils figurent le lecteur que l’on espère devenir.' },
      { t: 'h2', x: 'L’anti-bibliothèque' },
      { t: 'p', x: 'Les non-lus ne sont pas un échec. Ils constituent une réserve de possible, une promesse que la lecture faite ne cesse de renégocier. Une bibliothèque trop achevée serait un paysage sans horizon.' },
      { t: 'p', x: 'Texte de démonstration — il illustre le format « chronique », plus bref et plus libre que l’essai.' },
    ],
  },
  {
    isDemo: true,
    slug: 'ecrire-entre-les-langues',
    title: 'Écrire entre les langues',
    subtitle: 'La traduction de soi comme expérience littéraire.',
    category: 'Recherche',
    date: '2026-06-20',
    readingTime: 11,
    premium: true,
    price: 4.5,
    featured: true,
    excerpt:
      'Que devient une phrase lorsque son auteur la fait passer dans une autre langue ? Enquête sur l’autotraduction, l’exil intérieur et l’hospitalité des langues.',
    preview: [
      { t: 'p', x: 'Il existe des écrivains qui habitent deux langues sans appartenir tout à fait à aucune. Pour eux, traduire n’est pas un métier second : c’est la condition même de l’écriture.' },
      { t: 'p', x: 'L’autotraduction — le fait de se traduire soi-même — ressemble de loin à un exercice technique. Elle est en réalité une seconde naissance du texte, avec ce que toute naissance comporte de perte et d’invention.' },
    ],
    body: [
      { t: 'h2', x: 'La langue comme demeure provisoire' },
      { t: 'p', x: 'Traduire son propre texte, c’est découvrir qu’il n’était pas terminé. La seconde langue ne reçoit pas un original : elle reçoit une ébauche que le passage oblige à repenser, phrase par phrase.' },
      { t: 'p', x: 'Certains mots refusent le passage. Ce refus est précieux : il révèle ce qu’une langue tient pour essentiel — ses silences obligés, ses euphémismes, sa manière propre de nommer l’intime.' },
      { t: 'quote', x: 'Se traduire, ce n’est pas se répéter : c’est s’écrire une seconde fois, avec d’autres rêves.', cite: 'Texte de démonstration' },
      { t: 'h2', x: 'L’hospitalité des langues' },
      { t: 'p', x: 'Accueillir un texte dans sa langue, c’est lui prêter une maison dont on sait qu’elle modifiera son hôte. La traduction est ainsi moins un transport qu’une cohabitation : la langue d’arrivée y gagne autant que le texte.' },
      { t: 'p', x: 'La suite de cet essai — corpus commenté, repères théoriques, bibliographie — est un contenu de démonstration réservé aux abonné·es. En production, ce contenu serait servi uniquement après vérification côté serveur.' },
    ],
  },
  {
    isDemo: true,
    slug: 'le-carnet-avant-le-livre',
    title: 'Le carnet avant le livre',
    subtitle: 'Petite apologie des écritures préparatoires.',
    category: 'Atelier',
    date: '2026-04-11',
    readingTime: 5,
    premium: false,
    featured: false,
    excerpt:
      'Brouillons, listes, fragments : les carnets sont la coulisse où l’écriture apprend à marcher avant de paraître.',
    quote: { x: 'Le carnet est le seul lieu où l’écrivain peut se tromper sans témoin — et c’est pour cela qu’il avance.', cite: 'Texte de démonstration' },
    body: [
      { t: 'p', x: 'Avant le livre, il y a le carnet : un espace sans lecteur où la phrase peut être maladroite, où l’idée peut rester une liste de trois mots. Cette gratuité est sa force.' },
      { t: 'h2', x: 'Écrire pour ne pas publier' },
      { t: 'p', x: 'Tout ce qui s’écrit ne demande pas à être lu. Le carnet apprend à l’écrivain une discipline paradoxale : écrire beaucoup pour publier peu, garder la trace sans confondre la trace avec l’œuvre.' },
      { t: 'p', x: 'Texte de démonstration — format « atelier », pensé comme une porte d’entrée vers les cours et les exercices proposés sur le site.' },
    ],
  },
  {
    isDemo: true,
    slug: 'la-marge-et-le-texte',
    title: 'La marge et le texte',
    subtitle: 'Annoter, c’est habiter le livre.',
    category: 'Essai',
    date: '2026-02-27',
    readingTime: 9,
    premium: true,
    price: 4.5,
    featured: false,
    excerpt:
      'Des gloses médiévales aux crayonnés d’étudiants : l’annotation comme forme mineure de l’écriture — et comme manière de lire à deux voix.',
    preview: [
      { t: 'p', x: 'La marge est le seul endroit du livre où le lecteur a le droit de répondre. Crayon à la main, il transforme la lecture en dialogue — et le livre en maison habitée.' },
    ],
    body: [
      { t: 'h2', x: 'Une écriture en contrepartie' },
      { t: 'p', x: 'L’annotation est un genre littéraire mineur au sens le plus noble : écrit dans l’interstice, il n’existe que par rapport au texte qu’il borde, comme le lierre n’existe que contre le mur.' },
      { t: 'p', x: 'Contenu de démonstration réservé — l’essai complet (histoire de la glose, typologie des annotations, exemples commentés) serait délivré côté serveur après contrôle d’accès.' },
    ],
  },
  {
    isDemo: true,
    slug: 'transmettre-sans-apprivoiser',
    title: 'Transmettre sans apprivoiser',
    subtitle: 'Sur l’enseignement de la littérature.',
    category: 'Transmission',
    date: '2026-01-18',
    readingTime: 7,
    premium: false,
    featured: false,
    excerpt:
      'Enseigner un texte, ce n’est pas le domestiquer : c’est préparer la rencontre entre le texte et ceux qui le liront sans nous.',
    quote: { x: 'Le professeur de littérature est un passeur qui doit accepter de disparaître au moment où la lecture commence.', cite: 'Texte de démonstration' },
    body: [
      { t: 'p', x: 'Toute transmission court deux risques symétriques : dire trop, et le texte s’éteint sous le commentaire ; dire trop peu, et la rencontre n’a pas lieu. L’art d’enseigner tient dans cet écart.' },
      { t: 'h2', x: 'La classe comme atelier de lecture' },
      { t: 'p', x: 'Lire à voix haute, comparer des traductions, disputer d’un adjectif : ces gestes simples font de la classe un atelier où le texte se travaille comme une matière — et où l’interprétation apprend l’humilité.' },
      { t: 'p', x: 'Texte de démonstration — ce format « transmission » annonce la section Cours du site.' },
    ],
  },
];

export const articleCategories = ['Essai', 'Chronique', 'Recherche', 'Atelier', 'Transmission'];
