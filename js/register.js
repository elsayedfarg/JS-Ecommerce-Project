// Register User

const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const signUpButton = document.getElementById("sign_up");

signUpButton.addEventListener('click', regisetr);

function regisetr(e) {
    e.preventDefault();
    if (email.value === "" || username.value === "" || password.value === "") {
        alert("Please Fill Data")
    }
    else {
        localStorage.setItem("email", email.value);
        localStorage.setItem("username", username.value);
        localStorage.setItem("password", password.value);
        email.value = "";
        username.value = "";
        password.value = "";
        setTimeout(() => {
            window.location = 'login.html';
        }, 1000);
    }
}