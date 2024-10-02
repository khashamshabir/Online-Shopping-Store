document.addEventListener("DOMContentLoaded", function () {
  const cart = [];
  const cartCountElement = document.getElementById('cart-count');
  const cartItemsElement = document.getElementById('cart-items');

  // Function to update cart count and cart items
  function updateCart() {
      cartCountElement.textContent = cart.length;
      cartItemsElement.innerHTML = '';

      if (cart.length === 0) {
          cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
      } else {
          cart.forEach((item, index) => {
              const cartItem = document.createElement('div');
              cartItem.innerHTML = `
                  <p>${item.name} - $${item.price}</p>
                  <button class="remove-from-cart" data-index="${index}">Remove</button>
              `;
              cartItemsElement.appendChild(cartItem);
          });
      }
  }

  // Event listener for adding products to the cart
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function () {
          const productId = this.dataset.productId;
          const productName = this.dataset.productName;
          const productPrice = this.dataset.productPrice;

          // Add product to cart
          cart.push({
              id: productId,
              name: productName,
              price: productPrice
          });

          // Update cart display
          updateCart();
      });
  });

  // Event listener for removing items from the cart
  cartItemsElement.addEventListener('click', function (event) {
      if (event.target.classList.contains('remove-from-cart')) {
          const index = event.target.dataset.index;
          cart.splice(index, 1);  // Remove the item from cart
          updateCart();  // Update cart after removal
      }
  });

  // Toggle cart display on click
  document.querySelector('.cart').addEventListener('click', function () {
      cartItemsElement.style.display = cartItemsElement.style.display === 'block' ? 'none' : 'block';
  });

  // Initialize cart on page load
  updateCart();
});
