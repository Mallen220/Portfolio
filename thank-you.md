---
title: Thank You
layout: default
---

<div class="container text-center">
  <br><br>
  <h1><i class="fas fa-check-circle" style="color: #28a745;"></i> Thank You!</h1>
  <p>Your order inquiry has been received.</p>
  <p>We will review your order and contact you shortly with payment and shipping details.</p>
  <br>
  <a href="/" class="btn btn-primary">Return Home</a>
</div>

<script>
  // Clear the cart after successful order
  try {
    localStorage.removeItem("simpleCart_items");
    localStorage.removeItem("shipping_address");
  } catch (e) {
    console.error("Could not clear cart", e);
  }
</script>
