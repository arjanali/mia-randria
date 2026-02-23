-- Posts table (covers all content types including recipes)
create table posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz,
  is_published boolean default false,

  -- Content
  title text not null,
  slug text unique not null,
  category text not null check (category in ('beauty', 'travel', 'style', 'at-the-table')),
  excerpt text,
  body text,
  hero_image_url text,
  mia_note text,

  -- Recipe-specific fields (null for non-recipe posts)
  is_recipe boolean default false,
  recipe_intro_quote text,
  servings int,
  ingredients jsonb,
  steps jsonb,
  linked_video_url text
);

-- RLS: public can only SELECT published posts
alter table posts enable row level security;

create policy "Public can view published posts"
  on posts for select
  to anon
  using (is_published = true);

-- Authenticated users (Mia) can do everything
create policy "Authenticated full access"
  on posts for all
  to authenticated
  using (true)
  with check (true);
