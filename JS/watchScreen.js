const allProducts = document.querySelector(".cartProducts");
const watchScreen = document.querySelector(".watchScreen");
const watchScreenItem = document.querySelector(".watchScreenItem");
const watchScreenItemDiv = document.querySelector(".watchScreenItem div");
const productsInCarts = localStorage.getItem("productsInCart");
const badge = document.querySelector(".badge");
const TotalPrice = document.querySelector(".TotalPrice")
const favTitle = document.querySelector(".favTitle")
const allFavouriteProducts = document.querySelector(".favouriteProducts");

let products = JSON.parse(localStorage.getItem("products")) || [];

if (productsInCarts) {
  let item = JSON.parse(productsInCarts);
  setChoosenItems(item);
}

let addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];


if(addedItem) updatedCart()

function setChoosenItems(products) {
  let y = products
    .map((item) => {
      return `<div class="cartProductItem">
                <img src="${item.imageUrl}" alt="">
                <div class="cartProductInfo">
                    <h3 class="bookName">${item.tittle}</h3>
                    <p class="bookCategory">Category:  ${item.category}</p>
                    <p class="bookRate">price: ${item.rate} EGP</p>
                    <div class="cartProductIcon">
                    <button class="decrease" onClick="decreaseItem(${item.id} , event)">-</button>
                    <p>${item.quantity}</p>
                    <button class="increase" onClick="increaseItem(${item.id} , event)">+</button>
                    <button class="remove" onClick="RemoveFromCart(${item.id})">Remove From Cart</button>
                </div>
                </div>
            </div>`;
    })
    .join("");
    setFavouriteItem();
  allProducts.innerHTML = y;
}

function setFavouriteItem() {
  let favouriteItems = products.filter((item) => item.isFavourite)

  if (favouriteItems.length === 0) {
    allFavouriteProducts.innerHTML = `
      <p style="font-size: 22px; margin: 100px auto; text-align:center;">
        No favourite items yet
      </p>`;
    return;
  }

  let y = favouriteItems
    .map((item) => {
      return `<div class="favouriteProductItem">
                <img src="${item.imageUrl}" alt="">
                <div class="favouriteProductInfo">
                    <h3 class="bookName">${item.tittle}</h3>
                    <p class="bookCategory">Category: ${item.category}</p>
                    <i class="fas fa-heart" style="color:#a00000;" onClick="setAsFavourite(${item.id}, event)"></i>
                </div>
            </div>`;
    })
    .join("");
  allFavouriteProducts.innerHTML = y
}

function updatedCart() {
  watchScreenItemDiv.innerHTML = "";
  if (addedItem.length > 0) {
    addedItem.map((item) => {
      watchScreenItemDiv.innerHTML += `<div class="cartItem">
            <div class="cartItemName">
                <h2>${item.tittle}</h2>
                <div class="cartBtn">
                    <button class="decrease" onClick="decreaseItem(${
                      item.id
                    } , event)">-</button>
                    <p>${item.quantity}</p>
                    <button class="increase" onClick="increaseItem(${
                      item.id
                    } , event)">+</button>
                </div>
            </div>
            <div class="cartPrice"> 
                <h2>price</h2>
                <p>$${(item.rate * item.quantity).toFixed(2)}</p>
            </div>
        </div>`;
    });
    badge.style.display = "block";
    // badge.innerHTML = addedItem.length;
    updatedcartCounter()
    setFavouriteItem()
  } else {
    badge.style.display = "none";
  }
}

function updatedcartPadge() {
  allProducts.innerHTML = "";
  if (addedItem.length > 0) {
    setChoosenItems(addedItem);
    updateTotalPrice();
    badge.style.display = "block";
    // badge.innerHTML = addedItem.length;
    updatedcartCounter()
  } else {
    badge.style.display = "none";
    allProducts.innerHTML = `<div class="emptyCart"> <h2> Cart Products Empty</h2>
    <p>You Have To Add Books...</p> </div>`;
    TotalPrice.style.display = "none";
  }
}
updatedcartPadge();

watchScreen.addEventListener("click", () => {
  // if (watchScreenItemDiv.innerHTML != "") {
  if (addedItem.length > 0) {
    if (watchScreenItem.style.display == "block") {
      watchScreenItem.style.display = "none";
    } else {
      watchScreenItem.style.display = "block";
    }
  }
});

function RemoveFromCart(id) {
  addedItem = addedItem.filter((item) => item.id !== id);
  localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  updatedCart()
  updatedcartPadge()
  updatedcartCounter();
  updateTotalPrice();
  if (addedItem.length === 0) {
    watchScreenItem.style.display = "none";
  }
}

function increaseItem(id, event) {
  event.stopPropagation();
  addedItem = addedItem.map((item) => {
    if (item.id === id) {
      item.quantity = (item.quantity || 1) + 1;
    }
    return item;
  });
  localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  updatedCart();
  updatedcartPadge();
  updatedcartCounter();
  updateTotalPrice();
}

function decreaseItem(id, event) {
  event.stopPropagation();
  addedItem = addedItem
    .map((item) => {
      if (item.id === id) {
        item.quantity = (item.quantity || 1) - 1;
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
    badge.innerHTML = addedItem.length;
  localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  updatedCart();
  updatedcartPadge();
  updatedcartCounter();
  updateTotalPrice();
    if (addedItem.length === 0) {
      watchScreenItem.style.display = "none";
    }
}

function updatedcartCounter(){
  let count = 0;
  addedItem.map((item) => {
    count += item.quantity || 1;
  });
  badge.innerHTML = count;
}

function updateTotalPrice(){
  if (addedItem.length > 0) {
    TotalPrice.style.display = "block";
    let total = 0;
    addedItem.map((item) => {
      total += item.rate * item.quantity;
    });
    TotalPrice.innerHTML = `TotalPrice: $ ${total.toFixed(2)}`;
  } else {
    TotalPrice.style.display = "none";
  }
}

function setAsFavourite(id, event) {
  let Btn = event.currentTarget;
  products = products.map((item) => {
    if (item.id === id) {
      item.isFavourite = !item.isFavourite;
      console.log(item.isFavourite);
      Btn.style.color = item.isFavourite ? "#a00000" : "black";
    }
    return item;
  });

  addedItem = addedItem.map((item) => {
    if (item.id === id) {
      item.isFavourite = !item.isFavourite;
    }
    return item;
  });

  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  setFavouriteItem();
}