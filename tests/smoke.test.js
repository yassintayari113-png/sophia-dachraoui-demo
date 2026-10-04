import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const DIST=path.join(ROOT,'docs');
let failures=0;
function check(ok,msg){if(ok)console.log(`✔ ${msg}`);else{failures++;console.error(`✘ ${msg}`);}}
const html=[];async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else if(e.name.endsWith('.html'))html.push(p);}}
await walk(DIST);check(html.length===49,`docs contient 49 pages HTML (trouvé ${html.length})`);
const index=await readFile(path.join(DIST,'index.html'),'utf8');
check(index.includes('assets/i18n.js'),'index charge i18n.js');check(index.includes('data-lang-choice="en"')&&index.includes('data-lang-choice="de-CH"'),'sélecteur FR/EN/DE-CH présent');check(index.includes('noindex, nofollow'),'mode démo non indexable');
check(!(await readFile(path.join(DIST,'robots.txt'),'utf8')).includes('Sitemap:'),'robots demo bloque l’indexation sans sitemap');
check((await readFile(path.join(DIST,'.nojekyll'),'utf8'))==='','GitHub Pages : .nojekyll présent');
const css=await readFile(path.join(DIST,'assets/main.css'),'utf8');check(css.includes('.language-switcher')&&css.includes('table.data tr { display: block;')&&css.includes('min-height: 44px;'),'CSS multilingue + boutons + tables mobiles présent');
const member=await readFile(path.join(DIST,'espace-membre/index.html'),'utf8');check(member.includes('data-member-app')&&member.includes('data-member-gate'),'espace membre structuré');
const memberJs=await readFile(path.join(DIST,'assets/member.js'),'utf8');check(memberJs.includes('/api/member/summary'),'espace membre utilise l’API Render avec fallback');
const articleDetail=await readFile(path.join(DIST,'articles','ecrire-entre-les-langues','index.html'),'utf8');check(!articleDetail.includes('data-save-url="/articles/'),'liens Enregistrer un article compatibles GitHub Pages');const admin=await readFile(path.join(DIST,'atelier','articles','index.html'),'utf8');check(admin.includes('data-status-badge')&&admin.includes('data-admin-toggle'),'Admin : statut ciblé proprement');check(!existsSync(path.join(ROOT,'assets'))&&!existsSync(path.join(ROOT,'admin.html'))&&!existsSync(path.join(ROOT,'dist')),'ancienne génération root/dist supprimée');

for(const file of ['app.js','auth.js','checkout.js','member.js','admin.js','i18n.js','api.js']){const p=path.join(DIST,'assets',file);const r=spawnSync(process.execPath,['--check',p],{encoding:'utf8'});check(r.status===0,`syntaxe JS valide : ${file}`);}
const serverCheck=spawnSync(process.execPath,['--check',path.join(ROOT,'server/server.mjs')],{encoding:'utf8'});check(serverCheck.status===0,'syntaxe server.mjs valide');
console.log(failures?`\n${failures} échec(s).`:'\nTous les smoke tests passent.');process.exit(failures?1:0);
