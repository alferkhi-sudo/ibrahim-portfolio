-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  answers jsonb,
  metadata jsonb
);

-- Enable Row Level Security
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Policy: allow INSERT for anon role (public can submit)
CREATE POLICY "Allow anon insert"
  ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: allow SELECT only for authenticated role (admin export)
CREATE POLICY "Allow authenticated select"
  ON survey_responses
  FOR SELECT
  TO authenticated
  USING (true);
