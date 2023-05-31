import Spinner from '@components/Spinner';
import { html, htmlResponse } from '@lib/html';
import { authConfig } from '@lib/constants';
import { verify, Env } from 'cloudflare-auth';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const data = await request.formData();
  const token = data.get('token') as string;
  try {
    return await verify(token!, env, authConfig, url);
  } catch {
    return Response.redirect(url.origin, 301);
  }
};

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  return htmlResponse(html`
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
