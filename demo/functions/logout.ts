import { Env, logout } from 'cloudflare-auth';

export const onRequestPost: PagesFunction<Env> = async ({ env }) => {
  return logout(env, '/');
};
