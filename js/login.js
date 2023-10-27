const username = document.getElementById('username');
const password = document.getElementById('password');
const signInButton = document.getElementById('sign_in');

let getUser = localStorage.getItem("username");
let getPass = localStorage.getItem("password")

signInButton.addEventListener('click', login);

function login(e) {
    e.preventDefault();
    if (username.value === "" || password.value === "") {
        alert("Please Fill Data")
    }
    else {
        if ((getUser && username.value.trim() === getUser) && (getPass && password.value === getPass)) {
            username.value = "";
            password.value = "";
            setTimeout(() => {
                window.location = 'index.html';
            }, 1000);
        }
        else {
            alert("user name or password is wrong");
        }
    }
}