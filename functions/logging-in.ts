import Spinner from "@src/components/Spinner";
import { html, htmlResponse } from "@src/lib/html";

export const onRequestGet: PagesFunction = async () =>
  htmlResponse(html`
    <div class="h-screen">${Spinner("Logging in ...")}</div>
  `);
