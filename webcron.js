let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { name: 'LAKME VIT C+', image: 'beauty/41tUdC8oC5L._AC_UL320_.jpg', price: 120000 },
    { name: 'PRODUCT NAME 2', image: '2.PNG', price: 120000 },
    { name: 'PRODUCT NAME 3', image: '3.PNG', price: 220000 },
    { name: 'PRODUCT NAME 4', image: '4.PNG', price: 123000 },
    { name: 'PRODUCT NAME 5', image: '5.PNG', price: 320000 },
    { name: 'PRODUCT NAME 6', image: '6.PNG', price: 120000 },
    { name: 'PRODUCT NAME 7', image: '7.PNG', price: 150000 }
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    if (!listCards[key]) {
        listCards[key] = { ...products[key], quantity: 1 };
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, qty) {
    if (qty === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = qty;
    }
    reloadCard();
}
