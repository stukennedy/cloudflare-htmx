import { html, LayoutFunction } from 'cloudflare-htmx';

// this is the layout for the entire site
const _layout: LayoutFunction = ({ children }) => {
  const title = 'Cloudflare Pages + HTMX';
  return html`
    <!DOCTYPE html>
    <html lang="en" data-theme="mytheme">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <script src="/js/htmx.min.js"></script>
        <script src="/js/_hyperscript.min.js"></script>
        <link href="/css/main.css" rel="stylesheet" />
      </head>
      <body>
        ${children}
      </body>
    </html>
  `;
};
export default _layout;
