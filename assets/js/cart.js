// Show loading state
document.addEventListener("DOMContentLoaded", function () {
  const loadingOverlay = document.getElementById("loading-overlay");

  // Simulate loading delay for demo purposes
  setTimeout(() => {
    generateCartItems();
    loadingOverlay.style.opacity = "0";
    loadingOverlay.style.visibility = "hidden";
  }, 800);
});

// Function to show notification
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Function to generate cart items from localStorage
function generateCartItems() {
  const container = document.getElementById("cart-items-container");
  const cartData = getCartData();
  const items = Object.values(cartData);

  if (items.length === 0) {
    container.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any items to your cart yet</p>
                        <a href="#" class="continue-shopping">Continue Shopping</a>
                    </div>
                `;
    updateCartTotals();
    return;
  }

  container.innerHTML = "";

  items.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.style.animationDelay = `${index * 0.1}s`;
    itemElement.innerHTML = `
                    <div class="item-image">
                        <img style="width: 100%" src="${item.image || "https://via.placeholder.com/120?text=Product"}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <div class="item-header">
                            <div class="item-name">${item.name}</div>
                            <div class="item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <div class="item-meta">
                            SKU: ${item.number} • Type: ${item.type}
                        </div>
                        <div class="item-footer">
                            <div class="quantity-controls">
                                <button class="quantity-btn"><i class="fas fa-minus"></i></button>
                                <input type="text" class="quantity-input" value="${item.quantity}">
                                <button class="quantity-btn"><i class="fas fa-plus"></i></button>
                            </div>
                            <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                            <button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash"></i> Remove</button>
                        </div>
                    </div>
                `;
    container.appendChild(itemElement);
  });

  // Update cart totals
  updateCartTotals();

  // Add event listeners to new elements
  initCartInteractions();
}

// Get cart data from localStorage
function getCartData() {
  try {
    const cartData = localStorage.getItem("simpleCart_items");
    if (!cartData) return {};

    // Parse the data - it's stored as a JSON string of an object
    return JSON.parse(cartData);
  } catch (error) {
    console.error("Error parsing cart data:", error);
    showNotification("Error loading cart data");
    return {};
  }
}

// Initialize cart interactions
function initCartInteractions() {
  // Use event delegation on the container so we don’t re-bind endlessly
  const container = document.getElementById("cart-items-container");
  if (!container) return;

  // Clear existing listeners by cloning
  const newContainer = container.cloneNode(true);
  container.parentNode.replaceChild(newContainer, container);

  newContainer.addEventListener("click", function (e) {
    // Minus
    if (e.target.closest(".quantity-btn")?.querySelector(".fa-minus")) {
      const cartItem = e.target.closest(".cart-item");
      changeItemQuantity(cartItem, -1);
    }

    // Plus
    if (e.target.closest(".quantity-btn")?.querySelector(".fa-plus")) {
      const cartItem = e.target.closest(".cart-item");
      changeItemQuantity(cartItem, 1);
    }

    // Remove
    if (e.target.closest(".remove-btn")) {
      const itemId = e.target.closest(".remove-btn").dataset.id;
      removeItemFromCart(itemId);
    }
  });

  // Handle manual edits in quantity input
  newContainer.addEventListener("change", function (e) {
    if (e.target.classList.contains("quantity-input")) {
      const cartItem = e.target.closest(".cart-item");
      const qty = parseInt(e.target.value, 10) || 1;
      setItemQuantity(cartItem, qty);
    }
  });
}

function changeItemQuantity(cartItem, delta) {
  const input = cartItem.querySelector(".quantity-input");
  let qty = parseInt(input.value, 10) || 1;
  qty = Math.max(1, qty + delta);
  setItemQuantity(cartItem, qty);
}

function setItemQuantity(cartItem, qty) {
  const itemId = cartItem.querySelector(".remove-btn").dataset.id;
  const cartData = getCartData();

  if (cartData[itemId]) {
    cartData[itemId].quantity = qty;
    localStorage.setItem("simpleCart_items", JSON.stringify(cartData));
  }

  // Update UI
  cartItem.querySelector(".quantity-input").value = qty;
  updateItemTotal(cartItem);
  updateCartTotals();
}

// Remove item from cart
function removeItemFromCart(itemId) {
  const cartData = getCartData();

  if (cartData[itemId]) {
    delete cartData[itemId];
    localStorage.setItem("simpleCart_items", JSON.stringify(cartData));
    showNotification("Item removed from cart!");
    generateCartItems();
  }
}

// Update item total
function updateItemTotal(item) {
  const price = parseFloat(
    item.querySelector(".item-price").textContent.replace("$", ""),
  );
  const quantity = parseInt(item.querySelector(".quantity-input").value);
  const totalElement = item.querySelector(".item-total");

  const total = price * quantity;
  totalElement.textContent = "$" + total.toFixed(2);
}

// Update cart totals
function updateCartTotals() {
  const cartData = getCartData();
  const items = Object.values(cartData);

  let subtotal = 0;
  let itemCount = 0;

  items.forEach((item) => {
    subtotal += item.price * item.quantity;
    itemCount += item.quantity;
  });

  const shipping = 5.99;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  // Update DOM elements
  document.getElementById("item-count").textContent = itemCount;
  document.getElementById("cart-subtotal").textContent =
    "$" + subtotal.toFixed(2);
  document.getElementById("cart-tax").textContent = "$" + tax.toFixed(2);
  document.getElementById("cart-total").textContent = "$" + total.toFixed(2);
}

// Initialize cart when page loads
function initializeCart() {
  generateCartItems();
}

// Set up test environment
function setupTestEnvironment() {
  // Clear localStorage for testing
  localStorage.clear();

  // Add test data to localStorage
  const testData = {
    "SCI-1": {
      quantity: 2,
      id: "SCI-1",
      price: 4,
      name: "Gavin the Tiger",
      number: "Gavin-the-Tiger",
      image:
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300",
      type: "physical",
      subscription: "false",
    },
    "SCI-2": {
      quantity: 1,
      id: "SCI-2",
      price: 8.99,
      name: "Elephant Plush Toy",
      number: "Elephant-Plush",
      image:
        "https://images.unsplash.com/photo-1564349683136-77e08dba69c2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300",
      type: "physical",
      subscription: "false",
    },
  };

  localStorage.setItem("simpleCart_items", JSON.stringify(testData));

  console.log("Test data loaded. Refresh the page to see your cart.");
}

// Uncomment to set up test environment
// setupTestEnvironment();

// Initialize the cart
initializeCart();
