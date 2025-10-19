console.log("add-to-cart.js loaded"); // Debug: check for duplicate script loading

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    // Prevent attaching multiple handlers
    if (button.dataset.cartHandlerAttached) return;
    button.dataset.cartHandlerAttached = "true";

    button.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Add to Cart clicked");
      // Add shake animation
      button.classList.remove("shake");
      void button.offsetWidth;
      button.classList.add("shake");
      setTimeout(() => button.classList.remove("shake"), 500);
      // Get quantity input value (default to 1 if not found or invalid)
      let quantity = 1;
      // Try to find a quantity input near the button
      let container =
        button.closest(
          ".product-detail, .product-details-section, form, .product-detail-container",
        ) || document;
      let quantityInput = container.querySelector(".quantity-input");
      if (quantityInput) {
        let val = parseInt(quantityInput.value);
        if (!isNaN(val) && val > 0) quantity = val;
      }
      // Add to cart with quantity (if supported by simpleCart)
      simpleCart.add({
        name: this.dataset.name,
        price: this.dataset.price,
        number: this.dataset.id,
        image: this.dataset.image,
        type: this.dataset.type,
        weight_oz: this.dataset.weight_oz,
        subscription: this.dataset.subscription,
        quantity: quantity,
      });
      // Notification animation
      const notification = document.createElement("div");
      notification.innerHTML = `
        <div class="cart-notification">
          <i class="fas fa-check-circle"></i>
          <div>
            <div class="notification-title">Added to cart!</div>
            <div class="notification-detail">${quantity} x ${this.dataset.name}</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease forwards";
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, 2000);
    });
  });
});

// Add CSS for notification if not already present
if (!document.getElementById("cart-notification-style")) {
  const style = document.createElement("style");
  style.id = "cart-notification-style";
  style.textContent = `
    .cart-notification {
      position: fixed;
      top: 80px;
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
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
