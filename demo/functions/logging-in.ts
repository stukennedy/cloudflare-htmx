import Spinner from '@components/Spinner';
import { html, htmlResponse } from '@lib/html';

export const onRequestGet: PagesFunction = async () =>
  htmlResponse(html`
    <div class="h-screen">${Spinner('Logging in ...')}</div>
  `);
