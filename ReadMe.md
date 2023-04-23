# Cloudflare Pages + HTMX

This is a starter project to create a zero-build web-app using [HTMX](https://htmx.org/) on [Cloudflare](https://dash.cloudflare.com/). It uses [\_hyperscript](https://hyperscript.org) for additional (rare) client side JS and [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) for styling and theme.

## Getting Started

```bash
$ git clone https://github.com/stukennedy/cloudflare-htmx.git
$ cd cloudflare-htmx
$ npm i
$ npm run dev
```

### HTMX

[HTMX](https://htmx.org/) is a lightweight javascript library that encourages webapps to be built using HATEOAS.

HATEOAS (Hypermedia as the Engine of Application State) is a constraint of the REST application architecture. It keeps the REST style architecture unique from most other network application architectures.

This means we return HTML from every endpoint request and never JSON. HTMX makes it easy to trigger asynchronous requests for data e.g. directly from a button click or page load ... and then allows you the control on where to place the HTML that the backend responds with.

### Cloudflare Pages

[Cloudflare Pages](https://developers.cloudflare.com/pages/) utilise the Cloudflare CDN to provide Typescript Edge Functions in the cloud and provides a simple framework for developing and deploying serverless webapps.
This project takes advantage of the simple NextJS-style routing structure in Cloudflare and adds support for `_layout.ts` files that wrap content heirarchically (using a `{{children}}` marker in the layout text to denote where content is rendered.)
This allows us to build scalable web-apps that are server rendered, whilst maintaining the dynamic asynchronous experience that Single Page Applications have enjoyed.

### \_hyperscript

[\_hyperscript](https://hyperscript.org/docs) is a small library that allows javascript to be executed on dom tags in a more functional way without writing scripts with code. This is useful for bits of dynamic UI e.g. multi-selecting rows of checkboxes.
