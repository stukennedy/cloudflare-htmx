import Toast from '@src/components/Toast';
import { htmlResponse } from '@src/lib/html';

export const onRequestPost: PagesFunction = async ({ request }) => {
  let response = htmlResponse(Toast('Successfully logged out'));
  const accessCookie = `sb-access-token=''; path=/; max-age=-1; SameSite=Lax;`;
  const refreshCookie = `sb-refresh-token=''; path=/; max-age=-1; SameSite=Lax;`;

  response.headers.append('Set-Cookie', accessCookie);
  response.headers.append('Set-Cookie', refreshCookie);
  response.headers.append('HX-Redirect', '/');
  return response;
};
