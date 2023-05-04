import { layouts } from "@src/layouts/routes";
import { LayoutFunction } from "./html";

function testPath(pathWithVariable: string, actualPath: string) {
  const variablePattern = /\/\[([^\]]+)\]/g;
  const pathWithRegex = pathWithVariable.replace(variablePattern, "/([^/]+)");
  const regex = new RegExp("^" + pathWithRegex + "$");
  return actualPath.match(regex);
}

export const htmxMiddleware: PagesFunction = async ({
  request,
  params,
  next,
}) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // ignore anything in assets or with an extension (e.g. /favicon.ico)
  if (pathname.startsWith("/assets") || pathname.match(/\.[^/]+$/)) {
    return next();
  }

  const response = await next();
  let text = await response.text();
  let rootPath = pathname.replace(/\/$/, "");
  while (true) {
    try {
      const key = Object.keys(layouts).find((routePath) =>
        testPath(routePath, rootPath + "/_layout")
      );
      const layoutModule: LayoutFunction = layouts[key!];
      text = await layoutModule({ children: text, request, params });
    } catch {
      // ignore
    }
    if (rootPath === "") {
      break;
    }
    rootPath = rootPath.replace(/\/[^/]+$/, "");
  }
  return new Response(text, response);
};
