const userFirstName = document.querySelector("#userFirstName");
const userSecondName = document.querySelector("#userSecondName");
const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const registerBtn = document.querySelector("#registerBtn");



registerBtn.addEventListener("click" , function() {
    if(userFirstName.value === "" || userSecondName.value === "" || userEmail.value === "" || userPassword.value === "") {
        alert("Please Enter your Information...")
    } else { 
        localStorage.setItem("userFirstName", userFirstName.value)
        localStorage.setItem("userSecondName", userSecondName.value)
        localStorage.setItem("userEmail", userEmail.value)
        localStorage.setItem("userPassword", userPassword.value)
        alert("Account Created Successfully!")
        window.location = "login.html"
    }
})