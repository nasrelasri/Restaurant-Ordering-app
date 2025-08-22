import menuArray from "./data.js";

// Render MenuItems

const menuItemsContainer = document.getElementById("menu-items");
const menuItemsHTML = menuArray
  .map(function (item) {
    return `<article class="menu-item" role="listitem">
              <span role="img" aria-label="${item.name}">${item.emoji}</span>
              <div class="menu-item-details">
                <h3 class="menu-item-name">${item.name}</h3>
                <p class="menu-item-ingredients">${item.ingredients}</p>
                <p class="menu-item-price">$${item.price}</p>
              </div>
              <button id="menu-item-add-btn" class="menu-item-add-btn" data-add="${item.id}">+</button>
            </article>`;
  })
  .join("");
menuItemsContainer.innerHTML = menuItemsHTML;

// Handle clicks

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddBtn(e.target.dataset.add);

  } else if (e.target.dataset.remove) {
    handleRemoveBtn(e.target.dataset.remove);

  } else if (e.target.id === "complete-order-btn") {
    document.getElementById("complete-order-popup").classList.remove("hidden");

  } else if (e.target.id === "pay-btn") {
    e.preventDefault();
    document.getElementById("order-section").innerHTML = `
      <p class="thank-you-msg">Thanks! Your order is on its way!</p>
    `;
    document.getElementById("complete-order-popup").classList.add("hidden");

  } else if (
    document.getElementById("complete-order-popup") &&
    !document.getElementById("complete-order-popup").classList.contains("hidden") &&
    !document.getElementById("complete-order-popup").contains(e.target)
  ) {
    document.getElementById("complete-order-popup").classList.add("hidden");
  }
});

const handleAddBtn = function (itemId) {
  document.getElementById("order-section").classList.remove("hidden");

  const targetItem = menuArray.filter (function(item) {
    return item.id === Number(itemId);
    })[0]

    const orderItems = document.getElementById("order-items");
    orderItems.innerHTML += `
    <div class="order-item" role="listitem">
      <span>${targetItem.name}</span>
      <button class="remove-btn" data-remove="${targetItem.id}">remove</button>
      <span class="order-item-price">$${targetItem.price}</span>
    </div>`;

    console.log(targetItem.id);

    const totalPrice = document.getElementById("total-amount");
    const currentTotalPrice = Number(totalPrice.textContent.slice(1));
    const newTotalPrice = currentTotalPrice + targetItem.price;
    totalPrice.textContent = `$${newTotalPrice}`;
};

const handleRemoveBtn = function(itemId) {
  const orderItems = document.getElementById("order-items");

  const orderItemToRemove = orderItems.querySelector(`button[data-remove="${itemId}"]`);
  
  if (orderItemToRemove) {
    const itemPrice = Number(orderItemToRemove.nextElementSibling.textContent.slice(1));
    const totalPrice = document.getElementById("total-amount");
    const currentTotalPrice = Number(totalPrice.textContent.slice(1));
    const newTotalPrice = currentTotalPrice - itemPrice;
    totalPrice.textContent = `$${newTotalPrice}`;
    
    orderItemToRemove.parentElement.remove();
  }

  // Hide order section if no items remain
  if (orderItems.children.length === 0) {
    document.getElementById("order-section").classList.add("hidden");
    document.getElementById("total-amount").textContent = "$0";
  }
}

