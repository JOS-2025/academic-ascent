CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL DEFAULT 'quote',
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  subject text,
  level text,
  deadline text,
  message text NOT NULL,
  email_sent boolean NOT NULL DEFAULT false,
  email_error text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;