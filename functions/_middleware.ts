const HEADERS = { headers: { "content-type": "text/html;charset=UTF-8" } };

export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.startsWith("/assets")) {
    return next();
  }

  const isLayoutRequest = pathname.endsWith("_layout");
  const response = await next();
  let text = await response.text();
  if (request.method === "GET" && !isLayoutRequest) {
    const layoutPaths = pathname.split("/").slice(0, -1);
    const layoutUrls = layoutPaths.reduce((acc, _, index) => {
      const layoutPath = layoutPaths.slice(0, index + 1).join("/") + "/_layout";
      const layoutUrl = url.origin + layoutPath;
      return [...acc, layoutUrl];
    }, [] as string[]);

    for (const layoutUrl of layoutUrls.reverse()) {
      const layoutResponse = await fetch(layoutUrl);
      if (layoutResponse.ok) {
        const layoutFunction = await layoutResponse.text();
        text =
          layoutFunction === ""
            ? text
            : layoutFunction.replace("{{children}}", text);
      }
    }
    return new Response(text, HEADERS);
  }
  return new Response(text, HEADERS);
};
