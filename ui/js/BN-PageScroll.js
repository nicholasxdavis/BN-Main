  window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.querySelector(hash);
    if (!target) return;

    // Get the bounding rectangle of the target element
    const rect = target.getBoundingClientRect();

    // Check if the target is in the viewport (rough check)
    const isInView = (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );

    if (!isInView) {
      // Scroll smoothly to the element
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });