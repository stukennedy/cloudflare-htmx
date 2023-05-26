import Stat from '@src/components/Stat';
import Table from '@src/components/Table';

import { html, htmlResponse } from '@src/lib/html';

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

// return the Table component with the items after 1 second
export const onRequestPost: PagesFunction = async () => {
  await timer(1000);
  const items = [
    {
      name: 'Hart Hagerty',
      country: 'United States',
      avatar: '/assets/img/avatar-hart.png',
      company: "Hart's Company",
      job: 'Desktop Support Technician',
      color: 'Purple',
    },
    {
      name: 'Brice Hagenes',
      country: 'China',
      avatar: '/assets/img/avatar-brice.png',
      company: 'Carroll Group',
      job: 'Senior Quality Engineer',
      color: 'Red',
    },
    {
      name: 'Lavada Hickle',
      country: 'Russia',
      avatar: '/assets/img/avatar-marjy.png',
      company: 'Hickle, Hickle and Hickle',
      job: 'Internal Intranet Assistant',
      color: 'Green',
    },
    {
      name: 'Loyce Hane',
      country: 'Brazil',
      avatar: '/assets/img/avatar-yancy.png',
      company: 'Wyman-Ledner',
      job: 'Dynamic Usability Consultant',
      color: 'Red',
    },
  ];
  return htmlResponse(Table(items));
};

// show the loading state of the Table component and trigger a POST request
export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  return htmlResponse(html`
    <div class="w-full h-screen p-10 text-center">
      <div class="text-2xl text-secondary mb-4">Cloudflare + HTMX</div>
      ${Stat()}
      <div class="mb-10"></div>
      <div hx-post="/dashboard" hx-trigger="load" class="w-full">
        ${Table([null, null, null, null])}
      </div>
    </div>
  `);
};
