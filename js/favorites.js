let noProduct = document.querySelector('.no-products');
const productsDiv = document.querySelector('.products');

function drawfavoriteProductsUI(allProducts = []) {
    const favoriteProductsJSON = localStorage.getItem('favoriteProducts');
    
    if (!favoriteProductsJSON) {
        noProduct.innerHTML = `There Are No Products !!!`;
        return; // Exit the function since there are no products to display.
    }

    const favoriteProducts = JSON.parse(favoriteProductsJSON);

    if (favoriteProducts.length === 0) {
        noProduct.innerHTML = `There Are No Products !!!`;
    }
    let products = JSON.parse(localStorage.getItem('favoriteProducts')) || allProducts;
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
            <button class="add-to-cart" onclick="removeItemFromFavorite(${item.id})">Remove From Favorite</button>
        </div><!-- /product-item-actions -->
        </div><!-- /product-item -->
    `;
    });

    productsDiv.innerHTML = productsUI.join("");//join() used to remove the , between each element and other elements in the UI;
};
drawfavoriteProductsUI();

function removeItemFromFavorite(id) {
    const favoriteProducts = localStorage.getItem('favoriteProducts');

    if (favoriteProducts) {
        let items = JSON.parse(favoriteProducts);
        let filteredData = items.filter((item) => item.id != id);//this line means remove the clicked item});
        localStorage.setItem('favoriteProducts', JSON.stringify(filteredData));

        //save changes to the UI
        drawfavoriteProductsUI(filteredData);
    }
}
