//Implement your code here to make it a functional shopping website

const productsEl = document.querySelector(".products");
const cartEl = document.querySelector("#cart");
const containerEl = document.querySelector(".container");
const cartBtnEl = document.querySelector("#cartBtn");
const checkoutBtnEl = document.querySelector("#checkoutBtn");
let addToCartList = [];
async function fetchProducts() {
  cartEl.style.display = "none";
  checkoutBtnEl.style.display = "none";
  const response = await fetch(`https://dummyjson.com/products`);
  if (!response.ok) {
    throw new Error(`No products availables`);
  }
  const productDetails = await response.json();
  for (let i = 0; i < productDetails.products.length; i++) {
    const p = productDetails.products[i];
    p.qty = 0;
    const cardEl = document.createElement("div");
    cardEl.style.display = "flex";
    cardEl.style.flexDirection = "column";
    cardEl.style.backgroundColor = "whitesmoke";
    cardEl.style.borderRadius = "4px";
    cardEl.style.boxShadow = "10px 10px 15px #726f6f";
    cardEl.style.height = "200px";
    cardEl.style.margin = "10px";
    cardEl.style.maxWidth = "165px";
    cardEl.style.minWidth = "165px";
    const cardImgContainerEl = document.createElement("div");
    const imgEl = document.createElement("img");
    imgEl.src = p.images[0];
    imgEl.width = "120";
    imgEl.height = "80";
    cardImgContainerEl.style.margin = "10px";
    cardImgContainerEl.style.backgroundColor = "lightgrey";
    cardImgContainerEl.style.height = "115px";
    cardImgContainerEl.appendChild(imgEl);
    const cardDescriptionEl = document.createElement("div");
    cardDescriptionEl.style.textAlign = "center";
    cardDescriptionEl.style.fontWeight = "600";
    cardDescriptionEl.style.fontSize = "12px";
    cardDescriptionEl.style.backgroundColor = "white";
    cardDescriptionEl.style.height = "35px";
    cardDescriptionEl.style.paddingTop = "7px";
    cardDescriptionEl.textContent = `${p.title}`;
    cardDescriptionEl.style.backgroundColor = "white";
    const cardDetailsEl = document.createElement("div");
    cardDetailsEl.style.textAlign = "center";
    cardDetailsEl.style.fontWeight = "500";
    cardDetailsEl.style.fontSize = "12px";
    cardDetailsEl.textContent = `${p.title}`;
    cardDetailsEl.style.backgroundColor = "white";
    cardDetailsEl.textContent = `Price x ${p.price}`;
    const addToCartButtonEl = document.createElement("button");
    addToCartButtonEl.style.textAlign = "center";
    addToCartButtonEl.style.fontWeight = "555";
    addToCartButtonEl.style.fontSize = "12px";
    addToCartButtonEl.style.border = `5px lightgray`;
    addToCartButtonEl.style.padding = "8px";
    addToCartButtonEl.style.margin = "10px";
    addToCartButtonEl.style.cursor = "pointer";
    addToCartButtonEl.style.width = "145px";
    addToCartButtonEl.style.backgroundColor = "#00d11d1a";
    addToCartButtonEl.style.color = "darkblue";
    addToCartButtonEl.textContent = `Add To Cart`;
    addToCartButtonEl.style.backgroundColor = "white";
    addToCartButtonEl.addEventListener("click", (event) => {
      addToCartButtonEl.style.backgroundColor = "lightcyan";
      p.qty = p.qty + 1;
      if (p.qty > 1) {
        addToCartList = addToCartList.map((item) => {
          if (item.id === p.id) {
            return {
              ...item,
              qty: p.qty,
            };
          }
        });
      } else {
        addToCartList.push(p);
      }
    });
    cardEl.appendChild(cardImgContainerEl);
    cardEl.appendChild(cardDescriptionEl);
    cardEl.appendChild(cardDetailsEl);
    cardEl.appendChild(addToCartButtonEl);
    containerEl.appendChild(cardEl);
  }
  // return res;
}
fetchProducts();
cartBtnEl.addEventListener("click", () => {
  productsEl.style.display = "none";
  resetCartItems();
  cartEl.style.display = "block";
  checkoutBtnEl.style.display = "block";
  for (let i = 0; i < addToCartList.length; i++) {
    const detailsEl = document.createElement("div");
    detailsEl.style.display = "flex";
    detailsEl.style.justifyContent = "space-between";
    detailsEl.style.border = "1px solid darkgrey";
    detailsEl.style.margin = "5px";
    detailsEl.style.padding = "15px";
    detailsEl.style.width = "420px";
    detailsEl.style.backgroundColor = "whitesmoke";
    const nameEl = document.createElement("span");
    nameEl.textContent = `${addToCartList[i].title}`;
    nameEl.style.fontWeight = "500";
    detailsEl.appendChild(nameEl);
    const priceEl = document.createElement("span");
    priceEl.textContent = `Price: ${addToCartList[i].price}`;
    priceEl.style.fontWeight = "400";
    detailsEl.appendChild(priceEl);
    const qtyEl = document.createElement("span");
    qtyEl.textContent = `Quant: ${addToCartList[i].qty}`;
    qtyEl.style.fontWeight = "400";
    detailsEl.appendChild(qtyEl);
    cartEl.appendChild(detailsEl);
  }
  checkoutBtnEl.addEventListener("click", () => {
    let total = 0;
    for (let item of addToCartList) {
      total += item.price * item.qty;
    }
    alert(`Happy Shopping. Total price is ${total}`);
  });
});
function resetCartItems() {
  Array.from(cartEl.children).forEach((child) => {
    //check the child is not a header element
    if (!child.matches("h1, h2, h3, h4, h5, h6")) {
      cartEl.removeChild(child);
    }
  });
}
