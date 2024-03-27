import Swal from "sweetalert2";
import { cartCostTotal, cartCount, cartItemCount, cartItemGroup, cartItemTemplate, productGroup } from "../core/selectors"

export const createCart  = (product, quantity) => {
    const template = cartItemTemplate.content.cloneNode(true);
    template.querySelector(".cart-item").setAttribute("cart-product-id", product.id);
    template.querySelector(".cart-item-img").src = product.image;
    template.querySelector(".cart-item-title").innerText = product.title;
    template.querySelector(".cart-item-price").innerText = product.price;
    template.querySelector(".cart-item-cost").innerText = product.price * quantity;
    template.querySelector(".cart-item-quantity").innerText = quantity;
    return template;
}

export const createCartCount = () => {
    const totalItemInCount = document.querySelectorAll(".cart-item");

    return totalItemInCount.length;
}

export const updateCartCount = () => {
    const currentTotal = createCartCount();
    cartItemCount.innerText = currentTotal;
    cartCount.innerText = currentTotal;
}

export const calculateCartCostTotal = () => {
    const total = [...document.querySelectorAll(".cart-item-cost")].reduce((pv,cv) => pv + parseFloat(cv.innerText), 0);
    return total;
}

export const updateCartCostTotal = () => {
    const total = calculateCartCostTotal().toFixed(2);
    cartCostTotal.innerText = total;
}

export const handleCartItemGroup = (event) => {
    if( event.target.classList.contains("cart-item-remove")){
        const currentItem = event.target.closest(".cart-item");
        const currentProductId = currentItem.getAttribute("cart-product-id");


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              currentItem.remove();
              updateCartCount();
              updateCartCostTotal();
              const currentProduct = productGroup.querySelector(
                `[product-id='${currentProductId}']`
              );    
              if(currentProduct){
                const currentProductAddCartBtn = currentProduct.querySelector(
                  ".add-to-cart-btn"
                );
                currentProductAddCartBtn.removeAttribute("disabled");
                currentProductAddCartBtn.innerText = "Add to Cart";
              }
          
            }
          });

    }else if(event.target.classList.contains("cart-add-btn")){
        const currentCart = event.target.closest(".cart-item");
        const currentPrice = currentCart.querySelector(".cart-item-price");
        const currentCost = currentCart.querySelector(".cart-item-cost");
        const currentQuantity = currentCart.querySelector(".cart-item-quantity");

        currentQuantity.innerText = parseInt(currentQuantity.innerText) + 1;
        currentCost.innerText = (currentQuantity.innerText * currentPrice.innerText).toFixed(2);
        updateCartCostTotal();
        

    }else if(event.target.classList.contains("cart-sub-btn")){
        const currentCart = event.target.closest(".cart-item");
        const currentPrice = currentCart.querySelector(".cart-item-price");
        const currentCost = currentCart.querySelector(".cart-item-cost");
        const currentQuantity = currentCart.querySelector(".cart-item-quantity");

        if( currentQuantity.innerText > 1 ) {
            currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
            currentCost.innerText = currentQuantity.innerText * currentPrice.innerText;
            updateCartCostTotal();
    }
    }
}