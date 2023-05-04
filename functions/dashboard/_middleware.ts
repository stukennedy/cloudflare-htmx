import { getSupabase } from "@src/model/supabase";

export const onRequestGet: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  const supabase = await getSupabase(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("authentication: redirect to login");
    return Response.redirect(url.origin, 303);
  } else {
    return next();
  }
};
