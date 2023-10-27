let products = JSON.parse(localStorage.getItem("products"));

const itemDetails = document.querySelector('.item-details');

const searchId = JSON.parse(localStorage.getItem('product_id'));

if (products) {
    var productDetails = products.find((i) => i.id === searchId);

    itemDetails.innerHTML = `
      <img src=${productDetails.imageURL} alt="headphone image">
      <h2>${productDetails.title}</h2>
      <p>${productDetails.desc}</p>
      <span>Size : ${productDetails.size}</span><br>
      <span>Quantity : ${productDetails.quantity}</span>
    `;
}
else {
    localStorage.setItem('products',JSON.stringify(productsDB))
}

