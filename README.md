# Mia Randria — miarandria.com

A luxury editorial redesign of the Mia Randria portfolio site: beauty & content creator, high-end brand collaborations. Includes **The Edit** — a lifestyle journal CMS (Beauty, Travel, Style, At the Table) where Mia can publish posts and recipes herself.

## Tech stack

- **Site + The Edit:** Next.js 14 (App Router), Tailwind CSS, TypeScript
- **CMS backend:** Supabase (Postgres, Auth, Storage)
- **Rich text:** Tiptap
- **Deploy:** Vercel (recommended)

## Run locally

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your Supabase URL and anon key (see Supabase setup below)
npm run dev
```

Then open **http://localhost:3000**.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run the schema in **supabase/schema.sql** (creates `posts` table and RLS policies).
3. **Authentication → Users → Add user:** create a user with Mia’s email and a password (no sign-up link; this is the only admin).
4. **Storage → New bucket:** name it `post-images`, set to **Public**.
5. **Project Settings → API:** copy **Project URL** and **anon public** key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

6. RLS is already in the schema: anonymous users can only `SELECT` rows where `is_published = true`; authenticated users have full access.

## Mia’s workflow (adding a recipe)

1. Go to **miarandria.com/admin** (or localhost:3000/admin) and sign in.
2. Click **New Post**.
3. Choose category **At the Table**.
4. Fill in: title, hero image (drag & drop or click), excerpt, intro quote.
5. Check **Is this a Recipe?** and add ingredients (name + amount) and steps.
6. Paste the YouTube/Instagram/TikTok link for the cooking video.
7. Add a short **Mia’s Note** (personal anecdote).
8. Click **Publish** — the post goes live on The Edit immediately.

No developer needed after setup.

## Structure

- **app/** — Next.js App Router: homepage, `/the-edit`, `/the-edit/[slug]`, `/admin/login`, `/admin/dashboard`, `/admin/new`, `/admin/edit/[id]`
- **components/** — Header, The Edit (PostCard, FeaturedPost, FilterBar, RecipeView, PostView), Admin (PostForm, RecipeFields, ImageUploader, RichTextEditor)
- **lib/** — Supabase client (browser + server), posts CRUD
- **supabase/schema.sql** — Posts table and RLS
- **index.html / styles.css / script.js** — Legacy static files (site is served by Next.js)

Images on the main portfolio still load from the Zyrosite CDN. Hero images for The Edit are stored in Supabase Storage.

## Deploy to miarandria.com

Your new design is just static files, so you can host it anywhere and point your domain to it. Here are two simple options.

### Option 1: Netlify (recommended)

1. Go to [netlify.com](https://www.netlify.com) and sign up (free).
2. Drag and drop your **miarandria** folder (the one containing `index.html`, `styles.css`, `script.js`) onto the Netlify “Deploy” area, or connect a Git repo and deploy from there.
3. After deploy, Netlify gives you a URL like `something.netlify.app`. Test it to confirm the site works.
4. **Connect your domain:** In the Netlify site dashboard go to **Domain settings** → **Add custom domain** → enter `miarandria.com`.
5. **Update DNS** where you bought the domain (GoDaddy, Namecheap, Google Domains, etc.):
   - Add a **CNAME** record: name `www` (or `@` if your registrar supports it for root), value `something.netlify.app` (the exact host Netlify shows).
   - For the **root** domain (`miarandria.com` with no www), Netlify will show you either:
     - **A records** (e.g. `75.2.60.5`) to add, or  
     - “Netlify DNS” — you can move your nameservers to Netlify and they’ll set everything for you.
6. Wait for DNS to propagate (minutes to a few hours). Netlify will issue a free SSL certificate so the site is served over HTTPS.

### Option 2: Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (free).
2. Click **Add New** → **Project**, then either upload the miarandria folder or import from Git.
3. Deploy; you’ll get a URL like `miarandria.vercel.app`.
4. In the project go to **Settings** → **Domains** → add `miarandria.com` (and `www.miarandria.com` if you want).
5. In your domain registrar’s DNS, add the records Vercel shows (usually a CNAME for `www` and A records or CNAME flattening for the root).
6. After DNS propagates, Vercel will enable HTTPS automatically.

### DNS on Hostinger

If your domain is on Hostinger, use these steps after you’ve added the custom domain in Netlify:

1. Log in to **Hostinger** → **hPanel**.
2. Go to **Domains** → select **miarandria.com** → **DNS / Nameservers** (or **Manage DNS**).
3. Add or edit records as follows. (Delete any old A or CNAME records for `@` and `www` if they point to Zyrosite or elsewhere, or you’ll replace them.)

   **For the root domain (miarandria.com):**

   | Type | Name | Value / Points to | TTL |
   |------|------|-------------------|-----|
   | A    | `@`  | `75.2.60.5`       | 3600 or default |
   | A    | `@`  | `99.83.190.102`   | 3600 or default |

   **For www (www.miarandria.com):**

   | Type  | Name | Value / Points to        | TTL |
   |-------|------|--------------------------|-----|
   | CNAME | `www`| `your-site-name.netlify.app` | 3600 or default |

   Use the **exact** Netlify subdomain shown in **Domain settings** (e.g. `random-words-123.netlify.app`) as the CNAME value for `www`.

4. Save and wait 15–60 minutes. Netlify will then provision HTTPS for miarandria.com and www.miarandria.com.

### After you switch

- Your **current** site is on Zyrosite. Once DNS points to Netlify/Vercel, visitors will see this new design instead. You can cancel or pause the Zyrosite plan if you no longer need it.
- **Images** in this design still load from the Zyrosite CDN. If you cancel Zyrosite, those image URLs may stop working. Then either re-upload the images to Netlify/Vercel (or an image host) and update the `src` values in `index.html`, or keep only the Zyrosite plan that serves the CDN assets.
