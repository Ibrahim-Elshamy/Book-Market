const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const loginBtn = document.querySelector("#loginBtn");


let getUserEmail = localStorage.getItem("userEmail")
let getUserPassword =localStorage.getItem("userPassword")
loginBtn.addEventListener("click" , function () {
    if (userEmail.value === "" || userPassword.value === "") {
        alert("Please Enter Your Information...")
    } else {
        if( userEmail.value.trim() === getUserEmail?.trim() &&
            userPassword.value.trim() === getUserPassword?.trim()) {
            alert("Login successful!")
            window.location = "index.html"
        } else {
            alert("Your email or password is wrong.");
        }
    }
})