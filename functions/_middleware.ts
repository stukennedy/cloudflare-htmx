import RootLayout from '@src/layouts/RootLayout';
import { applyLayout } from '@src/lib/html';

export const onRequestGet = [applyLayout(RootLayout)];
