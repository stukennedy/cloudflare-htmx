import { createClient } from '@supabase/supabase-js';
import { parse } from 'cookie';

const PUBLIC_SUPABASE_URL = 'https://pfvlbdutrfswxykbtrhs.supabase.co';
const PUBLIC_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdmxiZHV0cmZzd3h5a2J0cmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5NTEwNjIsImV4cCI6MTk5ODUyNzA2Mn0.WKcl4w5w_WTOqUPdVQEe7X45Isrfi0SfZwTIC0v3lYM';

export const getSupabase = async (request?: Request) => {
  const supabase = createClient(
    PUBLIC_SUPABASE_URL || '',
    PUBLIC_SUPABASE_ANON_KEY || '',
    {
      auth: { persistSession: false },
    }
  );
  if (!request) {
    return supabase;
  }
  const cookies = parse(request.headers.get('Cookie') || '');
  const refreshToken = cookies['sb-refresh-token'];
  const accessToken = cookies['sb-access-token'];

  if (refreshToken && accessToken) {
    await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
  }

  return supabase;
};
