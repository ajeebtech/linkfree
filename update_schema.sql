alter table profiles
add column theme jsonb default '{"mode": "light", "palette": "monochrome"}'::jsonb,
add column font text default 'inter',
add column published boolean default false,
add column links jsonb default '[]'::jsonb;
