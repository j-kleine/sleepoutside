import { loadHeaderFooter, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const productListing = new ProductList(category, dataSource, listElement);

// CONSOLE Test
// console.log(productListing);

productListing.init();
