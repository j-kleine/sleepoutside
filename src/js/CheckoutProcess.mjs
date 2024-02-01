import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
    //   console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    // console.log(simplifiedItems);
    return simplifiedItems;
  }

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
        const cartTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0).toFixed(2);
        this.itemTotal = cartTotal;
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

        // test to show simplifiedItems, actual call in different function
        // packageItems(this.list);
    }
    async checkout() {
        const formElement = document.forms["checkout"];
    
        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
          const res = await services.checkout(json);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
}