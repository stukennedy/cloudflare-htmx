import NavBar from "@src/components/NavBar";
import { LayoutFunction, html } from "@src/lib/html";

const _layout: LayoutFunction = async ({ children }) => {
  return html`${NavBar()} ${children} `;
};
export default _layout;
