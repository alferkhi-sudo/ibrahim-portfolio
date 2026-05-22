-- Create weekplan_activities table
CREATE TABLE IF NOT EXISTS weekplan_activities (
  id          text PRIMARY KEY,
  day         text NOT NULL CHECK (day IN ('MON','TUE','WED','THU','FRI','SAT','SUN')),
  title       text NOT NULL,
  start_time  text NOT NULL,
  end_time    text NOT NULL,
  category    text NOT NULL CHECK (category IN ('WORK','TRAINING','MEALS','CREATIVE','WELLNESS_ERRAND','ROUTINE','FREE')),
  is_default  boolean NOT NULL DEFAULT false
);

-- No public access — all reads/writes go through service role (server-side cookie auth)
ALTER TABLE weekplan_activities ENABLE ROW LEVEL SECURITY;

-- Seed default activities (idempotent — safe to re-run)
INSERT INTO weekplan_activities (id, day, title, start_time, end_time, category, is_default) VALUES
  ('d-mon-1','MON','Wakeup',       '06:30','06:45','ROUTINE',          true),
  ('d-mon-2','MON','WFH Work',     '08:00','18:00','WORK',             true),
  ('d-mon-3','MON','Easy Run',     '18:30','19:15','TRAINING',         true),
  ('d-mon-4','MON','Eat',          '19:15','20:00','MEALS',            true),
  ('d-mon-5','MON','Sleep',        '23:00','23:30','ROUTINE',          true),

  ('d-tue-1','TUE','Wakeup',       '06:30','06:45','ROUTINE',          true),
  ('d-tue-2','TUE','WFO Work',     '09:00','18:00','WORK',             true),
  ('d-tue-3','TUE','Commute Home', '18:00','19:15','WELLNESS_ERRAND',  true),
  ('d-tue-4','TUE','Gym',          '19:30','20:15','TRAINING',         true),
  ('d-tue-5','TUE','Eat',          '20:30','21:00','MEALS',            true),
  ('d-tue-6','TUE','Sleep',        '23:00','23:30','ROUTINE',          true),

  ('d-wed-1','WED','Wakeup',       '06:30','06:45','ROUTINE',          true),
  ('d-wed-2','WED','WFH Work',     '08:00','18:00','WORK',             true),
  ('d-wed-3','WED','Tempo Run',    '18:30','19:15','TRAINING',         true),
  ('d-wed-4','WED','Eat',          '19:15','20:00','MEALS',            true),
  ('d-wed-5','WED','Sleep',        '23:00','23:30','ROUTINE',          true),

  ('d-thu-1','THU','Wakeup',       '06:30','06:45','ROUTINE',          true),
  ('d-thu-2','THU','WFO Work',     '09:00','18:00','WORK',             true),
  ('d-thu-3','THU','Commute Home', '18:00','19:15','WELLNESS_ERRAND',  true),
  ('d-thu-4','THU','Gym',          '19:30','20:15','TRAINING',         true),
  ('d-thu-5','THU','Eat',          '20:30','21:00','MEALS',            true),
  ('d-thu-6','THU','Sleep',        '23:00','23:30','ROUTINE',          true),

  ('d-fri-1','FRI','Wakeup',       '06:30','06:45','ROUTINE',          true),
  ('d-fri-2','FRI','WFH Work',     '08:00','18:00','WORK',             true),
  ('d-fri-3','FRI','Groceries',    '18:30','19:30','WELLNESS_ERRAND',  true),
  ('d-fri-4','FRI','Sleep',        '23:00','23:30','ROUTINE',          true),

  ('d-sat-1','SAT','Wakeup',       '06:30','06:45','ROUTINE',          true),
  ('d-sat-2','SAT','Long Run',     '07:00','08:15','TRAINING',         true),
  ('d-sat-3','SAT','Breakfast',    '08:30','09:15','MEALS',            true),
  ('d-sat-4','SAT','Filming',      '09:45','12:00','CREATIVE',         true),
  ('d-sat-5','SAT','Sleep',        '23:00','23:30','ROUTINE',          true),

  ('d-sun-1','SUN','Wakeup',       '06:30','06:45','ROUTINE',          true),
  ('d-sun-2','SUN','AquaTonic',    '09:30','10:15','WELLNESS_ERRAND',  true),
  ('d-sun-3','SUN','Breakfast',    '10:45','11:15','MEALS',            true),
  ('d-sun-4','SUN','Video Editing','11:45','13:30','CREATIVE',         true),
  ('d-sun-5','SUN','Sleep',        '23:00','23:30','ROUTINE',          true)
ON CONFLICT (id) DO NOTHING;
