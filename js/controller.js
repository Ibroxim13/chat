const menuIcon = document.querySelector(".menu-icon");
const CloseMenuIcon = document.querySelector(".close-icon");
const menu = document.querySelector(".menu");
const logOutIcon = document.querySelector(".log-out-icon");
const logOutIcon1 = document.querySelector(".log-out-icon-1")
const logOutBtn = document.querySelector(".log-out-btn");
const chattingArea = document.querySelector(".chatting-area");
const toSiganl = document.querySelector(".to-signal");
const userImg = document.querySelector(".user-img");
const fullName = document.querySelector(".full-name");
const nosegnal = document.querySelector(".no-segnal");
const upload = document.querySelector(".upload");
const checkbox = document.getElementById("checkbox");
const mode = document.querySelector(".mode");
const changeback = document.querySelector(".changeback");
const chatMain = document.querySelector(".chatMain");
const userDefaultImg = "https://avatars.mds.yandex.net/i?id=f591843a4a51a1ed07f14011bc5034f50c918112-10919901-images-thumbs&n=13";


let user = JSON.parse(localStorage.getItem("user"))


changeback.addEventListener("change", () => {
    let reder = new FileReader();

    reder.addEventListener('load', () => {
        localStorage.setItem('back', reder.result)
        nosegnal.style.backgroundImage = `url(${localStorage.getItem("back")})`
        chatMain.style.backgroundImage = `url(${localStorage.getItem("back")})`
    })
    reder.readAsDataURL(changeback.files[0]);

})


upload.addEventListener('change', () => {

    let reder = new FileReader();

    reder.addEventListener('load', () => {
        user.img = reder.result;

        fetch(`https://655f26f7879575426b44ad38.mockapi.io/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("user", JSON.stringify(data))
                userImg.setAttribute('src', data.img);
            })
    })
    reder.readAsDataURL(upload.files[0]);

})



menuIcon.addEventListener("click", () => {
    menu.style.left = 0;
})

CloseMenuIcon.addEventListener("click", () => {
    menu.style.left = "-350px";
})

logOutIcon.addEventListener("click", () => {
    if (logOutBtn.style.display == "none") {
        logOutBtn.style.display = "block";
    }
    else {
        logOutBtn.style.display = "none";
    }
})


toSiganl.addEventListener("click", () => {
    chattingArea.style.display = "none";
    var mediaTo865px = window.matchMedia("(max-width: 865px)");
    if (mediaTo865px.matches) {
        nosegnal.style.display = 'none';
    }
    else {
        nosegnal.style.display = 'flex';
    }
})

window.addEventListener('load', () => {
    let theme = localStorage.getItem("theme")
    chatMain.style.backgroundImage = `url(${localStorage.getItem("back")})`
    nosegnal.style.backgroundImage = `url(${localStorage.getItem("back")})`

    if (theme) {
        if (theme == 'dark') {
            mode.setAttribute("href", "./css/dark.css");
            checkbox.click()
        }
        else {
            mode.setAttribute("href", "./css/light.css");
        }
    }

    if (!user) {
        window.location.href = "signin.html";
    }
    else {
        fullName.innerHTML = user.fullName;
        userImg.setAttribute("src", user.img ? user.img : userDefaultImg)
    }
})

logOutIcon1.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "signin.html"
})


checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        mode.setAttribute("href", "./css/dark.css");
        localStorage.setItem("theme", 'dark')
    }
    else {
        mode.setAttribute("href", "./css/light.css")
        localStorage.setItem("theme", 'light')
    }
})

function deleteAccount() {
    fetch(`https://655f26f7879575426b44ad38.mockapi.io/users/${user.id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            localStorage.removeItem("user");
            window.location.href = "signup.html";
        })
}







