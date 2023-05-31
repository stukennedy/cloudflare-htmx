import NavBar from '@components/NavBar';
import { LayoutFunction, html } from '@lib/html';

const _layout: LayoutFunction = async ({ children }) => {
  return html`${NavBar()} ${children} `;
};
export default _layout;
