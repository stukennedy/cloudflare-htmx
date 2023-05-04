import { html, htmlResponse } from '@src/lib/html';

export default (redirectTo: string) => html`
  <script>
    (async () => {
      const hashParams = {};
      let e;
      const a = /\\+/g; // Regex for replacing addition symbol with a space
      const r = /([^&;=]+)=?([^&;]*)/g;
      const d = (s) => decodeURIComponent(s.replace(a, ' '));
      const q = window.location.hash.substring(1);
      while ((e = r.exec(q))) {
        hashParams[d(e[1])] = d(e[2]);
      }

      if (hashParams.access_token) {
        const maxAge = 100 * 365 * 24 * 60 * 60;
        document.cookie =
          'sb-access-token=' +
          hashParams.access_token +
          '; path=/; max-age=' +
          maxAge +
          '; SameSite=Lax; secure';
        document.cookie =
          'sb-refresh-token=' +
          hashParams.refresh_token +
          '; path=/; max-age=' +
          maxAge +
          '; SameSite=Lax; secure';
        await fetch('/', {
          method: 'GET',
          credentials: 'same-origin',
        });
        window.location = '${redirectTo}';
      }
    })();
  </script>
`;
