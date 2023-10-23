import Toast from '@components/Toast';
import { Env, isAuthorised, loginWithToken } from 'cloudflare-auth';

import { html, view } from '@lib/html';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const data = await request.formData();
  const email = data.get('email') as string;
  if (!email) {
    return view(Toast('Email not specified'));
  }
  const magicLink = await loginWithToken(email, env, url.origin, true);
  try {
    return view(
      Toast(
        'Click to login: <a href="' + magicLink + '">' + magicLink + '</a>',
        'alert-success'
      )
    );
  } catch {
    return view(Toast('Magic link failed to send!', 'alert-failure'));
  }
};

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const loggedIn = await isAuthorised(request, env);
  if (loggedIn) {
    console.log('redirect to dashboard');
    const url = new URL(request.url);
    return Response.redirect(url.origin + '/dashboard', 303);
  }
  return view(html`
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
