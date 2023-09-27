import { html, view } from 'cloudflare-htmx';

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const onRequestPost: PagesFunction = async (event) => {
  await timer(1000);
  return view(html`<h2>Loaded!</h2>`);
};

export const onRequestGet: PagesFunction = async ({ request }) => {
  return view(html`
    <h1>Welcome to HTMX</h1>
    <div hx-post="/">Loading...</div>
  `);
};
