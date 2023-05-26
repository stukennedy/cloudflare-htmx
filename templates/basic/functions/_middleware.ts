import { applyLayout } from 'cloudflare-htmx';
import RootLayout from '@src/layouts/RootLayout';

export const onRequestGet = [applyLayout(RootLayout)];
