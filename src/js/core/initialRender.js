import { renderCategory } from "../app/categories";
import { renderProduct } from "../app/products";
import { categories, products } from "./data";

const initialRender = () => {
    renderCategory(categories);
    renderProduct(products);
}

export default initialRender;