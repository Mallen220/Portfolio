document.addEventListener("DOMContentLoaded", function () {
  // Create lightbox elements
  const lightbox = document.createElement("div");
  lightbox.className = "custom-lightbox";

  const lightboxContent = document.createElement("div");
  lightboxContent.className = "custom-lightbox-content";

  const counter = document.createElement("div");
  counter.className = "custom-lightbox-counter";

  const loader = document.createElement("div");
  loader.className = "custom-lightbox-loader";
  loader.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';

  const img = document.createElement("img");
  img.className = "custom-lightbox-img";

  const caption = document.createElement("div");
  caption.className = "custom-lightbox-caption";

  // Controls
  const controls = document.createElement("div");
  controls.className = "custom-lightbox-controls";

  const downloadBtn = document.createElement("button");
  downloadBtn.className = "custom-lightbox-btn";
  downloadBtn.id = "custom-lightbox-download";
  downloadBtn.title = "Download Original";
  downloadBtn.innerHTML = '<i class="fa fa-download"></i>';

  const closeBtn = document.createElement("button");
  closeBtn.className = "custom-lightbox-btn";
  closeBtn.id = "custom-lightbox-close";
  closeBtn.title = "Close (Esc)";
  closeBtn.innerHTML = '<i class="fa fa-times"></i>';

  controls.appendChild(downloadBtn);
  controls.appendChild(closeBtn);

  // Navigation
  const nav = document.createElement("div");
  nav.className = "custom-lightbox-nav";

  const prevBtn = document.createElement("button");
  prevBtn.className = "custom-nav-btn";
  prevBtn.id = "custom-lightbox-prev";
  prevBtn.title = "Previous (←)";
  prevBtn.innerHTML = '<i class="fa fa-chevron-left"></i>';

  const nextBtn = document.createElement("button");
  nextBtn.className = "custom-nav-btn";
  nextBtn.id = "custom-lightbox-next";
  nextBtn.title = "Next (→)";
  nextBtn.innerHTML = '<i class="fa fa-chevron-right"></i>';

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);

  // Zoom controls
  const zoomControls = document.createElement("div");
  zoomControls.className = "custom-lightbox-zoom-controls";

  const zoomOutBtn = document.createElement("button");
  zoomOutBtn.className = "custom-zoom-btn";
  zoomOutBtn.id = "custom-lightbox-zoom-out";
  zoomOutBtn.title = "Zoom Out (-)";
  zoomOutBtn.innerHTML = '<i class="fa fa-search-minus"></i>';

  const zoomResetBtn = document.createElement("button");
  zoomResetBtn.className = "custom-zoom-btn";
  zoomResetBtn.id = "custom-lightbox-zoom-reset";
  zoomResetBtn.title = "Reset Zoom (0)";
  zoomResetBtn.innerHTML = '<i class="fa fa-sync-alt"></i>';

  const zoomInBtn = document.createElement("button");
  zoomInBtn.className = "custom-zoom-btn";
  zoomInBtn.id = "custom-lightbox-zoom-in";
  zoomInBtn.title = "Zoom In (+)";
  zoomInBtn.innerHTML = '<i class="fa fa-search-plus"></i>';

  zoomControls.appendChild(zoomOutBtn);
  zoomControls.appendChild(zoomResetBtn);
  zoomControls.appendChild(zoomInBtn);

  // Assemble lightbox
  lightboxContent.appendChild(counter);
  lightboxContent.appendChild(loader);
  lightboxContent.appendChild(img);
  // lightboxContent.appendChild(caption);

  lightbox.appendChild(lightboxContent);
  lightbox.appendChild(controls);
  lightbox.appendChild(nav);
  lightbox.appendChild(zoomControls);

  document.body.appendChild(lightbox);

  // State variables
  let currentIndex = 0;
  let isOriginalLoaded = false;
  let currentZoom = 1;
  let isDragging = false;
  let startX,
    startY,
    translateX = 0,
    translateY = 0;
  let galleryItems = [];
  let dragStartTime = 0;

  // Track preloaded originals
  const preloadedOriginals = new Set();
  function refreshGalleryItems() {
    // Select all items that are compatible with this lightbox
    // We expect .gallery-item wrapper
    const newItemsList = Array.from(document.querySelectorAll(".gallery-item"));

    if (newItemsList.length > 0) {
      galleryItems = newItemsList;

      if (lightbox.classList.contains("active")) {
        counter.textContent = `${currentIndex + 1}/${galleryItems.length}`;
        const preloadStart = currentIndex;
        const preloadEnd = Math.min(galleryItems.length - 1, currentIndex + 5);
        preloadOriginalRange(preloadStart, preloadEnd);
      }
    }
  }

  // Preload original images
  function preloadOriginalImage(index) {
    if (
      index < 0 ||
      index >= galleryItems.length ||
      preloadedOriginals.has(index)
    )
      return;

    const item = galleryItems[index];
    const link = item.querySelector(".gallery-link");
    if (!link) return;
    const originalSrc = link.dataset.original;

    if (!originalSrc) return;

    // Create image to preload
    const preloadImg = new Image();
    preloadImg.src = originalSrc;
    preloadedOriginals.add(index);
  }

  // Preload a range of original images
  function preloadOriginalRange(startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
      preloadOriginalImage(i);
    }
  }

  // Initialize lightbox functionality
  function initLightbox() {
    // We bind to document body for delegation since items are dynamic
    document.body.addEventListener("click", function (e) {
      const galleryItem = e.target.closest(".gallery-item");

      if (galleryItem) {
        // Update items list just in case
        refreshGalleryItems();

        // Find index
        const index = galleryItems.indexOf(galleryItem);

        if (index > -1) {
             e.preventDefault();
             openLightbox(index);
        }
      }
    });

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", goToPrev);
    nextBtn.addEventListener("click", goToNext);
    downloadBtn.addEventListener("click", downloadOriginal);
    zoomInBtn.addEventListener("click", zoomIn);
    zoomOutBtn.addEventListener("click", zoomOut);
    zoomResetBtn.addEventListener("click", resetZoom);

    // Close when clicking on backdrop
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Mouse events for dragging
    img.addEventListener("mousedown", function (e) {
      if (currentZoom <= 1) return;

      e.preventDefault(); // Prevent default drag behavior
      isDragging = true;
      dragStartTime = Date.now();
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      img.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;

      // Only move if we're actually dragging (not just clicking)
      if (Date.now() - dragStartTime > 50) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
      }
    });

    document.addEventListener("mouseup", function (e) {
      if (!isDragging) return;

      isDragging = false;
      img.style.cursor = currentZoom > 1 ? "grab" : "default";

      // If it was just a click (not drag), close on background click
      if (Date.now() - dragStartTime < 200 && e.target === img) {
        closeLightbox();
      }
    });

    // Prevent image drag
    img.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });

    // Initial refresh
    refreshGalleryItems();
  }

  // Open lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    // Preload neighboring originals (3 back, 5 forward)
    const preloadStart = Math.max(0, currentIndex - 3);
    const preloadEnd = Math.min(galleryItems.length - 1, currentIndex + 5);
    preloadOriginalRange(preloadStart, preloadEnd);
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleKeyDown);
    resetImageState();
  }

  // Reset image state
  function resetImageState() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    isOriginalLoaded = false;
    applyTransform();
  }

  // Update lightbox content
  function updateLightbox() {
    const item = galleryItems[currentIndex];
    const link = item.querySelector(".gallery-link");
    if (!link) return;

    const src = link.dataset.src; // optimized src
    const originalSrc = link.dataset.original; // full res
    const captionText = link.dataset.caption || "";

    // Reset state
    resetImageState();

    // Show loader
    loader.style.display = "flex";
    img.style.display = "none";

    // Update counter
    counter.textContent = `${currentIndex + 1}/${galleryItems.length}`;

    // Update caption
    caption.textContent = captionText;

    // Load Image
    const imgObj = new Image();
    imgObj.onload = function () {
      img.src = this.src;
      img.style.display = "block";
      loader.style.display = "none";
    };
    // Use original if available, else src
    imgObj.src = originalSrc || src;

    // Preload current original
    if (originalSrc && !preloadedOriginals.has(currentIndex)) {
      const preloadImg = new Image();
      preloadImg.src = originalSrc;
      preloadedOriginals.add(currentIndex);
    }
  }

  function goToPrev() {
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();

    const preloadStart = Math.max(0, currentIndex - 3);
    const preloadEnd = Math.min(galleryItems.length - 1, currentIndex + 1);
    preloadOriginalRange(preloadStart, preloadEnd);
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();

    const preloadStart = Math.max(0, currentIndex - 1);
    const preloadEnd = Math.min(galleryItems.length - 1, currentIndex + 3);
    preloadOriginalRange(preloadStart, preloadEnd);
  }

  // Zoom functions
  function zoomIn() {
    if (currentZoom >= 5) return;

    currentZoom += 0.25;
    applyTransform();
  }

  function zoomOut() {
    // Prevent zooming too far out (min 20% of original)
    if (currentZoom <= 0.25) return;

    if (currentZoom <= 1) {
      currentZoom -= 0.125;
    } else {
      currentZoom -= 0.25;
    }
    applyTransform();

    // Reset position if zoomed out completely
    if (currentZoom <= 1) {
      translateX = 0;
      translateY = 0;
      applyTransform();
    }
  }

  function resetZoom() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

  function applyTransform() {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  }

  // Download original
  function downloadOriginal() {
    const item = galleryItems[currentIndex];
    const link = item.querySelector(".gallery-link");
    const originalSrc = link.dataset.original;
    const filename = originalSrc.split("/").pop();

    const downloadLink = document.createElement("a");
    downloadLink.href = originalSrc;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  // Handle keyboard events
  function handleKeyDown(e) {
    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        goToPrev();
        break;
      case "ArrowRight":
        goToNext();
        break;
      case "+":
      case "=":
        zoomIn();
        e.preventDefault(); // Prevent browser zoom
        break;
      case "-":
        zoomOut();
        e.preventDefault(); // Prevent browser zoom
        break;
      case "0":
        resetZoom();
        break;
      case "ArrowUp":
        if (currentZoom > 1) {
          translateY += 20;
          applyTransform();
        }
        break;
      case "ArrowDown":
        if (currentZoom > 1) {
          translateY -= 20;
          applyTransform();
        }
        break;
    }
  }

  // Initialize lightbox functionality
  initLightbox();
});
