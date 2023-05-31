import { html, LayoutFunction } from '@lib/html';

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
      </body>
    </html>
  `;
};
export default _layout;
