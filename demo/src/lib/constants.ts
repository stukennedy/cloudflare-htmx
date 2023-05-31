import { AuthConfig } from 'cloudflare-auth';

export const authConfig: AuthConfig = {
  secretKey: 'this_is_your_secretKey',
  issuer: 'urn:continuata:issuer',
  audience: 'urn:continuata:audience',
  expiry: '2h',
  cookieName: 'cf-auth-token',
  redirectTo: '/dashboard/',
  loginPath: '/',
};
