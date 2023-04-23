import Stat from "@src/components/Stat";
import Table from "@src/components/Table";

const html = String.raw;

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

// return the Table component with the items after 1 second
export const onRequestPost: PagesFunction = async () => {
  await timer(1000);
  const items = [
    {
      name: "Hart Hagerty",
      country: "United States",
      avatar: "/assets/img/avatar-hart.png",
      company: "Hart's Company",
      job: "Desktop Support Technician",
      color: "Purple",
    },
    {
      name: "Brice Hagenes",
      country: "China",
      avatar: "/assets/img/avatar-brice.png",
      company: "Carroll Group",
      job: "Senior Quality Engineer",
      color: "Red",
    },
    {
      name: "Lavada Hickle",
      country: "Russia",
      avatar: "/assets/img/avatar-marjy.png",
      company: "Hickle, Hickle and Hickle",
      job: "Internal Intranet Assistant",
      color: "Green",
    },
    {
      name: "Loyce Hane",
      country: "Brazil",
      avatar: "/assets/img/avatar-yancy.png",
      company: "Wyman-Ledner",
      job: "Dynamic Usability Consultant",
      color: "Red",
    },
  ];
  return new Response(Table(items));
};

// show the loading state of the Table component and trigger a POST request
export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  return new Response(html`
    <div class="w-full h-screen p-10 text-center">
      <div class="text-2xl text-secondary mb-4">Cloudflare + HTMX</div>
      ${Stat()}
      <div class="mb-10"></div>
      <div hx-post="#" hx-trigger="load" class="w-full">
        ${Table([null, null, null, null])}
      </div>
    </div>
  `);
};
