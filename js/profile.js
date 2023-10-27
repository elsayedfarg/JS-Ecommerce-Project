//local storage data
const userName = localStorage.getItem('username');
const userEmail = localStorage.getItem('email');
const allProducts = JSON.parse(localStorage.getItem('products')) || productsDB;
const myProducts = allProducts.filter((p) => p.isMine === 'Y');

//Variables
const Name = document.getElementById('user-name');
const Email = document.getElementById('user-email');
const productsDiv = document.querySelector('#products-length span');

Name.innerHTML = userName;
Email.innerHTML = userEmail;

if (myProducts.length != 0) {
    productsDiv.innerHTML = myProducts.length;
} else {
    document.getElementById('products-length').remove();
}
