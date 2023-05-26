import Toast from "@src/components/Toast";
import { getSupabase } from "@src/model/supabase";

import { html, htmlResponse } from "@src/lib/html";

export const onRequestPost: PagesFunction = async (event) => {
  const data = await event.request.formData();
  const email = data.get("email") as string;
  if (!email) {
    return htmlResponse(Toast("Email not specified", "alert-error"));
  }
  const supabase = await getSupabase();
  const url = new URL(event.request.url);
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${url.origin}/logging-in`,
    },
  });

  if (error) {
    return htmlResponse(Toast(error.message, "alert-error"));
  }
  return htmlResponse(
    Toast("Please check your email for a magic link to log into the website")
  );
};

export const onRequestGet: PagesFunction = async ({ request }) => {
  const supabase = await getSupabase(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    console.log("redirect to dashboard");
    const url = new URL(request.url);
    return Response.redirect(url.origin + "/dashboard", 303);
  }
  return htmlResponse(html`
    <div class="w-full h-screen p-10 text-center">
      <div class="flex justify-center pt-24 lg:pt-64">
        <div class="p-4 md:p-0 w-full md:w-96">
          <form hx-post="/" hx-target="#toaster">
            <div class="text-4xl text-secondary mb-10">Login</div>
            <div class="mb-5 flex justify-center">
              <input
                id="email"
                name="email"
                data-cy="email"
                class="input text-xl bg-neutral h-14 pl-10 pt-2 pb-2 w-full md:w-96"
                type="email"
                placeholder="enter email address"
              />
            </div>
            <div class="flex justify-center">
              <button
                type="submit"
                class="btn btn-primary lowercase text-xl w-full md:w-96"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `);
};
