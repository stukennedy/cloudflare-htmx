const html = String.raw;

type Item = {
  name: string;
  avatar: string;
  country: string;
  company: string;
  color: string;
  job: string;
};

// an array of null items is used to show the loading state
export default (items: Item[] | null[]) => {
  return html`
    <h2 class="text-2xl text-primary mb-2">
      Using _hyperscript to do multi-select
    </h2>
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  _="on click set .cb-child.checked to my.checked"
                />
              </label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map((item) =>
              item
                ? html`
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" class="checkbox cb-child" />
                        </label>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                              <img
                                src="${item.avatar}"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div class="font-bold">${item.name}</div>
                            <div class="text-sm opacity-50">
                              ${item.country}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${item.company}
                        <br />
                        <span class="badge badge-ghost badge-sm"
                          >${item.job}</span
                        >
                      </td>
                      <td>${item.color}</td>
                      <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                      </th>
                    </tr>
                  `
                : html`
                    <tr class="h-20">
                      <th class="animate-pulse bg-slate-600"></th>
                      <td class="animate-pulse bg-slate-600"></td>
                      <td class="animate-pulse bg-slate-600"></td>
                      <td class="animate-pulse bg-slate-600"></td>
                      <th class="animate-pulse bg-slate-600"></th>
                    </tr>
                  `
            )
            .join("\n")}
        </tbody>
        <!-- foot -->
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
};
