-- Click-throughs and named introductions to Visari Financial.
-- Public insert only; listing is gated by a server-side partner key.

create table if not exists handoff_events (
  id         serial primary key,
  kind       text not null,
  placement  text not null default '',
  ref_code   text not null default 'kyle',
  created_at timestamptz not null default now()
);

create index if not exists handoff_events_created_at_idx
  on handoff_events (created_at desc);

create table if not exists introductions (
  id            serial primary key,
  name          text not null,
  email         text not null,
  company       text not null default '',
  note          text not null default '',
  placement     text not null default '',
  ref_code      text not null default 'kyle',
  score         integer,
  revenue_band  text,
  industry      text,
  created_at    timestamptz not null default now()
);

create index if not exists introductions_created_at_idx
  on introductions (created_at desc);

create index if not exists introductions_email_idx
  on introductions (email);
