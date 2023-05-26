import DashLayout from '@src/layouts/DashLayout';
import { applyLayout } from '@src/lib/html';
import { getSupabase } from '@src/model/supabase';

const authentication: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  const supabase = await getSupabase(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error('authentication: redirect to login', url.origin);
    return Response.redirect(url.origin, 303);
  } else {
    return next();
  }
};

export const onRequestGet = [authentication, applyLayout(DashLayout)];
