import { html, htmlResponse } from "@src/lib/html";

/*
 * In this Navbar component, we want to add the "active" class to the
 * current link.
 * Because this component is used by the _layout.ts file, we can't use
 * the request object to get the current path (which will be a _layout path).
 * Instead, we'll use the location object, which is available in the browser.
 * To do this, we'll use the _hyperscript "on load" event to
 * check the current path and add the "active" class if the path matches.
 */
export default () => {
  const links = [
    { text: "Home", href: "/dashboard" },
    { text: "Page", href: "/dashboard/4" },
  ];
  return html` <div class="navbar bg-base-100">
    <div class="navbar-start">
      <a href="/" class="btn btn-ghost normal-case text-xl text-secondary"
        >Cloudflare/HTMX</a
      >
    </div>
    <div class="navbar-center">
      <ul class="menu menu-horizontal px-1">
        ${links
          .map(
            ({ text, href }) => html` <li>
              <a
                class="btn btn-ghost normal-case text-xl"
                href="${href}"
                _="on load if location.pathname == '${href}' add .active"
                >${text}</a
              >
            </li>`
          )
          .join("\n")}
      </ul>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item">8</span>
          </div>
        </label>
        <div
          tabindex="0"
          class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div class="card-body">
            <span class="font-bold text-lg">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="/assets/img/avatar-yancy.png" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a hx-post="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>`;
};
