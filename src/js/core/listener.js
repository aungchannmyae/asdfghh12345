import { handleCartItemGroup } from "../app/cart";
import { handleCategoryGroup } from "../app/categories";
import { handleProductGroup } from "../app/products";
import { cartItemGroup, categoryGroup, productGroup } from "./selectors";

const listener = () => {
    categoryGroup.addEventListener("click",handleCategoryGroup);
    productGroup.addEventListener("click",handleProductGroup);
    cartItemGroup.addEventListener("click",handleCartItemGroup)
}

export default listener;