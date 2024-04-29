const loginBtn = document.getElementById("login-btn");
const userImg = document.getElementById("user-img");

const isLogin = localStorage.getItem("isLogin");

if (isLogin === "true") {
  loginBtn.style.display = "none";
  userImg.style.display = "block";
}

const langImg = document.getElementById("langImg");

langImg.addEventListener("click", () => {});
