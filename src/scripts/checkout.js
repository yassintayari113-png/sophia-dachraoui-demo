/* Checkout — server-first simulated payment, local fallback. */
(function(){'use strict';
  var items=window.__DEMO_ITEMS__||{}, params=new URLSearchParams(location.search), slug=params.get('article'), pool=items.articles||{}, kind='article';
  if(!slug||!pool[slug]){slug=params.get('cours');pool=items.courses||{};kind='cours';}
  var item=slug?pool[slug]:null, lines=document.querySelector('[data-order-lines]'), form=document.querySelector('[data-checkout-form]');
  function chf(v){return 'CHF '+Number(v).toFixed(2);} function setStatus(msg,ok){var el=form&&form.querySelector('[data-form-status]');if(el){el.textContent=msg;el.classList.toggle('ok',!!ok);el.classList.toggle('err',ok===false);}}
  if(!item){if(form){var b=form.querySelector('button[type=submit]');b.disabled=true;b.textContent='Aucun article sélectionné';}return;}
  lines.innerHTML='';var dl=document.createElement('div');dl.className='order-line';var n=document.createElement('span');n.textContent=item.title+' ('+item.kind+')';var p=document.createElement('strong');p.textContent=chf(item.price);dl.append(n,p);var total=document.createElement('div');total.className='order-total';var tl=document.createElement('span');tl.textContent='Total';var tv=document.createElement('strong');tv.textContent=chf(item.price);total.append(tl,tv);lines.append(dl,total);
  var session=window.AuthSession?window.AuthSession.read():null;if(!session){try{session=JSON.parse(localStorage.getItem('sophia_demo_session')||'null');}catch(e){}}if(!session||session.demo!==true){location.href='../connexion/?redirect='+encodeURIComponent('paiement/'+location.search);return;}
  form.addEventListener('submit',async function(e){e.preventDefault();if(!form.checkValidity()){form.reportValidity();setStatus('Veuillez compléter tous les champs (valeurs fictives acceptées).',false);return;}var btn=form.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Traitement simulé…';setStatus('Simulation du paiement en cours — aucune transaction réelle.',true);
    try{
      var response;
      if(window.SophiaAPI){try{response=await window.SophiaAPI.post('/api/checkout',{slug:slug,kind:kind});}catch(apiErr){if(apiErr.status!==404&&apiErr.status!==0)throw apiErr;response=null;}}
      if(!response){var list=[];try{list=JSON.parse(localStorage.getItem('sophia_demo_purchases')||'[]');}catch(err){}if(list.some(function(x){return x.slug===slug;}))throw new Error('Déjà acquis');var ref='CMD-2026-'+String(Math.floor(1000+Math.random()*9000));list.push({ref:ref,slug:slug,kind:item.kind,title:item.title,price:chf(item.price),url:kind==='article'?'../articles/'+slug+'/':'../cours/'+slug+'/',date:new Date().toISOString()});localStorage.setItem('sophia_demo_purchases',JSON.stringify(list));response={ref:ref};}
      form.reset();location.href='confirmation/?ref='+encodeURIComponent(response.ref||'');
    }catch(err){btn.disabled=false;btn.textContent='Payer (simulation)';setStatus(err.message||'Impossible de finaliser la simulation.',false);}
  });
})();
