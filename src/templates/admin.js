/** Atelier / CMS — responsive and state-aware demo administration. */
import { site } from '../config/site.js';
import { esc, rel, chf } from './helpers.js';
import { adminStats, proposals, orders, subscribers, users, reviews, activity, calls } from '../data/demo/admin.js';
import { articles } from '../data/demo/articles.js';
import { books, courses, publications } from '../data/demo/content.js';

const ADMIN_NAV = [
  { href:'/atelier/', label:'Tableau de bord', icon:'⌂' }, { href:'/atelier/articles/', label:'Articles', icon:'✎' },
  { href:'/atelier/publications/', label:'Publications', icon:'❦' }, { href:'/atelier/livres/', label:'Livres', icon:'▤' },
  { href:'/atelier/cours/', label:'Cours', icon:'◈' }, { href:'/atelier/premium/', label:'Contenus premium', icon:'✦' },
  { href:'/atelier/appels/', label:'Appels à contributions', icon:'✒' }, { href:'/atelier/propositions/', label:'Propositions', icon:'✉' },
  { href:'/atelier/utilisateurs/', label:'Utilisateurs', icon:'◉' }, { href:'/atelier/newsletter/', label:'Newsletter', icon:'✧' },
  { href:'/atelier/commandes/', label:'Commandes', icon:'⌗' }, { href:'/atelier/avis/', label:'Avis', icon:'☆' },
  { href:'/atelier/reglages/', label:'Réglages', icon:'⚙' },
];

export function renderAdminLayout(page, bodyHtml) {
  const depth = page.depth ?? 1;
  return `<!doctype html>
<html lang="fr-CH">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)} — Atelier · ${esc(site.name)}</title>
<meta name="description" content="Atelier — administration du site (démonstration)."><meta name="robots" content="noindex, nofollow">
<link rel="icon" href="${rel(depth,'icons/favicon.svg')}" type="image/svg+xml"><link rel="stylesheet" href="${rel(depth,'assets/main.css')}"><link rel="stylesheet" href="${rel(depth,'assets/admin.css')}"></head>
<body class="admin">
<a class="skip-link" href="#contenu" data-i18n="Aller au contenu">Aller au contenu</a>
<div class="admin-shell">
  <aside class="admin-side">
    <a class="admin-brand" href="${rel(depth,'/atelier/')}"><span class="brand-name">Atelier</span><span class="brand-sub">${esc(site.name)}</span></a>
    <nav aria-label="Navigation de l’atelier"><ul>${ADMIN_NAV.map((n)=>`<li><a href="${rel(depth,n.href)}"${page.path===n.href?' aria-current="page"':''}><span class="admin-ico" aria-hidden="true">${n.icon}</span><span data-i18n="${esc(n.label)}">${esc(n.label)}</span></a></li>`).join('')}</ul></nav>
    <div class="admin-side-foot"><a href="${rel(depth,'/')}" class="admin-backlink">← <span data-i18n="Retour au site">Retour au site</span></a><p data-i18n="Mode démonstration">Mode démonstration</p></div>
  </aside>
  <div class="admin-main">
    <div class="admin-topbar"><span class="badge badge-draft" data-i18n="Mode démonstration — données fictives">Mode démonstration — données fictives</span><span class="admin-user" data-admin-user>Session démo</span></div>
    <main id="contenu" class="admin-content">${bodyHtml}</main>
  </div>
</div>
<script src="${rel(depth,'assets/i18n.js')}" defer></script><script src="${rel(depth,'assets/api.js')}" defer></script><script src="${rel(depth,'assets/admin.js')}" defer></script>
</body></html>`;
}

function adminHead(title, sub, actions='') { return `<div class="admin-head"><div><h1>${esc(title)}</h1>${sub?`<p>${esc(sub)}</p>`:''}</div>${actions?`<div class="admin-actions">${actions}</div>`:''}</div>`; }
function statBox(num,label) { return `<div class="stat-box"><p class="num">${esc(String(num))}</p><p class="lbl">${esc(label)}</p></div>`; }
function statusBadge(status) { const v = /Publié|Acceptée|Approuvé|Payée|Ouvert|Validé/.test(status)?'pub':(/Brouillon|attente|examiner|En attente/.test(status)?'draft':'neutral'); return `<span class="badge badge-${v}" data-status-badge>${esc(status)}</span>`; }
function cell(value,label='') { return `<td${label?` data-label="${esc(label)}"`:''}>${value}</td>`; }
function rowMarkup(key, collection, cells, labels, actions) {
  const actionHtml = actions.map((a)=>{
    if(a==='edit') return `<button type="button" data-admin-edit data-admin-action="edit">Modifier</button>`;
    if(a==='toggle') return `<button type="button" data-admin-toggle data-admin-action="toggle">Publier/Dépublier</button>`;
    if(a==='status') return `<button type="button" data-admin-status data-admin-action="status">Traiter</button>`;
    if(a==='view') return `<button type="button" data-admin-view data-admin-action="view">Voir</button>`;
    if(a==='export') return `<button type="button" data-admin-export data-admin-action="export">Exporter</button>`;
    return `<button type="button" class="danger" data-admin-delete data-admin-action="delete">Supprimer</button>`;
  }).join('');
  return `<tr data-admin-key="${esc(key)}" data-admin-collection="${esc(collection)}">${cells.map((x,i)=>cell(x,labels[i])).join('')}<td class="admin-row-actions table-action-cell" data-label="Actions">${actionHtml}</td></tr>`;
}

function collectionPage({path,title,sub,columns,rows,keys,createLabel,actions=['edit','toggle','delete'],collection}) {
  return { path, title, depth:2, body(){
    return `${adminHead(title,sub,createLabel?`<button class="btn btn-primary" type="button" data-admin-create="${esc(collection||title)}">${esc(createLabel)}</button>`:'')}
<div class="admin-toolbar"><label class="sr-only" for="admin-filter">Filtrer</label><input id="admin-filter" class="admin-search" type="search" placeholder="Filtrer la liste…" data-admin-filter><span class="search-count admin-count" data-admin-count>${rows.length} éléments</span></div>
<div class="table-wrap" data-admin-table><table class="data"><thead><tr>${columns.map(c=>`<th>${esc(c)}</th>`).join('')}<th>Actions</th></tr></thead><tbody>${rows.map((r,i)=>rowMarkup(keys[i]||String(i+1),collection||title,r,columns,actions)).join('')}</tbody></table></div>
<p class="demo-note" style="margin-top:var(--space-3)">◈ Liste de démonstration. Les actions sont persistées dans la version Render/Neon lorsque la base est connectée ; GitHub Pages utilise un mode local de secours.</p>`;
  }};
}

const premiumCell=(v)=>v?'<span class="badge badge-premium">Premium</span>':'<span class="badge badge-neutral">Libre</span>';

export const adminDashboard={path:'/atelier/',title:'Tableau de bord',depth:1,body(){return `${adminHead('Tableau de bord','Vue d’ensemble — données de démonstration.',`<a class="btn btn-primary" href="./articles/?nouveau=1">Nouvel article</a>`)}
<div class="stat-row">${statBox(adminStats.articlesTotal,'Articles')}${statBox(adminStats.premiumArticles,'Premium')}${statBox(adminStats.books,'Livres')}${statBox(adminStats.courses,'Cours')}${statBox(adminStats.openCalls,'Appels ouverts')}${statBox(adminStats.proposalsPending,'Propositions à examiner')}${statBox(adminStats.newsletterSubscribers,'Abonné·es newsletter')}${statBox(chf(adminStats.revenueMonthCHF),'Revenus du mois (simulés)')}</div>
<div class="admin-cols"><section class="admin-panel" aria-labelledby="act-title"><h2 id="act-title">Activité récente</h2><ul class="admin-activity">${activity.map(a=>`<li><time>${esc(a.when)}</time><span>${esc(a.what)}</span></li>`).join('')}</ul></section><section class="admin-panel" aria-labelledby="ord-title"><h2 id="ord-title">Commandes récentes (simulées)</h2><div class="table-wrap"><table class="data"><thead><tr><th>Référence</th><th>Contenu</th><th>Montant</th><th>Statut</th></tr></thead><tbody>${orders.slice(0,3).map(o=>`<tr>${cell(`<code>${esc(o.id)}</code>`,'Référence')}${cell(esc(o.item),'Contenu')}${cell(chf(o.amount),'Montant')}${cell(statusBadge(o.status),'Statut')}</tr>`).join('')}</tbody></table></div></section></div>
<div class="admin-cols"><section class="admin-panel" aria-labelledby="prop-title"><h2 id="prop-title">Propositions à examiner</h2><div class="table-wrap"><table class="data"><thead><tr><th>Titre</th><th>Appel</th><th>Reçue</th><th>Statut</th></tr></thead><tbody>${proposals.map(p=>`<tr>${cell(esc(p.title),'Titre')}${cell(esc(p.call),'Appel')}${cell(esc(p.received),'Reçue')}${cell(statusBadge(p.status),'Statut')}</tr>`).join('')}</tbody></table></div></section><section class="admin-panel" aria-labelledby="qa-title"><h2 id="qa-title">Actions rapides</h2><div class="admin-quick"><a class="btn btn-outline" href="./articles/?nouveau=1">Créer un article</a><a class="btn btn-outline" href="./livres/?nouveau=1">Créer un livre</a><a class="btn btn-outline" href="./cours/?nouveau=1">Créer un cours</a><a class="btn btn-outline" href="./appels/?nouveau=1">Créer un appel</a></div><p class="demo-note" style="margin-top:var(--space-3)">◈ Statistiques fictives servant à présenter l’interface de gestion.</p></section></div>`;}};

export const adminArticles=collectionPage({path:'/atelier/articles/',title:'Articles',sub:'Créer, publier, classer — contenus fictifs.',createLabel:'Nouvel article',columns:['Titre','Catégorie','Accès','Date','Statut'],keys:articles.map(a=>a.slug),collection:'articles',rows:articles.map(a=>[esc(a.title),esc(a.category),premiumCell(a.premium),esc(a.date),statusBadge(a.slug==='le-carnet-avant-le-livre'?'Brouillon':'Publié')])});
export const adminPublications=collectionPage({path:'/atelier/publications/',title:'Publications',sub:'Références de démonstration.',createLabel:'Nouvelle publication',columns:['Titre','Type','Revue / volume','Année'],keys:publications.map((p,i)=>p.id||String(i+1)),collection:'publications',actions:['edit','delete'],rows:publications.map(p=>[esc(p.title),esc(p.type),esc(p.venue),String(p.year)])});
export const adminBooks=collectionPage({path:'/atelier/livres/',title:'Livres',sub:'Ouvrages de démonstration.',createLabel:'Nouveau livre',columns:['Titre','Type','Année','Statut'],keys:books.map(b=>b.slug),collection:'books',rows:books.map(b=>[esc(b.title),esc(b.kind),String(b.year),statusBadge(b.status)])});
export const adminCourses=collectionPage({path:'/atelier/cours/',title:'Cours',sub:'Ateliers, parcours, séminaires — contenus fictifs.',createLabel:'Nouveau cours',columns:['Titre','Format','Niveau','Session','Statut'],keys:courses.map(c=>c.slug),collection:'courses',rows:courses.map(c=>[esc(c.title),esc(c.format),esc(c.level),esc(c.nextSession),statusBadge(c.status)])});
export const adminPremium=collectionPage({path:'/atelier/premium/',title:'Contenus premium',sub:'Essais réservés et conditions d’accès (démonstration).',columns:['Titre','Prix (démo)','Aperçu public','Statut'],keys:articles.filter(a=>a.premium).map(a=>a.slug),collection:'premium',actions:['toggle','delete'],rows:articles.filter(a=>a.premium).map(a=>[esc(a.title),chf(a.price),`${a.preview.length} paragraphes`,statusBadge('Publié')])});
export const adminCalls=collectionPage({path:'/atelier/appels/',title:'Appels à contributions',sub:'Ouvrages collectifs fictifs de démonstration.',createLabel:'Nouvel appel',columns:['Titre','Thème','Limite','Statut'],keys:calls.map(c=>c.slug),collection:'calls',rows:calls.map(c=>[esc(c.title),esc(c.theme),esc(c.deadline),statusBadge(c.status)])});
export const adminProposals=collectionPage({path:'/atelier/propositions/',title:'Propositions',sub:'Propositions fictives reçues via le formulaire public.',columns:['Référence','Titre','Auteur·e','Appel','Reçue','Statut'],keys:proposals.map(p=>p.id),collection:'proposals',actions:['view','status','delete'],rows:proposals.map(p=>[`<code>${esc(p.id)}</code>`,esc(p.title),esc(p.author),esc(p.call),esc(p.received),statusBadge(p.status)])});
export const adminUsers=collectionPage({path:'/atelier/utilisateurs/',title:'Utilisateurs',sub:'Comptes fictifs.',columns:['Nom','E-mail','Rôle','Depuis'],keys:users.map(u=>u.email),collection:'users',actions:['view','delete'],rows:users.map(u=>[esc(u.name),`<code>${esc(u.email)}</code>`,esc(u.role),esc(u.since)])});
export const adminNewsletter=collectionPage({path:'/atelier/newsletter/',title:'Newsletter',sub:'Abonné·es fictif·ves — aucune liste réelle.',createLabel:'Exporter (démo)',columns:['E-mail','Inscription','Statut'],keys:subscribers.map(s=>s.email),collection:'newsletter',actions:['export','delete'],rows:subscribers.map(s=>[`<code>${esc(s.email)}</code>`,esc(s.date),statusBadge(s.status)])});
export const adminOrders=collectionPage({path:'/atelier/commandes/',title:'Commandes',sub:'Commandes simulées — aucune transaction réelle.',columns:['Référence','Date','Contenu','Montant','Statut'],keys:orders.map(o=>o.id),collection:'orders',actions:['view','delete'],rows:orders.map(o=>[`<code>${esc(o.id)}</code>`,esc(o.date),esc(o.item),chf(o.amount),statusBadge(o.status)])});
export const adminReviews=collectionPage({path:'/atelier/avis/',title:'Avis',sub:'Avis fictifs de lectrices et lecteurs.',columns:['Auteur·e','Contenu','Note','Avis','Statut'],keys:reviews.map((r,i)=>`${r.author}-${i}`),collection:'reviews',actions:['view','toggle','delete'],rows:reviews.map(r=>[esc(r.author),esc(r.item),`${r.rating}/5`,esc(r.text),statusBadge(r.status)])});

export const adminSettings={path:'/atelier/reglages/',title:'Réglages',depth:2,body(){return `${adminHead('Réglages','Paramètres du site et de la démonstration.')}
<div class="admin-cols"><section class="admin-panel"><h2>Identité du site</h2><form data-settings-form novalidate><div class="form-grid"><div class="field"><label for="st-name">Nom affiché</label><input id="st-name" value="${esc(site.name)}"></div><div class="field"><label for="st-tag">Signature</label><input id="st-tag" value="${esc(site.tagline)}"></div><div class="field"><label for="st-email">E-mail de contact</label><input id="st-email" value="à confirmer" disabled><p class="form-hint">Sera activé avec l’adresse réelle de la cliente.</p></div><button class="btn btn-primary" type="submit">Enregistrer (démo)</button><p class="form-status" data-form-status role="status" aria-live="polite"></p></div></form></section><section class="admin-panel"><h2>Architecture de démonstration</h2><ul class="admin-limits"><li>GitHub Pages : mode local de secours, sans API.</li><li>Render : Node + API same-origin.</li><li>Neon : stockage persistant lorsque <code>DATABASE_URL</code> est configuré.</li><li>Paiements : toujours simulés dans cette version.</li><li>Contenus premium : restent un prototype de paywall jusqu’au backend de production.</li></ul></section></div>`;}};

export const adminPages=[adminDashboard,adminArticles,adminPublications,adminBooks,adminCourses,adminPremium,adminCalls,adminProposals,adminUsers,adminNewsletter,adminOrders,adminReviews,adminSettings];
