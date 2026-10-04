/**
 * Reusable editorial components (server-side render functions).
 */
import { esc, rel, frDate, chf } from './helpers.js';

export function eyebrow(text) {
  return `<p class="eyebrow">${esc(text)}</p>`;
}

/** Numbered editorial section heading, e.g. « 01 — À propos ». */
export function sectionHeading({ num, title, text, link, linkLabel, depth = 0, id = '' }) {
  return `
<div class="section-heading reveal">
  <div class="section-heading-left">
    <span class="section-num" aria-hidden="true">${esc(num)}</span>
    <h2 class="section-title"${id ? ` id="${esc(id)}"` : ""}>${esc(title)}</h2>
  </div>
  ${text ? `<p class="section-text">${esc(text)}</p>` : ''}
  ${link ? `<a class="link-more" href="${rel(depth, link)}">${esc(linkLabel || 'Tout voir')}<span aria-hidden="true"> →</span></a>` : ''}
</div>`;
}

export function badge(text, variant = '') {
  return `<span class="badge${variant ? ' badge-' + esc(variant) : ''}">${esc(text)}</span>`;
}

export function demoNote(text) {
  return `<p class="demo-note" role="note"><span aria-hidden="true">◈</span> ${esc(text)}</p>`;
}

export function articleCard(a, depth = 0) {
  return `
<article class="article-card reveal">
  <p class="article-meta">${esc(a.category)} · <time datetime="${esc(a.date)}">${frDate(a.date)}</time> · ${a.readingTime} min de lecture${a.premium ? ` · ${badge('Premium', 'premium')}` : ''}</p>
  <h3 class="article-card-title"><a href="${rel(depth, `/articles/${a.slug}/`)}">${esc(a.title)}</a></h3>
  <p class="article-card-sub">${esc(a.subtitle)}</p>
  <a class="link-more" href="${rel(depth, `/articles/${a.slug}/`)}" aria-label="Lire : ${esc(a.title)}">Lire l’article<span aria-hidden="true"> →</span></a>
</article>`;
}

export function bookCard(b, depth = 0) {
  return `
<article class="book-card reveal">
  <a class="book-cover-link" href="${rel(depth, `/livres/${b.slug}/`)}" tabindex="-1" aria-hidden="true">
    <img class="book-cover" src="${rel(depth, b.cover)}" alt="" width="220" height="330" loading="lazy">
  </a>
  <div class="book-card-body">
    <p class="article-meta">${esc(b.kind)} · ${b.year} · ${esc(b.status)}</p>
    <h3 class="article-card-title"><a href="${rel(depth, `/livres/${b.slug}/`)}">${esc(b.title)}</a></h3>
    <p class="article-card-sub">${esc(b.subtitle)}</p>
    <p class="book-card-summary">${esc(b.summary)}</p>
    <a class="link-more" href="${rel(depth, `/livres/${b.slug}/`)}" aria-label="Découvrir l’ouvrage : ${esc(b.title)}">Découvrir l’ouvrage<span aria-hidden="true"> →</span></a>
  </div>
</article>`;
}

export function courseCard(c, depth = 0) {
  return `
<article class="course-card reveal">
  <div class="course-card-top">
    ${badge(c.status, c.status.includes('Ouvert') ? 'open' : 'neutral')}
    <p class="article-meta">${esc(c.format)} · ${esc(c.level)}</p>
  </div>
  <h3 class="article-card-title"><a href="${rel(depth, `/cours/${c.slug}/`)}">${esc(c.title)}</a></h3>
  <p class="article-card-sub">${esc(c.short)}</p>
  <dl class="course-facts">
    <div><dt>Durée</dt><dd>${esc(c.duration)}</dd></div>
    <div><dt>Prochaine session</dt><dd>${esc(c.nextSession)}</dd></div>
    <div><dt>Tarif (démo)</dt><dd>${chf(c.price)}</dd></div>
  </dl>
  <a class="link-more" href="${rel(depth, `/cours/${c.slug}/`)}" aria-label="Voir le cours : ${esc(c.title)}">Voir le cours<span aria-hidden="true"> →</span></a>
</article>`;
}

export function newsletterInline(depth = 0) {
  return `
<form class="newsletter-form" data-newsletter-form novalidate>
  <label class="sr-only" for="nl-inline-email">Adresse e-mail</label>
  <input id="nl-inline-email" name="email" type="email" autocomplete="email" required placeholder="Votre adresse e-mail">
  <button class="btn btn-primary" type="submit">S’inscrire</button>
  <p class="form-hint">Démonstration — aucun e-mail réel n’est envoyé.</p>
  <p class="form-status" data-form-status role="status" aria-live="polite"></p>
</form>`;
}

/** Render article body blocks (trusted demo content from the data layer). */
export function bodyBlocks(blocks) {
  return blocks
    .map((b) => {
      if (b.t === 'h2') return `<h2>${esc(b.x)}</h2>`;
      if (b.t === 'quote')
        return `<blockquote class="pull-quote"><p>«&nbsp;${esc(b.x)}&nbsp;»</p>${b.cite ? `<cite>${esc(b.cite)}</cite>` : ''}</blockquote>`;
      return `<p>${esc(b.x)}</p>`;
    })
    .join('\n');
}

export function emptyState(title, text, actionHtml = '') {
  return `
<div class="empty-state">
  <p class="empty-state-mark" aria-hidden="true">· · ·</p>
  <h2 class="empty-state-title">${esc(title)}</h2>
  <p>${esc(text)}</p>
  ${actionHtml}
</div>`;
}
