/**
 * Site-wide configuration. Values can be overridden at build/deploy time
 * with environment variables (SITE_URL, DEMO_MODE).
 */
const envDemo = String(process.env.DEMO_MODE || 'true').toLowerCase() !== 'false';

export const site = {
  name: 'Sophia Dachraoui',
  tagline: 'Écriture · Littérature · Recherche · Transmission',
  description:
    'Site personnel de Sophia Dachraoui — écriture, littérature, recherche et transmission. Essais, publications, cours et ouvrages collectifs.',
  lang: 'fr-CH',
  locale: 'fr-CH',
  url: process.env.SITE_URL || 'https://www.sophia-dachraoui.example.test',
  email: 'contact@sophia-dachraoui.example.test',
  emailConfirmed: false,
  socials: [],
  builtYear: 2026,
  demoMode: envDemo,
  demoBanner:
    'Site de démonstration — contenus fictifs, paiement et comptes simulés. Aucune donnée réelle.',
};
