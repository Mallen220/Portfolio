// Only define Cart if it doesn't exist
if (typeof Cart === "undefined") {
  const Cart = {
    // Get cart items from localStorage
    get() {
      return JSON.parse(localStorage.getItem("cart")) || [];
    },

    // Save cart items to localStorage
    save(items) {
      localStorage.setItem("cart", JSON.stringify(items));
      this.updateCartCount();
    },

    // Add item to cart
    add(item) {
      const cartItems = this.get();
      const existingItem = cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({ ...item, id: item.identifier, quantity: 1 });
      }

      this.save(cartItems);
    },

    // Update item quantity
    update(itemId, quantity) {
      if (quantity < 1) return this.remove(itemId);

      const cartItems = this.get();
      const item = cartItems.find((i) => i.id === itemId);

      if (item) {
        item.quantity = quantity;
        this.save(cartItems);
      }
    },

    // Remove item from cart
    remove(itemId) {
      const cartItems = this.get().filter((i) => i.id !== itemId);
      this.save(cartItems);
    },

    // Clear cart
    clear() {
      this.save([]);
    },

    // Update cart count indicator
    updateCartCount() {
      const count = this.get().reduce((sum, item) => sum + item.quantity, 0);
      document.querySelectorAll(".cart-count").forEach((el) => {
        el.textContent = count;
      });
    },

    // Check if cart requires shipping
    needsShipping() {
      return this.get().some((item) => item.type === "physical");
    },

    // Initialize cart
    init() {
      this.updateCartCount();

      // Add to cart button handler
      document.addEventListener("click", (e) => {
        if (e.target.closest(".add-to-cart")) {
          const button = e.target.closest(".add-to-cart");
          const item = {
            identifier: button.dataset.id,
            name: button.dataset.name,
            price: button.dataset.price,
            image: button.dataset.image,
            type: button.dataset.type,
            subscription: button.dataset.subscription === "true",
          };
          this.add(item);
        }
      });
    },
  };

  // Initialize on DOM load
  document.addEventListener("DOMContentLoaded", () => Cart.init());
}
