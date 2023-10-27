// variables
let productName = document.getElementById('product-name');
let productDesc = document.getElementById('product-desc');
let productSizeSelect = document.getElementById('product-size');
let createForm = document.getElementById('create-form');
let inputFile = document.getElementById('upload-image');

let productSizeValue;
let porductImage;
// Events
productSizeSelect.addEventListener('change', getProductSizeValue);
createForm.addEventListener('submit', createProductFunction);
inputFile.addEventListener('change', uploadImage);

// Functions
function getProductSizeValue(e) {
    productSizeValue = e.target.value;
};

function createProductFunction(e) {
    e.preventDefault();
    let allProductsInLocalStorage = JSON.parse(localStorage.getItem('products')) || productsDB;
    let nameValue = productName.value;
    let descValue = productDesc.value;

    if (nameValue && descValue) {
        let newProductData =
        {
            id: (allProductsInLocalStorage) ? allProductsInLocalStorage.length + 1 : 1,
            imageURL: porductImage,
            title: nameValue,
            desc: descValue,
            size: productSizeValue,
            quantity: 1,
            isMine: 'Y'
        }

        let finalData = allProductsInLocalStorage ? [...allProductsInLocalStorage, newProductData] : [newProductData];
        localStorage.setItem('products', JSON.stringify(finalData));

        productName.value = "";
        productDesc.value = "";
        productSizeSelect.value = "";

        setTimeout(() => {
            window.location = 'index.html';
        }, 500);
    }
    else {
        alert("Please Fill Data");
    }
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