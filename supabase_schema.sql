-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key, -- Optional: if using Supabase Auth, otherwise use uuid_generate_v4()
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  
  -- Custom fields for Linkfree
  clerk_id text unique not null,
  role text,
  socials jsonb default '{}'::jsonb,
  
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- In this case, since we are using Clerk, we might need to handle RLS differently or use a Service Role key for creation 
-- and then allow public read access.

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

-- For now, we will use Server Actions with the Service Role (or authenticated client if we sync auth) to insert.
-- So we can leave the insert policy restrictive or open it if we implement a custom auth sync.
