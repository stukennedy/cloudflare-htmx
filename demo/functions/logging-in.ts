import Spinner from '@components/Spinner';
import { html, view } from '@lib/html';

export const onRequestGet: PagesFunction = async () =>
  view(html` <div class="h-screen">${Spinner('Logging in ...')}</div> `);
