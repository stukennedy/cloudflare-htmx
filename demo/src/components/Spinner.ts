import { html } from '@lib/html';

export default (message: string) => html`
  <div class="w-full h-full">
    <div class="flex items-center justify-center">
      <div>
        <div class="text-3xl font-bold text-primary mb-4 mt-10">${message}</div>
        <div
          class="w-44 h-44 border-l-8 border-primary rounded-full animate-spin relative"
        ></div>
      </div>
    </div>
  </div>
`;
