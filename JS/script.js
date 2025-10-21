const allProducts = document.querySelector(".products")
const watchScreen = document.querySelector(".watchScreen")
const watchScreenItem = document.querySelector(".watchScreenItem")
const watchScreenItemDiv = document.querySelector(".watchScreenItem div")
const badge = document.querySelector(".badge")
const searchSelector = document.querySelector(".searchSelector")
const searchInput = document.querySelector('input[type="search"]')



window.addEventListener("load", () => {
  const savedProducts = JSON.parse(localStorage.getItem("products"));
  const savedCart = JSON.parse(localStorage.getItem("productsInCart"));

  if (savedProducts) products = savedProducts;
  if (savedCart) addedItem = savedCart;

  setItems(products);
  updatedCart();
});

let products = [
  {
    id: 1,
    tittle: "الماجريات",
    rate: "115",
    category: "ديني",
    imageUrl: "images/book1.png",
    quantity: 1,
    isFavourite: false,
  },
  {
    id: 2,
    tittle: "رقائق القران",
    rate: "115",
    category: "ديني",
    imageUrl: "images/book2.png",
    quantity: 1,
    isFavourite: false,
  },
  {
    id: 3,
    tittle: "الطريق إلى القرآن",
    rate: "115",
    category: "ديني",
    imageUrl: "images/book3.jpg",
    quantity: 1,
    isFavourite: false,
  },
  {
    id: 4,
    tittle: "مسلكيات",
    rate: "115",
    category: "ديني",
    imageUrl: "images/book4.jpeg",
    quantity: 1,
    isFavourite: false,
  },
  {
    id: 5,
    tittle: "تعليم تدبر القران الكريم",
    rate: "150",
    category: "ديني",
    imageUrl: "images/book5.jpg",
    quantity: 1,
    isFavourite: false,
  },
  {
    id: 6,
    tittle: "تاريخ اليهود في مصر والعالم العربي",
    rate: "210",
    category: "تاريخي",
    imageUrl: "images/book6.png",
    quantity: 1,
    isFavourite: false,
  },
  {
    id: 7,
    tittle: "عندما التقيت عمر بن الخطاب",
    rate: "250",
    category: "تاريخي",
    imageUrl: "images/book7.jpg",
    quantity: 1,
    isFavourite: false,
  },
];


let addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

function setItems(selectedItem = products) {
    let y = selectedItem
      .map((item) => {
        let isInCart = addedItem.some((cartItem) => cartItem.id === item.id);
        let buttonText = isInCart ? "Remove From Cart" : "Add To Cart";
        let buttonColor = isInCart ? "#7D0A0A" : "#a00000";
        let isFav = item.isFavourite;
        let favColor = isFav ? "#a00000" : "black";
        return `<div class="productItem">
                <img src="${item.imageUrl}" alt="">
                <div class="productInfo">
                    <h3 class="movieName">${item.tittle}</h3>
                    <p class="movieRate">Price: ${item.rate} EGP</p>
                    <p class="movieCategory">Category: ${item.category}</p>
                </div>
                <div class="productIcon">
                    <i class="fas fa-heart" onClick="setAsFavourite(${item.id}, event)" style="color:${favColor}"></i>
                    <button ID="${item.id}" onClick="AddRemoveToggle(${item.id} , event)" style="background-color:${buttonColor}">${buttonText}</button>
                </div>
            </div>`;
      })
      .join("");
    allProducts.innerHTML = y;
}
setItems()


if(addedItem) {
  updatedCart()
}

function updatedCart() {
  watchScreenItemDiv.innerHTML = ""
  if (addedItem.length > 0) {
    addedItem.map((item) => {
      watchScreenItemDiv.innerHTML += `<div class="cartItem">
            <div class="cartItemName">
                <h2>${item.tittle}</h2>
                <div class="cartBtn">
                    <button class="decrease" onClick="decreaseItem(${item.id} , event)">-</button>
                    <p>${item.quantity}</p>
                    <button class="increase" onClick="increaseItem(${item.id} , event)">+</button>
                </div>
            </div>
            <div class="cartPrice"> 
                <h2>price</h2>
                <p>${item.rate * item.quantity} EGP</p>
            </div>
        </div>`;
    })
    badge.style.display ="block"
    badge.innerHTML = addedItem.length
  } else {
    badge.style.display = "none"
  }
  updatedcartCounter()
}

function AddRemoveToggle(id, event) {
  let isInCart = addedItem.some((item) => item.id === id) 
  if (!isInCart) {
    addToCart(id, event)
  } else {
    RemoveFromCart(id, event)
  }

}
function addToCart(id, event) {
    if(localStorage.getItem("userFirstName")) {
        let choosenItem = products.find((item) => item.id === id )
        if(choosenItem.quantity = 0) {
          choosenItem.quantity = 1
        } else choosenItem.quantity += 1 
        addedItem = [...addedItem, choosenItem]
        localStorage.setItem("productsInCart", JSON.stringify(addedItem))
        updatedCart()
        updatedcartCounter();
        let button = event.target
        button.innerHTML = "Remove From Cart"
        button.style.cssText = "transition:all 0.3s linear; background-color: #7D0A0A;";
    } else {
        window.location = "login.html"
    }
}

function RemoveFromCart(id, event) {
  addedItem = addedItem.filter((item) => item.id !== id)
  localStorage.setItem("productsInCart", JSON.stringify(addedItem))
  updatedCart()
  updatedcartCounter()
  let button = event.target;
  button.innerHTML = "Add To Cart";
  button.style.cssText =
    "transition:all 0.3s linear; background-color: #a00000;";
  if (addedItem.length === 0) {
    watchScreenItem.style.display = "none";
  }
}

watchScreen.addEventListener("click", () => {
  if (watchScreenItemDiv.innerHTML != "") {
    if (watchScreenItem.style.display == "block") {
      watchScreenItem.style.display = "none";
    } else {
      watchScreenItem.style.display = "block";
    }
  }
})



searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = searchSelector.value;

  let filteredProducts = [];
  if (selectedCategory === "name") {
    filteredProducts = products.filter((item) => {
      return item.tittle.toLowerCase().includes(searchText);
    });
  } else if (selectedCategory === "category") {
    filteredProducts = products.filter((item) => {
      return item.category.toLowerCase().includes(searchText);
    })
  } else {
    filteredProducts = products
  }

  if (searchText.trim() === "") {
    filteredProducts = products;
  }

  allProducts.innerHTML = "";
  setItems(filteredProducts);
})

function increaseItem(id ,event) {
  event.stopPropagation();
  addedItem = addedItem.map((item) => {
    if (item.id === id) {
      item.quantity = (item.quantity || 1) + 1;
    }
    return item;
  });
  localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  updatedCart();
  updatedcartCounter();
}

function decreaseItem(id , event) {
  event.stopPropagation();
  addedItem = addedItem
    .map((item) => {
      if (item.id === id) {
        item.quantity = (item.quantity || 1) - 1;
        if (item.quantity <= 0) {
          let button = document.querySelector(`button[ID="${id}"]`);
          if (button) {
            button.innerHTML = "Add To Cart";
            button.style.cssText =
              "transition:all 0.3s linear; background-color: #a00000;";
          }
        }
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  updatedCart();
  updatedcartCounter();
    if (addedItem.length === 0) {
      watchScreenItem.style.display = "none";
    }
}


function updatedcartCounter() {
  let count = 0;
  addedItem.map((item) => {
    count += item.quantity || 1;
  });
  badge.innerHTML = count;
}

function setAsFavourite(id, event){
  if (localStorage.getItem("userFirstName")) {
    let Btn = event.currentTarget;
    products = products.map((item) => {
      if (item.id === id) {
        item.isFavourite = !item.isFavourite;
        Btn.style.color = item.isFavourite ? "#a00000" : "black";
      }
      return item;
    });
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    window.location = "login.html";
  }
}