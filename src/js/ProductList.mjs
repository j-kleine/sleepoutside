import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
          <a href="../product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
          </a>
        </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        // console.log(list);
        document.querySelector(".title").innerHTML = this.category.toUpperCase();
        document.title = `Sleep Outside | ${this.category.toUpperCase()}`;
    }

    renderList(list) {
        // const filteredList = list.filter(product =>
            // filter for 4 wanted products (Stretch Activity Step 2)
            // product.Id == '880RR'
            // || product.Id == '985RF'
            // || product.Id == '985PR'
            // || product.Id == '344YJ');
        // console.log(filteredList);
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}