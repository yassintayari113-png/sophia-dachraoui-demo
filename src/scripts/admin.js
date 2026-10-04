/* Atelier interactions — server persistence + local fallback. */
(function(){'use strict';
  var session=null;try{session=JSON.parse(localStorage.getItem('sophia_demo_session')||'null');}catch(e){}
  if(!session||session.role!=='owner'){location.href='../connexion/?redirect='+encodeURIComponent(location.pathname+location.search);return;}
  var localKey='sophia_admin_state', state={deleted:{},status:{}};
  function loadLocal(){try{var x=JSON.parse(localStorage.getItem(localKey)||'{}');state=Object.assign(state,x);state.deleted=state.deleted||{};state.status=state.status||{};}catch(e){}}
  function saveLocal(){try{localStorage.setItem(localKey,JSON.stringify(state));}catch(e){}}
  function toast(m){var t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.appendChild(t);}t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show');},2800);}
  var user=document.querySelector('[data-admin-user]');if(user)user.textContent=session.name+' · session démo';
  function setDeleted(collection,key){state.deleted[collection]=state.deleted[collection]||[];if(state.deleted[collection].indexOf(key)===-1)state.deleted[collection].push(key);saveLocal();}
  function setStatus(tr,text){var b=tr.querySelector('[data-status-badge]');if(!b)return;b.textContent=text;b.classList.remove('badge-pub','badge-draft','badge-neutral');b.classList.add(/Publié|Acceptée|Approuvé|Payée/i.test(text)?'badge-pub':'badge-draft');var c=tr.getAttribute('data-admin-collection'),k=tr.getAttribute('data-admin-key');state.status[c]=state.status[c]||{};state.status[c][k]=text;saveLocal();}
  function applyState(){Object.keys(state.deleted).forEach(function(c){(state.deleted[c]||[]).forEach(function(k){var tr=document.querySelector('tr[data-admin-collection="'+CSS.escape(c)+'"][data-admin-key="'+CSS.escape(k)+'"]');if(tr)tr.remove();});});Object.keys(state.status).forEach(function(c){Object.keys(state.status[c]||{}).forEach(function(k){var tr=document.querySelector('tr[data-admin-collection="'+CSS.escape(c)+'"][data-admin-key="'+CSS.escape(k)+'"]');if(tr)setStatusVisual(tr,state.status[c][k]);});});}
  function setStatusVisual(tr,text){var b=tr.querySelector('[data-status-badge]');if(!b)return;b.textContent=text;b.classList.remove('badge-pub','badge-draft','badge-neutral');b.classList.add(/Publié|Acceptée|Approuvé|Payée/i.test(text)?'badge-pub':'badge-draft');}
  function refreshCount(){var count=document.querySelector('[data-admin-count]');if(!count)return;var rows=Array.prototype.slice.call(document.querySelectorAll('[data-admin-table] tbody tr')).filter(function(tr){return !tr.hidden;});count.textContent=rows.length+(rows.length>1?' éléments':' élément');}
  function sync(){if(!window.SophiaAPI)return Promise.resolve(null);return window.SophiaAPI.get('/api/admin/state').then(function(remote){if(remote&&remote.state){state=remote.state;saveLocal();applyState();}return remote;}).catch(function(){return null;});}
  loadLocal();applyState();sync();
  var filter=document.querySelector('[data-admin-filter]');if(filter){var rows=function(){return Array.prototype.slice.call(document.querySelectorAll('[data-admin-table] tbody tr'));};filter.addEventListener('input',function(){var q=filter.value.trim().toLowerCase();rows().forEach(function(tr){tr.hidden=!!(q&&tr.textContent.toLowerCase().indexOf(q)===-1);});refreshCount();});}
  document.addEventListener('click',async function(e){var btn=e.target.closest('[data-admin-create],[data-admin-edit],[data-admin-toggle],[data-admin-status],[data-admin-delete],[data-admin-view],[data-admin-export]');if(!btn)return;var tr=btn.closest('tr'), collection=tr&&tr.getAttribute('data-admin-collection'), key=tr&&tr.getAttribute('data-admin-key');
    try{
      if(btn.hasAttribute('data-admin-create')){toast('Interface de création prête — le formulaire complet sera branché au CMS de production.');return;}
      if(btn.hasAttribute('data-admin-view')){toast('Aperçu de la fiche sélectionnée (démo).');return;}
      if(btn.hasAttribute('data-admin-export')){
        var rows=Array.prototype.slice.call(document.querySelectorAll('[data-admin-table] tbody tr:not([hidden])'));var lines=['Email,Inscription,Statut'];rows.forEach(function(r){var cells=r.querySelectorAll('td');if(cells.length>=3)lines.push([cells[0].textContent.trim(),cells[1].textContent.trim(),cells[2].textContent.trim()].map(csv).join(','));});var blob=new Blob([lines.join('\n')+'\n'],{type:'text/csv;charset=utf-8'});var url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='sophia-newsletter-demo.csv';a.click();setTimeout(function(){URL.revokeObjectURL(url);},500);toast('Export CSV généré.');return;
      }
      if(btn.hasAttribute('data-admin-edit')){toast('Édition simulée — aucune publication réelle n’est modifiée.');return;}
      if(btn.hasAttribute('data-admin-toggle')||btn.hasAttribute('data-admin-status')){
        var badge=tr&&tr.querySelector('[data-status-badge]');var current=badge?badge.textContent.trim():'Publié';var next;
        if(collection==='reviews') next=/Approuvé/i.test(current)?'En attente (démo)':'Approuvé (démo)';
        else if(btn.hasAttribute('data-admin-status')) next=/Acceptée|Approuvée/i.test(current)?'À examiner':'Acceptée';
        else next=/Publié|Ouvert|Payée|Approuvé|Acceptée/i.test(current)?'Brouillon':'Publié';
        if(tr)setStatus(tr,next);if(window.SophiaAPI)await window.SophiaAPI.patch('/api/admin/state',{collection:collection,key:key,action:'status',value:next});toast('Statut mis à jour.');return;
      }
      if(btn.hasAttribute('data-admin-delete')){var label=tr?tr.cells[0].textContent.trim().slice(0,50):'cet élément';if(!window.confirm('Supprimer « '+label+' » ?'))return;if(tr)tr.remove();setDeleted(collection,key);if(window.SophiaAPI)await window.SophiaAPI.patch('/api/admin/state',{collection:collection,key:key,action:'delete'});refreshCount();toast('Élément supprimé de la démonstration.');}
    }catch(err){toast(err.message||'Action impossible.');}
  });
  function csv(s){return '"'+String(s).replace(/"/g,'""')+'"';}
  var settings=document.querySelector('[data-settings-form]');if(settings)settings.addEventListener('submit',async function(e){e.preventDefault();var payload={name:settings.querySelector('#st-name').value.trim(),tagline:settings.querySelector('#st-tag').value.trim()};var st=settings.querySelector('[data-form-status]');try{if(window.SophiaAPI)await window.SophiaAPI.put('/api/admin/settings',payload);st.textContent='Réglages enregistrés.';st.classList.add('ok');toast('Réglages enregistrés.');}catch(err){st.textContent=err.message||'Impossible d’enregistrer.';st.classList.add('err');}});
  if(new URLSearchParams(location.search).get('nouveau'))toast('Interface de création — mode démonstration.');
})();
