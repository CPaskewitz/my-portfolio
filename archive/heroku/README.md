# Heroku hosting (retired Nov 2026)

The site used to run on Heroku via `Procfile` → `npm start` → `vite preview --port $PORT --host`, with
headers in `static.json` (which never applied, since the static buildpack wasn't used). The Heroku account
no longer exists; the site is served by Vercel and its headers live in `vercel.json`.
The `start` script was removed from package.json at the same time.
