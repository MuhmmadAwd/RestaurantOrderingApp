import {
    menuArray
} from "./data.js";

import {
    v4 as uuidv4
} from 'https://jspm.dev/uuid';

let invoiceEl = null;
let ordersArray = []
let number = 1;

function init() {
    renderMenuHtml()

    const mainEl = document.querySelector("main");
    invoiceEl = document.querySelector(".invoice");

    mainEl.addEventListener("click", handleCLick)
}

function renderMenuHtml() {
    document.querySelector(".menu").innerHTML = generateMenuItemHtml()
}

function generateMenuItemHtml() {
    let menuHtml = ""
    menuArray.forEach(menuItem => {
        menuItem.id = uuidv4()
        const menuItemHtml = `
        <article class="menu-item">
        <span class="menu-item__icon ">${menuItem.emoji}</span>
        <div class="menu-item__info">
            <p class="menu-item__name">${menuItem.name}</p>
            <p class="menu-item__ingredients">${menuItem.ingredients}</p>
            <p class="menu-item__price">${menuItem.price}$</p>
        </div>
        <button class=" menu-item__btn" data-add="+">+</button>
        <button class=" menu-item__btn" data-remove="-">-</button>
    </article>
        `
        menuHtml += menuItemHtml
    });
    return menuHtml
}

function handleCLick(e) {
    const targetData = e.target.dataset
    const orderName = e.target.parentElement.querySelector(".menu-item__name").textContent;
    const orderPrice = e.target.parentElement.querySelector(".menu-item__price").textContent;

    if (targetData.add) {
        addOrderToInvoice(orderName, orderPrice)
    } else if (targetData.remove && ordersArray.length > 0) {
        removeOrderFromInvoice(orderName, orderPrice)
    }

    invoiceEl.style.display = (ordersArray.length > 0) ? "grid" : "none"
    renderInvoiceOrders()
}

function addOrderToInvoice(name, price) {
    const index = findOrderIndexByName(name);
    if (index === -1) {
        ordersArray.push({
            name,
            price,
            number: 1,
            id: uuidv4(),
        });
    } else {
        ordersArray[index].number++;
    }
}

function removeOrderFromInvoice(name, price) {
    const index = findOrderIndexByName(name);
    if (index !== -1) {
        if (!orderExists(name) || ordersArray[index].number === 1) {
            ordersArray.splice(index, 1);
        } else {
            ordersArray[index].number--;
        }
    }
}

function findOrderIndexByName(name) {
    return ordersArray.findIndex(order => order.name === name);
}

function orderExists(name) {
    return ordersArray.some(order => order.name === name);
}

function generateInvoiceOrderHtml() {
    let ordersHtml = ""
    let totalPrice = 0
    ordersArray.forEach((order) => {
        let orderPrice = Number.parseInt(order.price) * order.number;
        const orderHtml = `
        <article class="invoice__order">
            <p class="oder__name">${order.name}</p>
            <p class="invoice__price">${orderPrice}$</p>
        </article>
        `
        totalPrice += orderPrice
        ordersHtml += orderHtml
    })
    ordersHtml += `
                <div class="invoice__total-price invoice__order">
                    <p class="oder__name">Total price:</p>
                    <p class="invoice__price">${totalPrice}$</p>
                </div>
                `
    return ordersHtml
}

function renderInvoiceOrders() {
    document.querySelector(".invoice__orders").innerHTML = generateInvoiceOrderHtml()
}

document.addEventListener("DOMContentLoaded", init)