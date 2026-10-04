/* Same-origin API helper. GitHub Pages gracefully falls back to the browser demo. */
(function () {
  'use strict';
  var cache = Object.create(null);
  var SophiaAPI = {
    request: function (path, options) {
      options = options || {};
      var fetchOptions = Object.assign({ credentials: 'same-origin', headers: {} }, options);
      fetchOptions.headers = Object.assign({ 'Accept': 'application/json' }, options.headers || {});
      if (fetchOptions.body && typeof fetchOptions.body !== 'string') {
        fetchOptions.headers['Content-Type'] = 'application/json';
        fetchOptions.body = JSON.stringify(fetchOptions.body);
      }
      return fetch(path, fetchOptions).then(function (res) {
        return res.text().then(function (text) {
          var data = null;
          try { data = text ? JSON.parse(text) : null; } catch (e) { data = { message: text }; }
          if (!res.ok) {
            var err = new Error((data && data.message) || 'API error');
            err.status = res.status;
            throw err;
          }
          return data;
        });
      });
    },
    get: function (path) { return this.request(path); },
    post: function (path, body) { return this.request(path, { method: 'POST', body: body || {} }); },
    put: function (path, body) { return this.request(path, { method: 'PUT', body: body || {} }); },
    patch: function (path, body) { return this.request(path, { method: 'PATCH', body: body || {} }); },
    del: function (path, body) { return this.request(path, { method: 'DELETE', body: body || {} }); },
    once: function (key, fn) {
      if (!cache[key]) cache[key] = fn();
      return cache[key];
    }
  };
  window.SophiaAPI = SophiaAPI;
})();
