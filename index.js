const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "notFruit",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      type: "fruit",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      type: "fruit",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "maybeFruit",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      type: "maybeFruit",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "notFruit",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      type: "notFruit",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type: "notFruit",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "notFruit",
      price: 0.35
    }
  ],
  cart: []
};

function filterItemType(type) {
  if (type === 'all') {
    populateStore(state.items);
  } else {
    const filteredItems = state.items.filter(item => item.type === type);
    populateStore(filteredItems);
  }
}

function populateStore(filteredItems = state.items) {
 const itemList = document.getElementById('itemlist')
 itemList.innerHTML = ''

 filteredItems.forEach((e) => {
  const li = document.createElement("li")
  const img = document.createElement("img")
  img.src = `assets\\icons\\${e.id}.svg`
  const button = document.createElement('button')
  button.addEventListener(`click`, function() {
    addToCart(e)
  })
  button.textContent = "Add to cart"

  li.textContent = e.name
  li.className = "Store-Item"
  li.appendChild(button)
  li.appendChild(img)
  itemList.appendChild(li)
 })

}

function addToCart(item) {
  const cartList = document.getElementById("cartlist")
  let cartItem = document.getElementById(`cart-${item.id}`)
  const totalCost = document.getElementById("currenttotal")
  if (isNaN(parseFloat(totalCost.textContent))) {
    totalCost.textContent = "0.00";
  }

  if (cartItem) {
    let quantity = cartItem.querySelector('.quantity');
    quantity.textContent = parseInt(quantity.textContent) + 1;
    totalCost.textContent = (parseFloat(totalCost.textContent) + item.price).toFixed(2);
  } else {
    const li = document.createElement("li");
    li.id = `cart-${item.id}`;

    const img = document.createElement("img");
    img.src = `assets/icons/${item.id}.svg`;

    const quantity = document.createElement('span');
    quantity.className = 'quantity';
    quantity.textContent = '1';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.onclick = () => addToCart(item);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
      let currentQuantity = parseInt(quantity.textContent);
      if (currentQuantity > 1) {
        quantity.textContent = currentQuantity - 1;
      } else {
        cartList.removeChild(li);
      }
      totalCost.textContent = (parseFloat(totalCost.textContent) - item.price).toFixed(2);
      if (parseFloat(totalCost.textContent) < 0.00) {
        totalCost.textContent = "0.00";
      }
    };

    li.appendChild(img);
    li.appendChild(quantity);
    li.appendChild(addButton);
    li.appendChild(removeButton);
    cartList.appendChild(li);

    totalCost.textContent = (parseFloat(totalCost.textContent) + item.price).toFixed(2);
  }
}




populateStore()

