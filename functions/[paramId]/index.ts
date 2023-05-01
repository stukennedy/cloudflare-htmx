const html = String.raw;

export const onRequestPost: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  return new Response(html`<div class="mockup-code text-left">
    <pre data-prefix=">" class="text-accent w-48"><code>${url}</code></pre>
    <pre data-prefix="$"><code>npm i daisyui</code></pre>
    <pre data-prefix=">" class="text-warning"><code>installing...</code></pre>
    <pre data-prefix=">" class="text-success"><code>Done!</code></pre>
  </div>`);
};

export const onRequestGet: PagesFunction = async ({ params }) => {
  return new Response(html` <div class="h-screen p-10 text-center">
    <div class="mockup-phone border-primary">
      <div class="camera"></div>
      <div class="display">
        <div class="artboard artboard-demo phone-1">
          <div
            class="btn btn-primary"
            hx-post="/${params.paramId}/"
            hx-swap="outerHTML"
          >
            Get content
          </div>
        </div>
      </div>
    </div>
  </div>`);
};
