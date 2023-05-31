import { applyLayout } from 'cloudflare-htmx';
import RootLayout from '@layouts/RootLayout';

export const onRequestGet = [applyLayout(RootLayout)];
