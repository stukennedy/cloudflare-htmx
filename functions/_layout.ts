import NavBar from "@src/components/NavBar";
const html = String.raw;

// this is the layout for the entire site
export const onRequestGet: PagesFunction = () => {
  const title = "Cloudflare Pages + HTMX + Hyperscript";
  return new Response(html`
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
      <body class="bg-base-300">
        ${NavBar()} {{children}}
      </body>
    </html>
  `);
};
