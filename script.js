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
        <button class="remove-btn">remove</button>
        <span class="order-item-price">$${targetItem.price}</span>
    </div>`;

    const totalPrice = document.getElementById("total-amount");
    const currentTotalPrice = Number(totalPrice.textContent.slice(1));
    const newTotalPrice = currentTotalPrice + targetItem.price;
    totalPrice.textContent = `$${newTotalPrice}`;
};
