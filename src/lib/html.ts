const HEADERS = { headers: { 'content-type': 'text/html;charset=UTF-8' } };

export const html = String.raw;
export const htmlResponse = (dom: string) => new Response(dom, HEADERS);
export interface LayoutFunction {
  (props: { children: string; request?: Request; params?: Params<any> }):
    | string
    | Promise<string>;
}

export const applyLayout =
  (layout: LayoutFunction): PagesFunction =>
  async ({ request, next }) => {
    const url = new URL(request.url);
    if (url.pathname.match(/\.[^/]+$/)) {
      return next();
    }

    const response = await next();
    const children = await response.text();
    if (response.ok) {
      return new Response(await layout({ children, request }), response);
    } else {
      return new Response('NOT FOUND', response);
    }
  };
