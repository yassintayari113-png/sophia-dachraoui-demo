/* ============================================================
   app.js — public site interactions (progressive enhancement)
   - mobile menu, scroll reveal, article filters
   - newsletter / contact / proposal forms (demo)
   - instant search (fetches a build-time JSON index)
   All user input is rendered with textContent (no HTML injection).
   ============================================================ */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // On Render, mirror an existing HttpOnly session into the small UI session cache.
  // On GitHub Pages this request simply 404s and the browser-only demo keeps working.
  if (window.SophiaAPI) {
    window.SophiaAPI.get('/api/auth/me').then(function (data) {
      if (data && data.session) localStorage.setItem('sophia_demo_session', JSON.stringify(data.session));
    }).catch(function () {});
  }

  var ASSETS = new URL('.', document.currentScript.src);

  /* ---------- Toast ---------- */
  window.SophiaToast = function (message) {
    var toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.classList.remove('show'); }, 3600);
  };

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Form helpers ---------- */
  function setStatus(form, message, ok) {
    var el = form.querySelector('[data-form-status]');
    if (!el) return;
    el.textContent = message;
    el.classList.toggle('ok', !!ok);
    el.classList.toggle('err', ok === false);
  }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

    /* ---------- Newsletter (inline + page) ---------- */
  function bindNewsletter(form, withConsent) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var email = form.email.value.trim();
      if (!validEmail(email)) { setStatus(form, 'Veuillez saisir une adresse e-mail valide.', false); return; }
      if (withConsent && !form.consent.checked) { setStatus(form, 'Merci de confirmer votre consentement.', false); return; }
      var submit = form.querySelector('button[type="submit"]'); if (submit) submit.disabled = true;
      try {
        var already = false;
        var usedLocal = false;
        if (window.SophiaAPI) {
          try {
            var response = await window.SophiaAPI.post('/api/newsletter', { email: email, consent: !!withConsent });
            already = !!response.alreadySubscribed;
          } catch (apiErr) {
            if (apiErr.status === 404 || apiErr.status === 0) usedLocal = true; else throw apiErr;
          }
        } else usedLocal = true;
        if (usedLocal) {
          var list = []; try { list = JSON.parse(localStorage.getItem('sophia_demo_newsletter') || '[]'); } catch (err) { list = []; }
          already = list.indexOf(email) !== -1;
          if (!already) { list.push(email); localStorage.setItem('sophia_demo_newsletter', JSON.stringify(list)); }
        }
        setStatus(form, already ? 'Cette adresse e-mail est déjà inscrite (démonstration).' : 'Inscription enregistrée (démonstration) — aucun e-mail réel n’a été envoyé.', true);
        form.reset(); window.SophiaToast(already ? 'E-mail déjà enregistré à la newsletter.' : 'Inscription simulée enregistrée.');
      } catch (err) { setStatus(form, err.message || 'Impossible d’enregistrer l’inscription.', false); }
      finally { if (submit) submit.disabled = false; }
    });
  }

  document.querySelectorAll('[data-newsletter-form]').forEach(function (f) { bindNewsletter(f, false); });
  document.querySelectorAll('[data-newsletter-full]').forEach(function (f) { bindNewsletter(f, true); });

  /* ---------- Contact ---------- */
  var contact = document.querySelector('[data-contact-form]');
  if (contact) {
    contact.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!contact.nom.value.trim()) { setStatus(contact, 'Veuillez indiquer votre nom.', false); return; }
      if (!validEmail(contact.email.value.trim())) { setStatus(contact, 'Veuillez saisir une adresse e-mail valide.', false); return; }
      if (!contact.objet.value) { setStatus(contact, 'Veuillez choisir un objet.', false); return; }
      if (contact.message.value.trim().length < 20) { setStatus(contact, 'Votre message doit contenir au moins 20 caractères.', false); return; }
      try {
        if (window.SophiaAPI) {
          try { await window.SophiaAPI.post('/api/contact', { name: contact.nom.value.trim(), email: contact.email.value.trim(), subject: contact.objet.value, message: contact.message.value.trim() }); }
          catch (apiErr) { if (!(apiErr.status === 404 || apiErr.status === 0)) throw apiErr; }
        }
        setStatus(contact, 'Message enregistré (démonstration) — aucun envoi réel n’a été effectué.', true);
        contact.reset(); window.SophiaToast('Message simulé — merci.');
      } catch (err) { setStatus(contact, err.message || 'Impossible d’enregistrer le message.', false); }
    });
  }

  /* ---------- Proposal form (ouvrages collectifs) ---------- */
  var proposal = document.querySelector('[data-proposal-form]');
  if (proposal) {
    // Pre-select the call from ?appel=slug (validated against real options)
    var wanted = new URLSearchParams(location.search).get('appel');
    if (wanted) {
      var opt = proposal.appel.querySelector('option[value="' + CSS.escape(wanted) + '"]');
      if (opt) proposal.appel.value = wanted;
    }
    // File input: display name only, never upload
    proposal.piece.addEventListener('change', function () {
      var el = proposal.querySelector('[data-file-status]');
      var f = proposal.piece.files[0];
      el.textContent = f ? 'Fichier sélectionné (non téléversé) : ' + f.name : '';
    });
    proposal.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!proposal.appel.value) { setStatus(proposal, 'Veuillez choisir un appel.', false); return; }
      if (!proposal.nom.value.trim()) { setStatus(proposal, 'Veuillez indiquer votre nom.', false); return; }
      if (!validEmail(proposal.email.value.trim())) { setStatus(proposal, 'Veuillez saisir une adresse e-mail valide.', false); return; }
      if (!proposal.titre.value.trim()) { setStatus(proposal, 'Veuillez donner un titre à votre proposition.', false); return; }
      if (proposal.resume.value.trim().length < 50) { setStatus(proposal, 'Le résumé doit contenir au moins 50 caractères.', false); return; }
      if (!proposal.consent.checked) { setStatus(proposal, 'Merci de confirmer votre consentement.', false); return; }
      var submit = proposal.querySelector('button[type=submit]'); if (submit) submit.disabled = true;
      try {
        var response;
        if (window.SophiaAPI) {
          try { response = await window.SophiaAPI.post('/api/proposals', { appel: proposal.appel.value, name: proposal.nom.value.trim(), email: proposal.email.value.trim(), title: proposal.titre.value.trim(), summary: proposal.resume.value.trim(), message: proposal.message.value.trim(), fileName: proposal.piece.files[0] ? proposal.piece.files[0].name : '' }); }
          catch (apiErr) { if (!(apiErr.status === 404 || apiErr.status === 0)) throw apiErr; }
        }
        if (!response) { var ref = 'PROP-2026-' + String(Math.floor(1000 + Math.random() * 9000)); var store=[]; try{store=JSON.parse(localStorage.getItem('sophia_demo_proposals')||'[]');}catch(err){store=[];} store.push({ref:ref,appel:proposal.appel.value,titre:proposal.titre.value.trim()}); localStorage.setItem('sophia_demo_proposals',JSON.stringify(store)); response={ref:ref}; }
        var shell = document.querySelector('[data-proposal-shell]'), success = document.querySelector('[data-proposal-success]'), refEl = document.querySelector('[data-proposal-ref]');
        if (refEl) refEl.textContent = response.ref || 'PROP-2026-XXXX';
        proposal.hidden = true; success.hidden = false; success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch(err) { setStatus(proposal, err.message || 'Impossible d’enregistrer la proposition.', false); if (submit) submit.disabled = false; }
    });
  }

  /* ---------- Save article ---------- */
  var saveButton = document.querySelector('[data-save-article]');
  if (saveButton) {
    (async function () {
      var status = document.querySelector('[data-save-status]');
      function setSave(message, ok) { if (status) { status.textContent = message; status.classList.toggle('ok', !!ok); status.classList.toggle('err', ok === false); } }
      function localList() { try { var x = JSON.parse(localStorage.getItem('sophia_demo_saved_articles') || '[]'); return Array.isArray(x) ? x : []; } catch (e) { return []; } }
      function isSaved(slug) { return localList().some(function (x) { return x.slug === slug; }); }
      var slug = saveButton.getAttribute('data-save-slug');
      if (isSaved(slug)) { saveButton.textContent = 'Article enregistré'; saveButton.disabled = true; return; }
      saveButton.addEventListener('click', async function () {
        var session = window.AuthSession && window.AuthSession.read ? window.AuthSession.read() : null;
        if (!session) { try { session = JSON.parse(localStorage.getItem('sophia_demo_session') || 'null'); } catch (e) { session = null; } }
        if (!session) { location.href = '../../connexion/?redirect=' + encodeURIComponent(location.pathname + location.search); return; }
        saveButton.disabled = true;
        try {
          if (window.SophiaAPI) {
            try { await window.SophiaAPI.post('/api/member/saved', { slug: slug, title: saveButton.getAttribute('data-save-title'), category: saveButton.getAttribute('data-save-category'), url: saveButton.getAttribute('data-save-url') }); }
            catch (apiErr) { if (apiErr.status !== 404 && apiErr.status !== 0) throw apiErr; var local = localList(); if (!isSaved(slug)) { local.push({ slug: slug, title: saveButton.getAttribute('data-save-title'), category: saveButton.getAttribute('data-save-category'), url: saveButton.getAttribute('data-save-url') }); localStorage.setItem('sophia_demo_saved_articles', JSON.stringify(local)); } }
          } else { var local = localList(); if (!isSaved(slug)) { local.push({ slug: slug, title: saveButton.getAttribute('data-save-title'), category: saveButton.getAttribute('data-save-category'), url: saveButton.getAttribute('data-save-url') }); localStorage.setItem('sophia_demo_saved_articles', JSON.stringify(local)); } }
          saveButton.textContent = 'Article enregistré'; setSave('Article enregistré dans votre espace membre.', true);
        } catch (err) { saveButton.disabled = false; setSave(err.message || 'Impossible d’enregistrer cet article.', false); }
      });
    }());
  }

  /* ---------- Article category filters ---------- */
  var filterBar = document.querySelector('[data-article-filters]');
  if (filterBar) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-article-grid] [data-category]'));
    var countEl = document.querySelector('[data-article-count]');
    var emptyEl = document.querySelector('[data-article-empty]');
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filterBar.querySelectorAll('[data-filter]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      var cat = btn.getAttribute('data-filter');
      var shown = 0;
      cards.forEach(function (c) {
        var show = cat === 'all' || c.getAttribute('data-category') === cat;
        c.hidden = !show;
        if (show) shown++;
      });
      countEl.textContent = shown + (shown > 1 ? ' articles' : ' article');
      emptyEl.hidden = shown > 0;
    });
  }

  /* ---------- Search ---------- */
  var searchInput = document.querySelector('[data-search-input]');
  if (searchInput) {
    var resultsEl = document.querySelector('[data-search-results]');
    var countEl = document.querySelector('[data-search-count]');
    var emptyEl = document.querySelector('[data-search-empty]');
    var typeBar = document.querySelector('[data-search-filters]');
    var clearBtn = document.querySelector('[data-search-clear]');
    var index = [];
    var activeType = 'all';

    function relUrl(u) {
      // index URLs are site-root absolute (/articles/x/) — make them relative
      // to the search page, which always lives one level below the root.
      return '../' + u.replace(/^\//, '');
    }

    fetch(new URL('search-index.json', ASSETS))
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; run(); })
      .catch(function () { countEl.textContent = 'L’index de recherche n’a pas pu être chargé.'; });

    function highlight(container, text, query) {
      container.textContent = '';
      if (!query) { container.textContent = text; return; }
      var lower = text.toLowerCase();
      var q = query.toLowerCase();
      var i = lower.indexOf(q);
      if (i === -1) { container.textContent = text; return; }
      container.appendChild(document.createTextNode(text.slice(0, i)));
      var mark = document.createElement('mark');
      mark.textContent = text.slice(i, i + q.length);
      container.appendChild(mark);
      container.appendChild(document.createTextNode(text.slice(i + q.length)));
    }

    function fold(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

    function run() {
      var q = searchInput.value.trim();
      if (q.length < 2) {
        resultsEl.textContent = '';
        emptyEl.hidden = true;
        countEl.textContent = q.length === 0 ? 'Saisissez un terme pour lancer la recherche.' : 'Saisissez au moins 2 caractères.';
        return;
      }
      var terms = fold(q).split(/\s+/);
      var found = index.filter(function (item) {
        if (activeType !== 'all' && item.type !== activeType) return false;
        var hay = fold(item.title + ' ' + item.text + ' ' + item.meta);
        return terms.every(function (t) { return hay.indexOf(t) !== -1; });
      });
      resultsEl.textContent = '';
      found.forEach(function (item) {
        var art = document.createElement('article');
        art.className = 'search-result';
        var meta = document.createElement('p');
        meta.className = 'article-meta';
        meta.textContent = item.type.charAt(0).toUpperCase() + item.type.slice(1) + ' · ' + item.meta;
        var h = document.createElement('h3');
        var a = document.createElement('a');
        a.href = relUrl(item.url);
        highlight(a, item.title, q);
        h.appendChild(a);
        var p = document.createElement('p');
        p.style.color = 'var(--ink-soft)';
        highlight(p, item.text.length > 200 ? item.text.slice(0, 200) + '…' : item.text, q);
        art.appendChild(meta); art.appendChild(h); art.appendChild(p);
        resultsEl.appendChild(art);
      });
      emptyEl.hidden = found.length > 0;
      countEl.textContent = found.length === 0
        ? 'Aucun résultat pour « ' + q + ' »'
        : found.length + (found.length > 1 ? ' résultats' : ' résultat') + ' pour « ' + q + ' »';
    }

    searchInput.addEventListener('input', run);
    if (typeBar) {
      typeBar.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-type]');
        if (!btn) return;
        activeType = btn.getAttribute('data-type');
        typeBar.querySelectorAll('[data-type]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        run();
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        activeType = 'all';
        if (typeBar) typeBar.querySelectorAll('[data-type]').forEach(function (b, i) { b.setAttribute('aria-pressed', String(i === 0)); });
        run();
        searchInput.focus();
      });
    }
    var initialQ = new URLSearchParams(location.search).get('q');
    if (initialQ) searchInput.value = initialQ.slice(0, 120);
  }
})();
