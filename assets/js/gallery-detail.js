document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("lightgallery");
  const loader = document.getElementById("gallery-loader");
  const endMessage = document.getElementById("gallery-end");

  if (!grid || !galleryConfig) return;

  const { pictures, basePath, initialCount } = galleryConfig;
  let currentIndex = initialCount;
  const batchSize = 12;
  let isLightGalleryInit = false;

  // Initialize LightGallery
  function initLightGallery() {
    if (window.jQuery && window.jQuery(grid).lightGallery) {
      window.jQuery(grid).lightGallery({
        selector: '.gallery-item',
        mode: 'lg-fade',
        download: true,
        zoom: true
      });
      isLightGalleryInit = true;
    }
  }

  // Initial init
  initLightGallery();

  // Infinite Scroll Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadMoreImages();
      }
    });
  }, { rootMargin: "200px" });

  if (pictures.length > initialCount) {
    loader.style.display = "block";
    observer.observe(loader);
  } else {
    endMessage.style.display = "block";
  }

  function loadMoreImages() {
    if (currentIndex >= pictures.length) {
      observer.disconnect();
      loader.style.display = "none";
      endMessage.style.display = "block";
      return;
    }

    const endIndex = Math.min(currentIndex + batchSize, pictures.length);
    const fragment = document.createDocumentFragment();

    for (let i = currentIndex; i < endIndex; i++) {
      const pic = pictures[i];
      const caption = pic.title || pic.filename;

      const a = document.createElement("a");
      a.href = `${basePath}/${pic.original}`;
      a.className = "gallery-item";
      a.setAttribute("data-sub-html", `<h4>${caption}</h4>`);

      const img = document.createElement("img");
      img.src = `${basePath}/${pic.filename}`; // Or use placeholder/lazy loading logic if desired
      img.alt = caption;
      img.loading = "lazy";
      img.className = "smooth-load";

      const overlay = document.createElement("div");
      overlay.className = "gallery-item-overlay";
      overlay.innerHTML = '<i class="fa fa-expand"></i>';

      a.appendChild(img);
      a.appendChild(overlay);
      fragment.appendChild(a);
    }

    grid.appendChild(fragment);

    // Initialize smooth load for new images
    if (window.initImageLoader) {
      window.initImageLoader(grid);
    }

    // Destroy and Re-init LightGallery to pick up new items
    if (window.jQuery && window.jQuery(grid).data('lightGallery')) {
       window.jQuery(grid).data('lightGallery').destroy(true);
    }
    initLightGallery();

    currentIndex = endIndex;

    if (currentIndex >= pictures.length) {
      observer.disconnect();
      loader.style.display = "none";
      endMessage.style.display = "block";
    }
  }
});
