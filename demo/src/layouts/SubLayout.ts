import { html, LayoutFunction } from '@lib/html';

// this is the layout for all pages inside the [paramId] folder and its subfolders
const _layout: LayoutFunction = ({ children, request }) => {
  return html`
    <h1 class="text-2xl text-primary">Sub-page layout</h1>
    ${children}
  `;
};
export default _layout;
