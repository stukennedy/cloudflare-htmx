import SubLayout from '@layouts/SubLayout';
import { applyLayout } from '@lib/html';

export const onRequestGet = [applyLayout(SubLayout)];
