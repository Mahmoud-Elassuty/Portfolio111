# Mahmoud Hassan | Full-Stack Developer Portfolio

React 19 + Vite + Bootstrap 5 + Bootstrap Icons + custom CSS. Bilingual (English / Arabic with full RTL).
Messages from the contact form go to **Supabase**, and you read them in a private dashboard at **`/admin`**.

```bash
npm install
npm run dev        # http://localhost:5173   (dashboard: /admin)
npm run build      # production build into dist/
npm run preview
```

## 1. Put your files in `public/` (exact names, nothing to rename)

```
public/
  cv/cv_full_stack (1).pdf
  Wasla-Project/localhost_5173_.png  ...(the 8 screenshots)
  Pharmacy-Project/Screenshot 2026-09-24 185936.png ...(the 10 screenshots)
  Iti-Training/IMG-20261007-WA0011.jpg
```

File names are referenced in `src/data/content.js` (`CV`, `PROJECTS[].images`, `ITI_CERT`).
Missing images never break the page: a project falls back to an illustrated cover and the gallery hides any file that fails to load.
Wasla screenshot captions (Home, Product page, ...) are guessed from the file names; edit `caps` in `content.js` if one is wrong.

## 2. Official logos (Menoufia, ITI, DEPI, Nafezly, Kafiil, Khamsat, Mostaql)

Download each logo from the organization's own website and drop it into **`src/assets/logos/`**.
The file name only has to contain the id: `menoufia`, `iti`, `depi`, `nafezly`, `kafiil`, `khamsat`, `mostaql`
(e.g. `iti.svg`, `menoufia.png`). No code change needed. They sit on a light plate so any logo stays readable on the dark theme.

Until a file exists, universities/training show the original placeholder tiles and platforms show a lettered badge.
Kafiil additionally tries the logo URL found in Kafiil's own page markup (`kafiil.com/assets/images/logos/small2.svg`)
and silently falls back to the badge if it doesn't load. A local file always wins.

## 3. Messages dashboard (Supabase) - about 5 minutes

1. Create a project at supabase.com.
2. **SQL Editor** -> New query -> paste `supabase/schema.sql` -> Run.
   (If you log in with a different email than `mahmoudalassiouty1@gmail.com`, change it in the SQL first.)
3. **Authentication -> Users -> Add user** -> your email + a strong password (tick "Auto Confirm").
   Then **Authentication -> Sign In / Providers** -> turn **off** "Allow new users to sign up".
4. **Project Settings -> API**: copy the *Project URL* and the *anon / publishable* key.
5. Locally: copy `.env.example` to `.env` and fill the two values.
6. Visit `/admin` and sign in.

Security model: visitors can only **insert** a message (length and email format are checked in the database, bots
hitting the hidden honeypot field are dropped). Only a signed-in user whose email matches the policy can read, mark
as read, or delete. **Never** put the `service_role` / secret key in the project.

Without the two env vars the contact form simply falls back to opening the visitor's email app (`mailto:`).

## 4. Deploy on Vercel

1. Push to GitHub, then Vercel -> Add New Project -> import the repo (Framework: Vite is auto-detected).
2. Settings -> Environment Variables: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then redeploy.
3. `vercel.json` already routes `/admin` to the app and sends `noindex` for it; `robots.txt` disallows `/admin`.

## Structure

```
src/components/   Hero, Projects (cards + modal), Education (cards + modal), Gallery, Dialog, ProjectArt, Contact, ...
src/admin/        Dashboard (lazy-loaded: visitors never download it or the Supabase SDK)
src/data/         content.js  <- ALL copy, links, projects, education details (EN + AR)
src/lib/          backend.js (Supabase insert), assets.js
src/styles/       base / hero / sections / motion
supabase/         schema.sql
```
