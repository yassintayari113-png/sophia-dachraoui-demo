# SOPHIA — release checklist

Version: 2.1.0 demo client / deploy-ready bundle

## Verified locally

- 49 HTML pages generated in `docs/`.
- `docs/` is the only tracked static publish output; legacy generated root files were removed.
- Build completes with `node build/build.js`.
- Smoke tests complete with `node tests/smoke.test.js`.
- Public/member/admin routes serve HTTP 200 from the bundled static server.
- Relative page links and static assets were audited.
- Every HTML page has exactly one H1.
- Images in generated pages have `alt` attributes.
- FR / EN / DE-CH selector is present in the main header and remains usable on mobile.
- Main buttons use a 44px minimum touch height; compact actions use the smaller button variant.
- Member/admin data tables collapse into readable mobile cards instead of forcing horizontal overflow.
- Admin publish/status controls target the explicit status badge.
- Newsletter export generates a CSV in the browser.
- Member save / checkout / profile flows use the Render API when available and fall back to browser-local demo state on GitHub Pages.
- Render API was exercised with a memory-backed smoke test: health, login, session, member summary, save, duplicate save, profile update, checkout, duplicate purchase, admin state read/update, and logout.

## Deployment modes

### GitHub Pages

Publish the `docs/` directory from the `main` branch. This mode is static and intentionally uses browser-local demo fallback for accounts, purchases and forms.

### Render + Neon

Use the included `render.yaml` for a Node Web Service. Set `DATABASE_URL` to the Neon PostgreSQL connection string and set a long random `SESSION_SECRET`. Keep `DEMO_MODE=true` for the client demo.

The bundled payment flow is simulation-only. Real card processing, production premium-content authorization, transactional email and full CMS editing still require a production backend/payment integration.

## Demo accounts

Owner: `demo-owner@example.test` / `DemoOnly-2026!`

Member: `demo-member@example.test` / `DemoOnly-2026!`

Do not reuse these credentials for production.
