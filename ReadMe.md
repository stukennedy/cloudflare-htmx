# Cloudflare Pages + HTMX

This is a starter project to create a zero-build web-app using [HTMX](https://htmx.org/) on [Cloudflare](https://dash.cloudflare.com/). It uses [\_hyperscript](https://hyperscript.org) for additional (rare) client side JS and [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) for styling and theme.

## Live Demo

![Cloudflare-HTMX demo](screenshot.png 'Demo Screenshot')

[https://cloudflare-htmx.pages.dev/](https://cloudflare-htmx.pages.dev/)

## Getting Started

```bash
$ git clone https://github.com/stukennedy/cloudflare-htmx.git
$ cd cloudflare-htmx
$ npm i
$ npm run dev
```

- NextJS-style routing files, written in Typescript, are found in the `functions` folder.
- Endpoints should return HTML strings wrapped in a `new Response()`.
- `import { html, htmlResponse } from "@src/lib/html"` declaration allows a string template to be syntax highlighted in VS Code
- Use `_middleware.ts` files at any level of the folder structure to apply a layout. You should use this to at least apply your root level HTML wrapper.
  e.g.

```typescript
// functions/_middleware.ts
import RootLayout from '@src/layouts/RootLayout';
import { applyLayout } from '@src/lib/html';

export const onRequestGet = [applyLayout(RootLayout)];
```

This makes sure that the `RootLayout` which is of type `LayoutFunction` wraps all `GET` requests throughout the app.
Our `RootLayout.ts` looks like this:

```typescript
import SupabaseAuth from '@src/components/SupabaseAuth';
import { html, LayoutFunction } from '@src/lib/html';

// this is the layout for the entire site
const _layout: LayoutFunction = ({ children }) => {
  const title = 'Cloudflare Pages + HTMX + Hyperscript';
  return html`
    <!DOCTYPE html>
    <html lang="en" data-theme="mytheme">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <link href="/assets/css/output.css" rel="stylesheet" />
        <script src="/assets/js/htmx.min.js"></script>
        <script src="/assets/js/_hyperscript.min.js"></script>
      </head>
      <body class="bg-base-300" hx-boost="true">
        ${children}
        <div id="toaster"></div>
        <div id="modal"></div>
        ${SupabaseAuth('/dashboard')}
      </body>
    </html>
  `;
};
export default _layout;
```

A layout function can be `async` too if needed.

Other layouts can be handled a similar way throughout the folder structure. e.g. to Apply the Navbar to just anything under route `/dashboard` we use this

```typescript
// functions/dashboard/_middleware.ts
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
```

This chains both the authentication function and the layout. If the authentication fails, it redirects to the login screen before getting to process the layout.

### HTMX

[HTMX](https://htmx.org/) is a lightweight javascript library that encourages webapps to be built using HATEOAS.

HATEOAS (Hypermedia as the Engine of Application State) is a constraint of the REST application architecture. It keeps the REST style architecture unique from most other network application architectures.

This means we return HTML from every endpoint request and never JSON. HTMX makes it easy to trigger asynchronous requests for data e.g. directly from a button click or page load ... and then allows you the control on where to place the HTML that the backend responds with.

### Cloudflare Pages

[Cloudflare Pages](https://developers.cloudflare.com/pages/) utilise the Cloudflare CDN to provide Typescript Edge Functions in the cloud and provides a simple framework for developing and deploying serverless webapps.
This allows us to build scalable web-apps that are server rendered, whilst maintaining the dynamic asynchronous experience that Single Page Applications have enjoyed.

### \_hyperscript

[\_hyperscript](https://hyperscript.org/docs) is a small library that allows javascript to be executed on dom tags in a more functional way without writing scripts with code. This is useful for bits of dynamic UI e.g. multi-selecting rows of checkboxes.
