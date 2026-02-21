// ═══════════════════════════════════════════════════════════════════════════
// IRON HARVEST — SPA-style navigation via fetch + history.pushState
// Shared across index.html, ledger.html, guide.html
// ═══════════════════════════════════════════════════════════════════════════
(function() {

  // Fade the page out, load new URL, swap body, fade back in
  async function navigate(url) {
    // Don't navigate to the current page
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const target  = url.split('/').pop() || 'index.html';
    if (current === target) return;

    // Fade out
    document.body.style.transition = 'opacity 0.25s ease';
    document.body.style.opacity    = '0';

    await new Promise(r => setTimeout(r, 260));

    try {
      const resp = await fetch(url);
      const html  = await resp.text();

      // Parse the fetched document
      const parser  = new DOMParser();
      const newDoc  = parser.parseFromString(html, 'text/html');

      // Swap <title>
      document.title = newDoc.title;

      // Swap <body> contents
      document.body.innerHTML = newDoc.body.innerHTML;

      // Copy new body attributes (e.g. class="locked")
      document.body.className = newDoc.body.className;

      // Re-run any inline <script> tags in the new body
      document.body.querySelectorAll('script').forEach(oldScript => {
        const s = document.createElement('script');
        if (oldScript.src) {
          s.src   = oldScript.src;
          s.async = false;
        } else {
          s.textContent = oldScript.textContent;
        }
        oldScript.replaceWith(s);
      });

      // Push new URL into the address bar
      history.pushState({ url }, newDoc.title, url);

    } catch (e) {
      // Fallback to normal navigation on any fetch error
      window.location.href = url;
      return;
    }

    // Fade back in
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity    = '1';
      });
    });
  }

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    const url = e.state?.url || window.location.href;
    navigate(url);
  });

  // Expose globally
  window.navigate = navigate;

})();
