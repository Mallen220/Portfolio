document.addEventListener("DOMContentLoaded", function () {
  // Image thumbnail selection
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("main-image");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");

      // Update main image
      const newImage = this.getAttribute("data-image");
      mainImage.src = newImage;

      // Add animation effect
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.style.opacity = 1;
        mainImage.style.transition = "opacity 0.5s ease";
      }, 10);
    });
  });

  // Color option selection
  const colorOptions = document.querySelectorAll(".color-option");

  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all color options
      colorOptions.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked option
      this.classList.add("active");

      // Update product title with color
      const color = this.getAttribute("data-color");
      const title = document.querySelector(".product-title");
      title.textContent = `Professional DSLR Camera (${color.charAt(0).toUpperCase() + color.slice(1)})`;
    });
  });

  // Quantity selector
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");
  const quantityInput = document.querySelector(".quantity-input");

  minusBtn.addEventListener("click", function () {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
      quantityInput.value = value - 1;
    }
  });

  plusBtn.addEventListener("click", function () {
    let value = parseInt(quantityInput.value);
    if (value < 10) {
      quantityInput.value = value + 1;
    }
  });

  // Add to cart functionality
  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  addToCartBtn.addEventListener("click", function () {
    const productName = document.querySelector(".product-title").textContent;
    const quantity = parseInt(quantityInput.value);
    const selectedColor = document
      .querySelector(".color-option.active")
      .getAttribute("data-color");
    const sizeSelect = document.querySelector(".size-select");
    const selectedSize = sizeSelect.options[sizeSelect.selectedIndex].text;

    // Create notification
    const notification = document.createElement("div");
    notification.innerHTML = `
      <div class="cart-notification">
        <i class="fas fa-check-circle"></i>
        <div>
          <div class="notification-title">Added to cart!</div>
          <div class="notification-detail">${quantity} x ${productName}</div>
          <div class="notification-meta">${selectedColor}, ${selectedSize}</div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease forwards";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);

    // Button animation
    this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
    this.style.backgroundColor = "#4caf50";

    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
      this.style.backgroundColor = "";
    }, 2000);
  });

  // Wishlist functionality
  const wishlistBtn = document.querySelector(".wishlist-btn");

  wishlistBtn.addEventListener("click", function () {
    const icon = this.querySelector("i");
    if (icon.classList.contains("far")) {
      icon.classList.replace("far", "fas");
      icon.style.color = "#f72585";

      // Button animation
      this.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';

      // Add animation
      this.style.animation = "pulse 0.5s";
      setTimeout(() => {
        this.style.animation = "";
      }, 500);
    } else {
      icon.classList.replace("fas", "far");
      icon.style.color = "";
      this.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
    }
  });

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
    .cart-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 1000;
      display: flex;
      align-items: center;
      animation: slideIn 0.3s ease;
      max-width: 350px;
    }
    
    .cart-notification i {
      color: #4CAF50;
      font-size: 1.8rem;
      margin-right: 15px;
    }
    
    .notification-title {
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .notification-detail {
      font-size: 0.95rem;
      margin-top: 3px;
    }
    
    .notification-meta {
      font-size: 0.85rem;
      color: #666;
      margin-top: 3px;
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
});
