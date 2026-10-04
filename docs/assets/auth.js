/* Authentication — server-first with GitHub/local demo fallback. */
(function(){
  'use strict';
  var KEY='sophia_demo_session';
  var DEMO_ACCOUNTS=[{email:'demo-owner@example.test',password:'DemoOnly-2026!',name:'Propriétaire (démo)',role:'owner'},{email:'demo-member@example.test',password:'DemoOnly-2026!',name:'Membre (démo)',role:'member'}];
  function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);}
  function readLocal(){try{var s=JSON.parse(localStorage.getItem(KEY)||'null');return s&&s.demo===true&&s.email?s:null;}catch(e){return null;}}
  var AuthSession={read:readLocal,write:function(s){localStorage.setItem(KEY,JSON.stringify(s));},clear:function(){localStorage.removeItem(KEY);},loginLocal:function(email,password){return DEMO_ACCOUNTS.find(function(a){return a.email===email.toLowerCase().trim()&&a.password===password;});}};
  window.AuthSession=AuthSession;
  function safeRedirect(param){if(!param)return null;try{var u=new URL(param,location.href);if(u.origin!==location.origin)return null;return u.pathname+u.search;}catch(e){return null;}}
  function status(form,msg,ok){var el=form.querySelector('[data-form-status]');if(!el)return;el.textContent=msg;el.classList.toggle('ok',!!ok);el.classList.toggle('err',ok===false);}
  function home(){var r=safeRedirect(new URLSearchParams(location.search).get('redirect'));location.href=r||'../espace-membre/';}
  var current=readLocal();
  // Server session sync (Render). Failure is expected on GitHub Pages.
if(window.SophiaAPI){
  window.SophiaAPI.get('/api/auth/me')
    .then(function(data){
      if(data && data.session){
        AuthSession.write(data.session);
      }
    })
    .catch(function(){
      // GitHub Pages has no backend yet — continue in demo mode.
    });
}

var login=document.querySelector('[data-login-form]');
if(login){
  if(current){
    home();
    return;
  }

  login.addEventListener('submit',async function(e){
    e.preventDefault();

    var email=login.email.value.trim();
    var password=login.password.value;

    if(!validEmail(email)){
      status(login,'Veuillez saisir une adresse e-mail valide.',false);
      return;
    }

    var btn=login.querySelector('button[type=submit]');
    btn.disabled=true;

    try{
      var data=null;

      // Try the real Render backend first.
      if(window.SophiaAPI){
        try{
          data=await window.SophiaAPI.post('/api/auth/login',{
            email:email,
            password:password
          });
        }catch(apiErr){
          // Backend unavailable (for example on GitHub Pages).
          // Fall back to the local demo accounts.
          var localAccount=AuthSession.loginLocal(email,password);

          if(!localAccount){
            throw apiErr;
          }

          data={
            session:{
              demo:true,
              email:localAccount.email,
              name:localAccount.name,
              role:localAccount.role,
              since:new Date().toISOString()
            }
          };
        }
      }else{
        // No backend available — use local demo accounts.
        var a=AuthSession.loginLocal(email,password);

        if(!a){
          throw new Error('Identifiants inconnus');
        }

        data={
          session:{
            demo:true,
            email:a.email,
            name:a.name,
            role:a.role,
            since:new Date().toISOString()
          }
        };
      }

      AuthSession.write(data.session);
      status(login,'Connexion réussie…',true);
      setTimeout(home,350);

    }catch(err){
      status(
        login,
        err.message&&/Identifiants|incorrect/i.test(err.message)
          ?err.message
          :'Identifiants inconnus. Utilisez un compte de démonstration.',
        false
      );

      btn.disabled=false;
    }
  });
}

var register=document.querySelector('[data-register-form]');
if(register){
  if(current){
    home();
    return;
  }

  register.addEventListener('submit',async function(e){
    e.preventDefault();

    var email=register.email.value.trim();

    if(!register.nom.value.trim()){
      status(register,'Veuillez indiquer votre nom.',false);
      return;
    }

    if(!validEmail(email)){
      status(register,'Veuillez saisir une adresse e-mail valide.',false);
      return;
    }

    if(register.password.value.length<10){
      status(register,'Le mot de passe doit contenir au moins 10 caractères.',false);
      return;
    }

    if(!register.consent.checked){
      status(register,'Merci de confirmer votre consentement.',false);
      return;
    }

    var btn=register.querySelector('button[type=submit]');
    btn.disabled=true;

    try{
      var data=null;

      // Try the real Render backend first.
      if(window.SophiaAPI){
        try{
          data=await window.SophiaAPI.post('/api/auth/register',{
            name:register.nom.value.trim(),
            email:email,
            password:register.password.value
          });
        }catch(apiErr){
          // Backend unavailable — create a local demo session.
          data={
            session:{
              demo:true,
              email:email,
              name:register.nom.value.trim(),
              role:'member',
              since:new Date().toISOString()
            }
          };
        }
      }else{
        // No backend available — create a local demo session.
        data={
          session:{
            demo:true,
            email:email,
            name:register.nom.value.trim(),
            role:'member',
            since:new Date().toISOString()
          }
        };
      }

      AuthSession.write(data.session);
      status(register,'Compte créé…',true);
      setTimeout(home,350);

    }catch(err){
      status(
        register,
        err.message||'Impossible de créer le compte.',
        false
      );

      btn.disabled=false;
    }
  });
}

var forgot=document.querySelector('[data-forgot-form]');
if(forgot){
  forgot.addEventListener('submit',function(e){
    e.preventDefault();

    if(!validEmail(forgot.email.value.trim())){
      status(
        forgot,
        'Veuillez saisir une adresse e-mail valide.',
        false
      );
      return;
    }

    status(
      forgot,
      'Si un compte correspond à cette adresse, un lien de réinitialisation serait envoyé (démonstration).',
      true
    );

    forgot.reset();
  });
}

var link=document.querySelector('[data-auth-link]');

if(link&&current){
  link.setAttribute(
    'aria-label',
    'Espace membre — connecté ('+current.email+')'
  );
}
})();
