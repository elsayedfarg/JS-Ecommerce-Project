//local storage data
const userName = localStorage.getItem('username');
const userEmail = localStorage.getItem('email');

//Variables
const Name = document.getElementById('change-name');
const Email = document.getElementById('change-email');
const editForm=document.getElementById('edit-profile-form');

//setting values
Name.value = userName;
Email.value = userEmail;

//events
editForm.addEventListener('submit',editProfileData);

function editProfileData(e){
    e.preventDefault();

    const newNameValue=Name.value;
    const newEmailValue=Email.value;

    localStorage.setItem('username',newNameValue);
    localStorage.setItem('email',newEmailValue);

    setTimeout(()=>{
        window.location='profile.html';
    },500);
}