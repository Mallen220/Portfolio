document.addEventListener("DOMContentLoaded", function () {
  // Add to cart functionality
  document.querySelectorAll(".btn-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productName =
        productCard.querySelector(".product-title").textContent;
      const productPrice =
        productCard.querySelector(".product-price").textContent;

      // Create notification
      const notification = document.createElement("div");
      notification.innerHTML = `
        <div class="cart-notification">
          <i class="fas fa-check-circle"></i>
          <div>
            <div class="notification-title">Added to cart!</div>
            <div class="notification-detail">${productName} - ${productPrice}</div>
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
    });
  });

  // Wishlist functionality
  document.querySelectorAll(".btn-wishlist").forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.replace("far", "fas");
        icon.style.color = "#ff6b6b";

        // Add animation
        this.style.animation = "pulse 0.5s";
        setTimeout(() => {
          this.style.animation = "";
        }, 500);
      } else {
        icon.classList.replace("fas", "far");
        icon.style.color = "";
      }
    });
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
    }
    
    .cart-notification i {
      color: #4CAF50;
      font-size: 1.5rem;
      margin-right: 12px;
    }
    
    .notification-title {
      font-weight: 600;
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
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
});
