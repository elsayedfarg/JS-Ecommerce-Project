// variables
let allProducts = JSON.parse(localStorage.getItem('products')) || productsDB;
let itemToEdit = JSON.parse(localStorage.getItem('edit-product-id'));
let getProduct = allProducts.find((product) => product.id === itemToEdit);

let productName = document.getElementById('product-name');
let productDesc = document.getElementById('product-desc');
let productSizeSelect = document.getElementById('product-size');
let updateForm = document.getElementById('update-form');
let inputFile = document.getElementById('upload-image');
let productSizeValue;
let porductImage;

productName.value = getProduct.title;
productDesc.value = getProduct.desc;
productSizeSelect.value = getProduct.size;
porductImage = getProduct.imageURL;

// // Events
productSizeSelect.addEventListener('change', getProductSizeValue);
updateForm.addEventListener('submit', updateProductFunction);
inputFile.addEventListener('change', uploadImage);

// Functions
function getProductSizeValue(e) {
    productSizeValue = e.target.value;
};

function updateProductFunction(e) {
    e.preventDefault();

    getProduct.title = productName.value;
    getProduct.desc = productDesc.value;
    getProduct.size = productSizeValue;
    getProduct.imageURL = porductImage;

    localStorage.setItem('products', JSON.stringify(allProducts));

    setTimeout(() => {
        window.location = 'index.html';
    }, 500);
};

function uploadImage() {
    let file = this.files[0];//this refer to the event added on this file  &&  files[0] refer to the first file from the files array

    let fileType = ['image/jpeg']
    if (fileType.indexOf(file.type) == -1) {//indexOf() used to check if the element inside the array or not
        alert("You Must Select Images Only");
        return; //this line used to exit from the function
    }
    //check if the image size larger than 2MBs
    if (file.size > 2 * 1024 * 1024) {
        alert("You Can Not Upload Files Larger Than 2MBs");
        return
    }
    getImageBase64(file);
}


function getImageBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        porductImage = reader.result;
    }

    reader.onerror = function () {
        alert(`Error ... `);
    }
}

