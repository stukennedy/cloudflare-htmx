const HEADERS = { headers: { "content-type": "text/html;charset=UTF-8" } };

export const html = String.raw;
export const htmlResponse = (dom: string) => new Response(dom, HEADERS);
export interface LayoutFunction {
  (props: { children: string; request?: Request; params?: Params<any> }):
    | string
    | Promise<string>;
}
