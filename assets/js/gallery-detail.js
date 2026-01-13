document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("gallery-masonry");
  const loader = document.getElementById("gallery-loader");
  const endMessage = document.getElementById("gallery-end");

  if (!grid || !galleryConfig) return;

  const { pictures, basePath, initialCount } = galleryConfig;
  let currentIndex = initialCount;
  const batchSize = 12;

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

      const item = document.createElement("div");
      item.className = "gallery-item"; // Wrapper compatible with lightbox.js

      const a = document.createElement("a");
      a.href = "#"; // Prevent navigation
      a.className = "gallery-link";
      a.setAttribute("data-src", `${basePath}/${pic.filename}`);
      a.setAttribute("data-original", `${basePath}/${pic.original}`);
      a.setAttribute("data-caption", caption);

      const img = document.createElement("img");
      img.src = `${basePath}/${pic.filename}`;
      img.alt = caption;
      img.loading = "lazy";
      img.className = "smooth-load";

      const overlay = document.createElement("div");
      overlay.className = "gallery-overlay";
      overlay.innerHTML = '<i class="fa fa-expand"></i>';

      a.appendChild(img);
      a.appendChild(overlay);
      item.appendChild(a);
      fragment.appendChild(item);
    }

    grid.appendChild(fragment);

    // Initialize smooth load for new images
    if (window.initImageLoader) {
      window.initImageLoader(grid);
    }

    currentIndex = endIndex;

    if (currentIndex >= pictures.length) {
      observer.disconnect();
      loader.style.display = "none";
      endMessage.style.display = "block";
    }
  }
});
