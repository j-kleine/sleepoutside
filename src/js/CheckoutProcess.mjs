import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
        this.calculateOrderTotal();
    }
    calculateItemSummary() {
        const subTotalElement = document.querySelector(this.outputSelector + " #cartTotalValue");
        // calculate the total of all the items in the cart
        const cartTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
        this.itemTotal = cartTotal
        subTotalElement.innerHTML = cartTotal;


        const itemNumElement = document.querySelector(this.outputSelector + " #itemsNumber");
        // display the total number of items in the cart
        itemNumElement.innerText = this.list.length;
    }
    calculateOrderTotal() {
        // calculate the shipping cost of all the items in the cart
        this.shipping = 10 + (this.list.length - 1) * 2;
        // calculate the tax amount of all the items in the cart
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        // calculate the order total amount/sum
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        const shipping = document.querySelector(this.outputSelector + " #shippingValue");
        shipping.innerText = this.shipping;

        const tax = document.querySelector(this.outputSelector + " #taxValue");
        tax.innerText = this.tax;

        const orderTotal = document.querySelector(this.outputSelector + " #orderTotalValue");
        orderTotal.innerText = this.orderTotal;
    }
}