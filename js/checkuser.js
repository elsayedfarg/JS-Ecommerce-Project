const links = document.getElementById('links');
const userInfo = document.getElementById('user_info');
const userDom = document.getElementById('user');
const logoutButton = document.getElementById('logOut');

let checkUsername = localStorage.getItem('username');
if (checkUsername) {
    links.remove();
    userInfo.style.display = "flex";
    userDom.innerHTML = checkUsername;
}

logoutButton.addEventListener('click', () => {
    localStorage.clear();
    setTimeout(() => {
        window.location = "register.html";
    }, 1500)
})