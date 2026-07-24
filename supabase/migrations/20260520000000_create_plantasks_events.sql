-- PlanTasks: monthly calendar events
create type event_category as enum
  ('work', 'workout', 'hobby', 'cinema', 'filming', 'sleep', 'other');

create table events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category event_category not null default 'other',
  start_at timestamptz not null,
  end_at timestamptz not null,
  all_day boolean not null default false,
  rrule text,                          -- iCal RRULE string; null = one-off event
  parent_event_id uuid references events(id) on delete cascade,
                                        -- set only on exception rows (one edited instance of a series)
  excluded_dates timestamptz[] default '{}',
                                        -- instances of the parent series deleted individually
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index events_user_id_idx on events(user_id);
create index events_start_at_idx on events(start_at);
create index events_parent_event_id_idx on events(parent_event_id);

alter table events enable row level security;

create policy "Users manage their own events"
  on events for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep updated_at current on every write
create or replace function events_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger events_updated_at
  before update on events
  for each row execute function events_set_updated_at();
