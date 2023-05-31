import DashLayout from '@layouts/DashLayout';
import { authConfig } from '@lib/constants';
import { applyLayout } from '@lib/html';
import { middlewareGuard } from 'cloudflare-auth';

export const onRequestGet = [
  middlewareGuard(authConfig),
  applyLayout(DashLayout),
];
