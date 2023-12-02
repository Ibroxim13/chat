const form = document.querySelector(".form");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const toggleBtn = document.getElementById("toggle-btn");
const body = document.body;
let users = [];

let darkMode = localStorage.getItem("dark-mode");

const enabledDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
}

const disableDarkMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disable");
}

if (darkMode === "enabled") {
  enabledDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disable") {
    enabledDarkMode();
  }
  else{
    disableDarkMode();
  }
}





window.addEventListener('load', () => {
  fetch("https://655f26f7879575426b44ad38.mockapi.io/users")
    .then(res => res.json())
    .then(data => {
      users = data;
    })
})



form.addEventListener('submit', (e) => {
  e.preventDefault()
  let user = {};
  user.username = username.value;
  user.password = password.value;

  let res = users.filter(item => item.password == user.password && item.username == user.username);
  if (res.length > 0) {
    window.location.href = "index.html";
    localStorage.setItem("user", JSON.stringify(res[0]))
  }
  else {
    alert("Check your username or password!")
  }
})