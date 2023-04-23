const html = String.raw;

// this is the layout for all pages inside the [paramId] folder and its subfolders
export const onRequestGet: PagesFunction = ({ request }) => {
  return new Response(html`
    <h1 class="text-2xl text-primary">Sub-page layout</h1>
    {{children}}
  `);
};
