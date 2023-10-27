let noProduct = document.querySelector('.no-products');
const productsDiv = document.querySelector('.products');

function drawCartProductsUI(allProducts = []) {
    if (JSON.parse(localStorage.getItem('productsInCart')).length === 0) {
        noProduct.innerHTML = `There Are No Productus !!!`;
    }

    let products = JSON.parse(localStorage.getItem('productsInCart')) || allProducts;
    let productsUI = products.map((item) => {
        return `<div class="product-item">
        <img src="${item.imageURL}" class="product-item-image" alt="headphone image" />
        <div class="product-item-desc">
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
            <span>Size: ${item.size}</span><br>
            <span>Quantity: ${item.quantity}</span>
        </div><!-- /product-item-desc -->
        <div class="product-item-actions">
            <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">Remove From Cart</button>
        </div><!-- /product-item-actions -->
        </div><!-- /product-item -->
    `;
    });
    productsDiv.innerHTML = productsUI.join("");//join() used to remove the , between each element and other elements in the UI;
};
drawCartProductsUI();

function removeItemFromCart(id) {
    const productInCart = localStorage.getItem('productsInCart');
    if (productInCart) {
        let items = JSON.parse(productInCart);

        let filteredData = items.filter((item) => {
            return item.id != id;//this line means remove the clicked item
        });
        localStorage.setItem('productsInCart', JSON.stringify(filteredData));

        //save changes to the UI
        drawCartProductsUI(filteredData);
    }
}
