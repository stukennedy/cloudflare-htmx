const HEADERS = { headers: { 'content-type': 'text/html;charset=UTF-8' } };

export const html = String.raw;
export const view = (...domArgs: string[]) =>
  new Response(domArgs.join('\n'), HEADERS);
export const redirect = (url: string, status = 303) =>
  new Response(null, { status, headers: { 'HX-Redirect': url } });

export type LayoutFunction<Env = any, Params extends string = any> = ({
  children,
  request,
  params,
  env,
}: {
  children: string;
  request?: Request;
  params?: Params;
  env?: Env;
}) => string | Promise<string>;

export const applyLayout =
  (layout: LayoutFunction, isRoot: boolean): PagesFunction =>
  async ({ request, env, params, next }) => {
    const url = new URL(request.url);
    const method = request.method;
    if (
      url.pathname.match(/\.[^/]+$/) ||
      method !== 'GET' ||
      url.pathname.match(/_[^/]+$/) ||
      (isRoot && request.headers.get('HX-Boosted') === 'true')
    ) {
      return next();
    }

    const response = await next();
    const children = await response.text();
    if (response.ok) {
      return new Response(
        await layout({ children, request, params, env }),
        response
      );
    } else {
      return new Response('NOT FOUND', response);
    }
  };
