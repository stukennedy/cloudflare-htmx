import Spinner from '@components/Spinner';
import { html, view } from '@lib/html';
import { verify, Env } from 'cloudflare-auth';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const data = await request.formData();
  const token = data.get('token') as string;
  try {
    return await verify(token!, env, '/dashboard');
  } catch (e) {
    console.log(e);
    return Response.redirect(url.origin, 303);
  }
};

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  return view(html`
    <form class="h-screen" hx-post="/verify" hx-trigger="load">
      <input
        type="hidden"
        name="token"
        value="${url.searchParams.get('token')}"
      />
      ${Spinner('Logging in ...')}
    </form>
  `);
};
