const productsDiv = document.querySelector('.products');
const noProducts = document.querySelector('.no-products');

// Display Products
let drawProductsUI;
(drawProductsUI = function (products = []) {
    let MyProducts = products.filter((product) => product.isMine === 'Y');
    if (MyProducts.length === 0) {
        noProducts.innerHTML = `There Are No Productus !!!`;
    }
    
    let productsUI = MyProducts.map((product) => {
        return `<div class="product-item" style="border: ${product.isMine === "Y" ? '3px solid red' : ""}">
            <img src="${product.imageURL}" class="product-item-image" alt=${product.title} />
            <div class="product-item-desc">
            <a title="Click Me To Show Details" onclick=returnItemId(${product.id})>${product.title}</a>
                <p>${product.desc}</p>
                <span>Size: ${product.size}</span><br />
                <button class='edit-product' onclick=editProduct(${product.id})>Edit Product</button>
                
            </div><!-- /product-item-desc -->

            <button class='delete-product' onclick=deleteProduct(${product.id})>Delete Product</button>

            </div><!-- /product-item -->
        `;
    });
    productsDiv.innerHTML = productsUI.join("");//join() used to remove the , between each element and other elements in the UI;

})(JSON.parse(localStorage.getItem("products")) || productsDB);//self invoke function


//Edit Product
function editProduct(id) {
    localStorage.setItem("edit-product-id", id);
    window.location = 'editproduct.html';
}

//Delete Product
function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;
    let MyProducts = products.filter((product) => product.isMine === 'Y');
    let filteredData = MyProducts.filter((p) => p.id != id);
    let clickedItem = MyProducts.find((p) => p.id === id);

    products = products.filter((item) => item.id !== clickedItem.id);

    localStorage.setItem("products", JSON.stringify(products));

    drawProductsUI(filteredData);
}