/* SOPHIA interface language switcher — FR / EN / DE-CH. */
(function () {
  'use strict';
  var KEY = 'sophia_ui_lang';
  var fallback = 'fr-CH';
  var dict = {
    'en': {
      'Aller au contenu': 'Skip to content',
      'Site de démonstration — contenus fictifs, paiement et comptes simulés. Aucune donnée réelle.': 'Demo website — fictional content, simulated payments and accounts. No real data.',
      'Écriture & recherche': 'Writing & research',
      'Navigation principale': 'Main navigation', 'Rechercher': 'Search', 'Espace membre': 'Member area', 'Menu': 'Menu',
      'Accueil': 'Home', 'À propos': 'About', 'Recherche': 'Research', 'Livres': 'Books', 'Articles': 'Articles', 'Cours': 'Courses',
      'Ouvrages collectifs': 'Collective books', 'Publications': 'Publications', 'Articles premium': 'Premium articles', 'Parcours': 'Journey', 'Newsletter': 'Newsletter',
      'Un espace personnel dédié à la littérature, à la recherche et à la transmission.': 'A personal space dedicated to literature, research and transmission.',
      'Naviguer': 'Navigate', 'Contenus': 'Content', 'Recevoir les nouveaux textes et les appels en cours.': 'Receive new texts and current calls.',
      'S’inscrire à la newsletter': 'Join the newsletter', 'Démonstration — aucun e-mail réel n’est envoyé.': 'Demo — no real email is sent.',
      'Démonstration': 'Demo', 'Mentions légales': 'Legal notice', 'Confidentialité': 'Privacy', 'Atelier (démo)': 'Studio (demo)',
      'Se connecter': 'Sign in', 'Créer un compte': 'Create an account', 'Connexion requise': 'Sign-in required',
      'Contenus achetés': 'Purchased content', 'Articles enregistrés': 'Saved articles', 'Mes cours': 'My courses', 'Commandes': 'Orders', 'Réglages': 'Settings', 'Se déconnecter': 'Sign out',
      'Profil': 'Profile', 'Contenus débloqués': 'Unlocked content', 'Propriétaire': 'Owner', 'Membre': 'Member',
      'Type': 'Type', 'Accès': 'Access', 'Ouvrir →': 'Open →', 'Aucun contenu débloqué pour le moment': 'No content unlocked yet',
      'Aucune inscription pour le moment': 'No enrolment yet', 'Aucune commande (simulée) pour le moment': 'No simulated orders yet',
      'Enregistrer (démo)': 'Save (demo)', 'Enregistrer': 'Save', 'Effacer mes données de démonstration': 'Clear my demo data',
      'Paiement': 'Payment', 'Payer (simulation)': 'Pay (simulation)', 'Aucun article sélectionné': 'No item selected',
      'Envoyer le message': 'Send message', 'Envoyer ma proposition': 'Send my proposal', 'Proposer une contribution': 'Submit a contribution',
      'Lire l’article': 'Read article', 'Tout voir': 'View all', 'Tous': 'All', 'Rechercher un texte': 'Search the site',
      'Choisir…': 'Choose…', 'Filtrer la liste…': 'Filter list…', 'Modifier': 'Edit', 'Publier/Dépublier': 'Publish/Unpublish', 'Supprimer': 'Delete',
      'Tableau de bord': 'Dashboard', 'Appels à contributions': 'Calls for contributions', 'Propositions': 'Proposals', 'Utilisateurs': 'Users', 'Commandes': 'Orders', 'Avis': 'Reviews' ,
      'Écriture · littérature · recherche · transmission': 'Writing · literature · research · transmission',
'Un espace dédié à la littérature, à la recherche et à la transmission — où l’écriture se pense comme une manière d’habiter le monde et de le partager.': 'A space devoted to literature, research and transmission — where writing is a way of inhabiting the world and sharing it.',
'Découvrir son travail': 'Discover her work',
'Explorer les publications': 'Explore the publications',
'Démonstration — les contenus de ce site sont fictifs et remplaçables.': 'Demonstration — the contents of this site are fictional and replaceable.',
'« Un site est une maison : chaque page une pièce, chaque texte une fenêtre. »': '“A site is a house: each page a room, each text a window.”',
'Note d’intention — démonstration': 'Statement of intent — demonstration',
'Lire la présentation': 'Read the presentation',
'Voir le parcours': 'See the path',
'Écriture': 'Writing',
'Recherche': 'Research',
'Transmission': 'Transmission',
'Édition': 'Publishing',
'Années de formation': 'Years of training',
'Toutes les publications': 'All publications',
'Tous les articles': 'All articles',
'Tous les cours': 'All courses',
'Découvrir l’offre premium': 'Discover the premium offer',
'Appels en cours': 'Open calls',
'S’inscrire': 'Subscribe',
    'Écriture · Littérature · Recherche · Transmission': 'Writing · Literature · Research · Transmission',
'Découvrir son travail': 'Discover her work',
'Explorer les publications': 'Explore the publications',
'◈ Démonstration — les contenus de ce site sont fictifs et remplaçables.': '◈ Demonstration — the contents of this site are fictional and replaceable.',
'Note d’intention — démonstration': 'Statement of intent — demonstration',
'Lire la présentation': 'Read the presentation',
'Voir le parcours': 'See the path',
'Axes de recherche': 'Research areas',
'Découvrir l’ouvrage': 'Discover the book',
'Toutes les publications': 'All publications',
'Tous les articles': 'All articles',
'Tous les cours': 'All courses',
'Découvrir l’offre premium': 'Discover the premium offer',
'Appels en cours': 'Open calls',
'Voir le cours': 'See the course',
'Années de formation': 'Years of training',
'Premières publications': 'First publications',
'Aujourd’hui — 2026': 'Today — 2026',
'Projets en cours': 'Projects in progress',
    },
    'de-CH': {
      'Aller au contenu': 'Zum Inhalt',
      'Site de démonstration — contenus fictifs, paiement et comptes simulés. Aucune donnée réelle.': 'Demo-Website — fiktive Inhalte, simulierte Zahlungen und Konten. Keine echten Daten.',
      'Écriture & recherche': 'Schreiben & Forschung',
      'Navigation principale': 'Hauptnavigation', 'Rechercher': 'Suchen', 'Espace membre': 'Mitgliederbereich', 'Menu': 'Menü',
      'Accueil': 'Startseite', 'À propos': 'Über mich', 'Recherche': 'Forschung', 'Livres': 'Bücher', 'Articles': 'Artikel', 'Cours': 'Kurse',
      'Ouvrages collectifs': 'Sammelbände', 'Publications': 'Publikationen', 'Articles premium': 'Premium-Artikel', 'Parcours': 'Werdegang', 'Newsletter': 'Newsletter',
      'Un espace personnel dédié à la littérature, à la recherche et à la transmission.': 'Ein persönlicher Raum für Literatur, Forschung und Vermittlung.',
      'Naviguer': 'Navigation', 'Contenus': 'Inhalte', 'Recevoir les nouveaux textes et les appels en cours.': 'Neue Texte und aktuelle Ausschreibungen erhalten.',
      'S’inscrire à la newsletter': 'Newsletter abonnieren', 'Démonstration — aucun e-mail réel n’est envoyé.': 'Demo — keine echte E-Mail wird versendet.',
      'Démonstration': 'Demo', 'Mentions légales': 'Impressum', 'Confidentialité': 'Datenschutz', 'Atelier (démo)': 'Atelier (Demo)',
      'Se connecter': 'Anmelden', 'Créer un compte': 'Konto erstellen', 'Connexion requise': 'Anmeldung erforderlich',
      'Contenus achetés': 'Gekaufte Inhalte', 'Articles enregistrés': 'Gespeicherte Artikel', 'Mes cours': 'Meine Kurse', 'Commandes': 'Bestellungen', 'Réglages': 'Einstellungen', 'Se déconnecter': 'Abmelden',
      'Profil': 'Profil', 'Contenus débloqués': 'Freigeschaltete Inhalte', 'Propriétaire': 'Inhaberin', 'Membre': 'Mitglied',
      'Type': 'Typ', 'Accès': 'Zugang', 'Ouvrir →': 'Öffnen →', 'Aucun contenu débloqué pour le moment': 'Noch keine Inhalte freigeschaltet',
      'Aucune inscription pour le moment': 'Noch keine Anmeldung', 'Aucune commande (simulée) pour le moment': 'Noch keine simulierte Bestellung',
      'Enregistrer (démo)': 'Speichern (Demo)', 'Enregistrer': 'Speichern', 'Effacer mes données de démonstration': 'Demo-Daten löschen',
      'Paiement': 'Zahlung', 'Payer (simulation)': 'Bezahlen (Simulation)', 'Aucun article sélectionné': 'Kein Inhalt ausgewählt',
      'Envoyer le message': 'Nachricht senden', 'Envoyer ma proposition': 'Vorschlag senden', 'Proposer une contribution': 'Beitrag einreichen',
      'Lire l’article': 'Artikel lesen', 'Tout voir': 'Alles ansehen', 'Tous': 'Alle', 'Rechercher un texte': 'Text suchen',
      'Choisir…': 'Auswählen…', 'Filtrer la liste…': 'Liste filtern…', 'Modifier': 'Bearbeiten', 'Publier/Dépublier': 'Veröffentlichen/Entfernen', 'Supprimer': 'Löschen',
      'Tableau de bord': 'Dashboard', 'Appels à contributions': 'Ausschreibungen', 'Propositions': 'Vorschläge', 'Utilisateurs': 'Nutzer:innen', 'Commandes': 'Bestellungen', 'Avis': 'Bewertungen' ,
  'Écriture · littérature · recherche · transmission': 'Schreiben · Literatur · Forschung · Vermittlung',
'Un espace dédié à la littérature, à la recherche et à la transmission — où l’écriture se pense comme une manière d’habiter le monde et de le partager.': 'Ein Ort für Literatur, Forschung und Vermittlung — wo Schreiben eine Art ist, die Welt zu bewohnen und zu teilen.',
'Découvrir son travail': 'Ihre Arbeit entdecken',
'Explorer les publications': 'Publikationen ansehen',
'Démonstration — les contenus de ce site sont fictifs et remplaçables.': 'Demonstration — die Inhalte dieser Website sind fiktiv und ersetzbar.',
'« Un site est une maison : chaque page une pièce, chaque texte une fenêtre. »': '«Eine Website ist ein Haus: jede Seite ein Zimmer, jeder Text ein Fenster.»',
'Note d’intention — démonstration': 'Absichtserklärung — Demonstration',
'Lire la présentation': 'Porträt lesen',
'Voir le parcours': 'Werdegang ansehen',
'Écriture': 'Schreiben',
'Recherche': 'Forschung',
'Transmission': 'Vermittlung',
'Édition': 'Edition',
'Années de formation': 'Ausbildungsjahre',
'Toutes les publications': 'Alle Publikationen',
'Tous les articles': 'Alle Artikel',
'Tous les cours': 'Alle Kurse',
'Découvrir l’offre premium': 'Premium-Angebot ansehen',
'Appels en cours': 'Laufende Ausschreibungen',
'S’inscrire': 'Anmelden',
    'Écriture · Littérature · Recherche · Transmission': 'Schreiben · Literatur · Forschung · Vermittlung',
'Découvrir son travail': 'Ihre Arbeit entdecken',
'Explorer les publications': 'Publikationen ansehen',
'◈ Démonstration — les contenus de ce site sont fictifs et remplaçables.': '◈ Demonstration — die Inhalte dieser Website sind fiktiv und ersetzbar.',
'Note d’intention — démonstration': 'Absichtserklärung — Demonstration',
'Lire la présentation': 'Porträt lesen',
'Voir le parcours': 'Werdegang ansehen',
'Axes de recherche': 'Forschungsachsen',
'Découvrir l’ouvrage': 'Das Buch ansehen',
'Toutes les publications': 'Alle Publikationen',
'Tous les articles': 'Alle Artikel',
'Tous les cours': 'Alle Kurse',
'Découvrir l’offre premium': 'Premium-Angebot ansehen',
'Appels en cours': 'Laufende Ausschreibungen',
'Voir le cours': 'Kurs ansehen',
'Années de formation': 'Ausbildungsjahre',
'Premières publications': 'Erste Publikationen',
'Aujourd’hui — 2026': 'Heute — 2026',
'Projets en cours': 'Laufende Projekte',
    }
  };

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      return dict[v] ? v : fallback;
    } catch (e) { return fallback; }
  }

  function walk(root, lang) {
    var map = dict[lang];
    if (!map) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentElement;
        if (!p || p.closest('script,style,textarea,[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var source = node.__frSource || node.nodeValue;
      if (!source || !map[source.trim()]) { node.__frSource = source; return; }
      node.__frSource = source;
      var lead = source.match(/^\s*/)[0];
      var tail = source.match(/\s*$/)[0];
      node.nodeValue = lead + map[source.trim()] + tail;
    });
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-language-switcher] [data-lang-choice]').forEach(function (b) {
      var on = b.getAttribute('data-lang-choice') === lang;
      b.setAttribute('aria-pressed', String(on));
    });
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var source = el.getAttribute('data-i18n');
      el.textContent = (dict[lang] && dict[lang][source]) || source;
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var source = el.getAttribute('data-i18n-aria-label');
      el.setAttribute('aria-label', (dict[lang] && dict[lang][source]) || source);
    });
    walk(document.body, lang);
    try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode */ }
  }

  window.SophiaI18n = { apply: apply, read: read };
  document.addEventListener('DOMContentLoaded', function () {
    var current = read();
    apply(current);
    document.querySelectorAll('[data-language-switcher]').forEach(function (box) {
      box.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-lang-choice]');
        if (!btn) return;
        apply(btn.getAttribute('data-lang-choice'));
      });
    });
  });
})();
