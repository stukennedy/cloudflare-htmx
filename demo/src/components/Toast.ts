import { html } from '@lib/html';

export default (
  message: string,
  alertClass = 'alert-success',
  remove = true
) => {
  return html`
    <div
      class="toast toast-end w-full md:w-76 mt-10"
      ${remove ? `_="on load wait 3s add .fadeOut wait 1s remove me"` : ''}
    >
      <div class="alert ${alertClass} justify-center">
        <span class="text-lg font-bold"> ${message} </span>
      </div>
    </div>
  `;
};
