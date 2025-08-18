jQuery("#add-to-cart").click(function () {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    100,
  );

  $("#cart-menu").addClass("animated shake");
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      simpleCart.add({
        name: this.dataset.name,
        price: this.dataset.price,
        number: this.dataset.id,
        image: this.dataset.image,
        type: this.dataset.type,
        subscription: this.dataset.subscription,
      });
    });
  });
});
