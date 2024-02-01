import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list", "#total-value");
cart.renderCartContents();
cart.calculateCartTotal();

// console.log(cart);
