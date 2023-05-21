import SubLayout from '@src/layouts/SubLayout';
import { applyLayout } from '@src/lib/html';

export const onRequestGet = [applyLayout(SubLayout)];
