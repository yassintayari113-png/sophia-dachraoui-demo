/* ============================================================
   premium.js — premium article unlock flow (DEMO)
   - The full body is NOT in the page HTML: it ships in a separate
     file (premium-content.js) that is only fetched after the demo
     "purchase" flag is found in localStorage.
   - DEMO honesty: in production, the gated text must be served by
     the backend after a server-side entitlement check, never by
     trusting localStorage (which anyone can edit).
   ============================================================ */
(function () {
  'use strict';

  var paywall = document.querySelector('[data-paywall]');
  var bodyEl = document.querySelector('[data-premium-body]');
  if (!paywall || !bodyEl) return;

    var slug = paywall.getAttribute('data-article-slug');
  var purchases = [];
  try { purchases = JSON.parse(localStorage.getItem('sophia_demo_purchases') || '[]'); } catch (e) { /* ignore */ }
  
  var session = null;
  if (window.AuthSession) {
    session = window.AuthSession.read();
  } else {
    try { session = JSON.parse(localStorage.getItem('sophia_demo_session') || 'null'); } catch (e) { /* ignore */ }
  }

  var isOwner = session && session.role === 'owner';
  var owned = isOwner || purchases.some(function (p) { return p.slug === slug; });
  if (!owned) return; // paywall stays


  var script = document.createElement('script');
  script.src = '../../assets/premium-content.js';
  script.onload = function () {
    var blocks = (window.__PREMIUM_CONTENT__ || {})[slug] || [];
    bodyEl.innerHTML = '';
    var note = document.createElement('p');
    note.className = 'demo-note';
    note.textContent = '◈ Contenu débloqué (démonstration). En production, ce texte serait vérifié et servi côté serveur.';
    bodyEl.appendChild(note);
    blocks.forEach(function (b) {
      var el;
      if (b.t === 'h2') { el = document.createElement('h2'); el.textContent = b.x; }
      else if (b.t === 'quote') {
        el = document.createElement('blockquote');
        el.className = 'pull-quote';
        var p = document.createElement('p');
        p.textContent = '« ' + b.x + ' »';
        el.appendChild(p);
        if (b.cite) { var c = document.createElement('cite'); c.textContent = b.cite; el.appendChild(c); }
      } else { el = document.createElement('p'); el.textContent = b.x; }
      bodyEl.appendChild(el);
    });
    bodyEl.hidden = false;
    paywall.hidden = true;
  };
  document.body.appendChild(script);
})();
