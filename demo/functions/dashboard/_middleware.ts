import DashLayout from '@layouts/DashLayout';
import { applyLayout } from '@lib/html';
import { middlewareGuard } from 'cloudflare-auth';

export const onRequest = [middlewareGuard, applyLayout(DashLayout, false)];
