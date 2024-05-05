const loginBtn = document.getElementById("login-btn");
const userImg = document.getElementById("user-img");

const isLogin = localStorage.getItem("isLogin");

if (isLogin === "true") {
  loginBtn.style.display = "none";
  userImg.style.display = "block";
}

const activeNav = () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("active");
};

const closeNav = () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("active");
};

const logout = () => {
  localStorage.removeItem("isLogin", false);
  window.location.reload();
};
