const loginBtn = document.getElementById("login-btn");
const userImg = document.getElementById("user-img");
const isLogin = localStorage.getItem("isLogin");
const statusUser = document.getElementById("status-user");
const reportWrapper = document.getElementById("report-wrapper");

if (isLogin === "true") {
  loginBtn.style.display = "none";
  userImg.style.display = "block";
  statusUser.style.background = "green";
} else {
  statusUser.style.background = "red";
}

const ShowHelpcomment = () => {
  reportWrapper.style.display = "block";
};

const closeReportMenu = () => {
  reportWrapper.style.display = "none";
};

const activeNav = () => {
  const navbar = document.getElementById("navbar");

  navbar.classList.toggle("active");
};

const closeNav = () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("active");
};

const logout = () => {
  localStorage.setItem("isLogin", "false");
  localStorage.removeItem("token");
  localStorage.removeItem("website_id");
  localStorage.removeItem("username");
  window.location.reload();
};

const profile_name = document.getElementById("profile_name");
const reportCardUsername = document.getElementById("report-card-username");

const username = localStorage.getItem("username");
profile_name.innerHTML = `Hi ${username}`;

if (isLogin === "false") {
  reportCardUsername.innerHTML = `offline`;
} else {
  reportCardUsername.innerHTML = `${username}`;
}

const commentWrap = document.getElementById("comment-wrap");
const komentar = document.getElementById("komentar");
const webId = localStorage.getItem("website_id");

fetch(`https://api-komentar-pengunjung.desafintech.com/api/website_comments/${webId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (isLogin !== "false") {
      data.data.forEach((item) => {
        const displayComment = document.createElement("div");
        commentWrap.appendChild(displayComment);
        displayComment.classList.add("display-comment");
        const newComment = document.createElement("p");
        newComment.innerHTML = item.comment;
        displayComment.appendChild(newComment);
      });
    }
    console.log(data.data);
  });

const submitComment = (event) => {
  event.preventDefault();

  const komentar = document.getElementById("komentar");

  fetch("https://api-komentar-pengunjung.desafintech.com/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      websiteId: localStorage.getItem("website_id"),
      comment: komentar.value,
    }),
  }).then((res) => {
    if (res.status !== 400) {
      console.log("berhasil menambahkan komentar");
      return res.json();
    } else {
      const alertBox = document.getElementById("alert-box");
      alertBox.style.top = "20%";
      const loading = document.getElementById("loading");
      loading.style.animation = "alertLoadingAnimation 2s ease";
      const alertmsg = document.getElementById("alertmsg");
      alertmsg.innerHTML = "Please login to comment";
      setTimeout(() => {
        alertBox.style.top = "-10%";
        loading.style.animation = "none";
      }, 2000);
      console.log("comment gagal");
    }
  });
};
