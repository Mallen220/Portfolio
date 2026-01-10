document.addEventListener("DOMContentLoaded", function () {
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
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
});
