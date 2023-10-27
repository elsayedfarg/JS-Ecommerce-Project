// Define Product
const productsDiv = document.querySelector('.products');
const cartsProducts = document.querySelector('.carts-products');
const cartsProductsDiv = document.querySelector('.carts-products div');
const cartIcon = document.querySelector('.cart-icon');
const flag = document.querySelector('.flag');
const products = productsDB;

let lastProducts = JSON.parse(localStorage.getItem("products")) || products;


// Display Products
let drawProductsUI;
(drawProductsUI = function (products = []) {
    let productsUI = products.map((product) => {
        return `<div class="product-item" style="border: ${product.isMine === "Y" ? '3px solid red' : ""}">
        <img src="${product.imageURL}" class="product-item-image" alt=${product.title} />
        <div class="product-item-desc">
        <a title="Click Me To Show Details" onclick=returnItemId(${product.id})>${product.title}</a>
            <p>${product.desc}</p>
            <span>Size: ${product.size}</span><br />
            ${product.isMine === "Y" ? `<button class='edit-product' onclick=editProduct(${product.id})>Edit Product</button>` : ''}

        </div><!-- /product-item-desc -->
        <div class="product-item-actions">
            <button class="add-to-cart" onclick="addedToCart(${product.id})">Add To Cart</button>
            <i class="${product.liked === true ? 'fas fa-heart fa-2x' : 'far fa-heart fa-2x'}" style="color : ${product.liked === true ? 'red' : ''}" onclick="addedTofavorite(${product.id})"></i>
        </div><!-- /product-item-actions -->
        </div><!-- /product-item -->
    `;
    });

    productsDiv.innerHTML = productsUI.join("");//join() used to remove the , between each element and other elements in the UI;

})(JSON.parse(localStorage.getItem("products")) || products);//self invoke function


let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];
if (addedItem) {
    addedItem.map((item) => {
        cartsProductsDiv.innerHTML += `<p>${item.title} ${item.quantity}</p>`;
        flag.innerHTML++;
    });

}



//add to cart

function addedToCart(id) {
    //check if the user logged in
    if (localStorage.getItem('username')) {
        let product = lastProducts.find((item) => item.id === id);
        let isProductInCart = addedItem.some(element => element.id === product.id);//some() work like find() but it return true or false
        //check if the item added more than once
        if (isProductInCart) {
            addedItem = addedItem.map((item) => {
                if (item.id === product.id) item.quantity += 1;
                return item;
            });
        }
        else {
            addedItem.push(product);//addedItem=[...addedItem ,clickedItem];
        }
        cartsProductsDiv.innerHTML = "";
        addedItem.forEach((i) => {
            cartsProductsDiv.innerHTML += `<p>${i.title} ${i.quantity}</p>`;
        });
        localStorage.setItem('productsInCart', JSON.stringify(addedItem));

        flag.innerHTML++;
    }
    else {
        window.location = 'login.html';
    }
}


function getUniqueArray(arr, filterType) {
    //[1 1 1]
    let uniqueData = arr
        .map((item) => item[filterType])
        .map((item, i, final) => final.indexOf(item) === i && i)
        .filter((item) => arr[item])
        .map((item) => arr[item]);

    return uniqueData;

};



//open cart menu
cartIcon.addEventListener('click', () => {
    if (cartsProductsDiv.innerHTML !== '') {
        if (cartsProducts.style.display === 'block') {
            cartsProducts.style.display = 'none';
        }
        else {
            cartsProducts.style.display = 'block'
        }
    }
});



function returnItemId(id) {//saveItemData
    localStorage.setItem("product_id", id);
    window.location = "cartdetails.html";
}



// filter by name synchronized
const searchDiv = document.getElementById('search');

searchDiv.addEventListener('keyup', function (e) {
    search(e.target.value.trim(), lastProducts);//the entered word at the search field
    if (e.target.value.trim() === "") {
        drawProductsUI(lastProducts);
    }
});

function search(title, myArray) {

    // The indexOf() function in JavaScript is a built-in method for searching for a specified value
    // (or substring) within a string or an array.It returns the index of the first occurrence of the value you're searching for,
    // or - 1 if the value is not found.

    let arr = myArray.filter((item) => {
        return item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
    });

    drawProductsUI(arr);
}



//add to favorite
favoriteItems = (localStorage.getItem('favoriteProducts')) ? JSON.parse(localStorage.getItem('favoriteProducts')) : [];

function addedTofavorite(id) {
    // Check if the user is logged in
    if (!localStorage.getItem('username')) {
        window.location = 'login.html';
        return;
    }

    let product = lastProducts.find((item) => item.id == id);
    product.liked = true;

    // Check if the product is already in favorites
    let isProductInFavorite = favoriteItems.some((item) => item.id === product.id);

    if (isProductInFavorite) {
        return product;
    } else {
        // If not in favorites, add it
        favoriteItems.push(product);
    }

    // Update local storage
    let uniqueFavorites = getUniqueArray(favoriteItems, "id");
    localStorage.setItem('favoriteProducts', JSON.stringify(uniqueFavorites));

    // Update the product list and local storage
    products.forEach((item) => {
        if (item.id === product.id) {
            item.liked = true;
        }
    });
    localStorage.setItem('products', JSON.stringify(lastProducts));

    drawProductsUI(lastProducts);
}


// Filter By Size

let sizeFilter = document.getElementById('size-filter');

sizeFilter.addEventListener('change', filterProductsBySize);

function filterProductsBySize(e) {
    let val = e.target.value;
    let allProducts = JSON.parse(localStorage.getItem('products')) || lastProducts;
    if (val === 'all') {
        drawProductsUI(lastProducts);
    }
    else {
        allProducts = allProducts.filter((i) => i.size === val);
        drawProductsUI(allProducts)
    }
}


//Edit Product

function editProduct(id){
    localStorage.setItem("edit-product-id",id);
    window.location='editproduct.html';
}