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


document.addEventListener("DOMContentLoaded", init)