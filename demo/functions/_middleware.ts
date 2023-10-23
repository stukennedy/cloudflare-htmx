import RootLayout from '@layouts/RootLayout';
import { applyLayout } from '@lib/html';

export const onRequest = [applyLayout(RootLayout, true)];
