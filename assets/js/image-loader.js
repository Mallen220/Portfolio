(function() {
  function initImageLoader(root = document) {
    const images = root.querySelectorAll("img.smooth-load");

    // IntersectionObserver for background images
    const observerOptions = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1
    };

    const bgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const bgUrl = element.dataset.bg;

          if (bgUrl) {
              const tempImage = new Image();
              tempImage.onload = () => {
                  element.style.backgroundImage = `url('${bgUrl}')`;
                  element.removeAttribute('data-bg');
                  element.classList.add("loaded");
              };
              tempImage.src = bgUrl;
              observer.unobserve(element);
          }
        }
      });
    }, observerOptions);

    // Handle regular images
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // Handle background images
    const bgElements = root.querySelectorAll('[data-bg]');
    bgElements.forEach(el => {
        if (!el.classList.contains('smooth-load')) {
             el.classList.add('smooth-load');
        }
        bgObserver.observe(el);
    });
  }

  // Expose init function globally for dynamic content
  window.initImageLoader = initImageLoader;

  // Initialize on DOMContentLoaded or immediately if already ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initImageLoader());
  } else {
    initImageLoader();
  }
})();
