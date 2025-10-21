const userInfo = document.querySelector("#userInfo");
const links = document.querySelector("#links");
const userName = document.querySelector("#userName");
const logoutBtn = document.querySelector("#logoutBtn");

if (localStorage.getItem("userFirstName")) {
  links.remove();
  userInfo.style.cssText = "display: flex; align-items: center;";
  const firstName = localStorage.getItem("userFirstName").toUpperCase();
  userName.innerHTML = `Hello, <span style="color: #820000"> ${firstName} </span>`;

  logoutBtn.addEventListener("click", function () {
    localStorage.clear();
    window.location = "login.html";
  });
}
