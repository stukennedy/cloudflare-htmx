import { authConfig } from '@lib/constants';
import { logout } from 'cloudflare-auth';

export const onRequestPost: PagesFunction = async ({ request }) => {
  return logout(authConfig, new URL(request.url));
};
