import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productListing = new ProductList("Tents", dataSource, listElement);

// CONSOLE Test
// console.log(productListing);

productListing.init();
