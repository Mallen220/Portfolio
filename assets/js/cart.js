// Initialize SimpleCart
simpleCart({
  cartColumns: [
    { attr: "name", label: "Name" },
    { attr: "price", label: "Price", view: "currency" },
    { view: "decrement", label: false },
    { attr: "quantity", label: "Qty" },
    { view: "increment", label: false },
    { attr: "total", label: "SubTotal", view: "currency" },
    { view: "remove", text: "Remove", label: false },
  ],
  cartStyle: "table", // This will be overridden by our custom rendering
  checkout: {
    type: "PayPal",
    email: "you@yours.com",
  },
});

// Custom cart rendering function
function renderCart() {
  const cartItemsContainer = document.querySelector(".simpleCart_items");

  // Clear existing items
  cartItemsContainer.innerHTML = "";

  // If cart is empty, show empty message
  if (simpleCart.quantity() === 0) {
    cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any items to your cart yet</p>
                        <a href="#" class="continue-shopping">Continue Shopping</a>
                    </div>
                `;
    return;
  }

  // Render each cart item
  simpleCart.each(function (item) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    // Determine badge classes based on product type
    const typeBadge =
      item.get("type") === "physical"
        ? '<span class="physical"><i class="fas fa-box"></i> Physical</span>'
        : '<span class="digital"><i class="fas fa-download"></i> Digital</span>';

    const subscriptionBadge =
      item.get("subscription") === "true"
        ? '<span class="subscription"><i class="fas fa-sync-alt"></i> Subscription</span>'
        : "";

    cartItem.innerHTML = `
                    <div class="item-image">
                        <img src="${item.get("image")}" alt="${item.get("name")}">
                    </div>
                    <div class="item-details">
                        <div class="item-name">${item.get("name")}</div>
                        <div class="item-price">$${parseFloat(item.get("price")).toFixed(2)}</div>
                        <div class="item-meta">
                            ${typeBadge}
                            ${subscriptionBadge}
                        </div>
                        <div class="item-quantity">
                            <button class="quantity-btn item_decrement">-</button>
                            <input type="text" class="quantity-input" value="${item.get("quantity")}" readonly>
                            <button class="quantity-btn item_increment">+</button>
                            <span class="item-remove item_remove"><i class="fas fa-trash"></i></span>
                        </div>
                    </div>
                `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Add event listeners to newly created elements
  document.querySelectorAll(".item_increment").forEach((button) => {
    button.addEventListener("click", function () {
      const item = this.closest(".cart-item");
      // In a real implementation, we would find the actual item in the cart
      // For demo, we'll just update the quantity display
      const input = item.querySelector(".quantity-input");
      input.value = parseInt(input.value) + 1;
      updateTotals();
    });
  });

  document.querySelectorAll(".item_decrement").forEach((button) => {
    button.addEventListener("click", function () {
      const item = this.closest(".cart-item");
      const input = item.querySelector(".quantity-input");
      if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        updateTotals();
      }
    });
  });

  document.querySelectorAll(".item_remove").forEach((button) => {
    button.addEventListener("click", function () {
      const item = this.closest(".cart-item");
      item.remove();
      updateTotals();
      // If no items left, show empty cart message
      if (document.querySelectorAll(".cart-item").length === 0) {
        renderCart();
      }
    });
  });
}

// Function to update totals (for demo purposes)
function updateTotals() {
  let subtotal = 0;
  let itemCount = 0;

  document.querySelectorAll(".cart-item").forEach((item) => {
    const price = parseFloat(
      item.querySelector(".item-price").textContent.replace("$", ""),
    );
    const quantity = parseInt(item.querySelector(".quantity-input").value);
    subtotal += price * quantity;
    itemCount += quantity;
  });

  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  document.querySelector(".simpleCart_quantity").textContent = itemCount;
  document.querySelector(".simpleCart_total").textContent =
    "$" + subtotal.toFixed(2);
  document.querySelector(".simpleCart_grandTotal").textContent =
    "$" + total.toFixed(2);

  // Update shipping and tax in summary
  document
    .querySelectorAll(".summary-row")[1]
    .querySelector(".summary-value").textContent = "$" + shipping.toFixed(2);
  document
    .querySelectorAll(".summary-row")[2]
    .querySelector(".summary-value").textContent = "$" + tax.toFixed(2);
}

// Function to add sample items to the cart
function addSampleItems() {
  const items = [
    {
      name: "Premium Wireless Headphones",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "physical",
      subscription: false,
    },
    {
      name: "Professional Photo Editing Software",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "digital",
      subscription: true,
    },
    {
      name: "Designer Sunglasses",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      type: "physical",
      subscription: false,
    },
  ];

  // Add items to the cart (in a real implementation, this would be done with simpleCart.add)
  setTimeout(() => {
    renderCart();
    updateTotals();
  }, 500);
}

// Initialize the cart with sample items
document.addEventListener("DOMContentLoaded", function () {
  // Add sample items after a short delay to simulate loading
  setTimeout(addSampleItems, 300);

  // Add coupon functionality
  document
    .querySelector(".coupon-input button")
    .addEventListener("click", function () {
      const couponInput = document.querySelector(".coupon-input input");
      if (couponInput.value.toLowerCase() === "save10") {
        alert("Coupon applied! 10% discount added.");
      } else {
        alert("Invalid coupon code");
      }
      couponInput.value = "";
    });

  // Checkout button
  document
    .querySelector(".checkout-btn")
    .addEventListener("click", function () {
      alert("Proceeding to checkout...");
    });
});
