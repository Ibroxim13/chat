const search = document.querySelector(".search");
const usersArea = document.querySelector(".users");
const chatUserName = document.querySelector(".chatUserName");
const chatLogoImg = document.querySelector(".chatLogoImg img");
const userModalImg = document.querySelector(".user-modal-img");
const userModalContentImg = document.querySelector(".user-modal-content img")
let allUsers = [];

search.addEventListener("keyup", () => {
    usersArea.innerHTML = "";
    fetch("https://655f26f7879575426b44ad38.mockapi.io/users")
        .then(res => res.json())
        .then(data => {
            usersArea.innerHTML = "";
            if (search.value.length > 0) {
                allUsers = data.filter(item => item.username.toUpperCase().includes(search.value.toUpperCase()) && item.id !== user.id)
                allUsers.forEach(element => {
                    usersArea.innerHTML += `
                <div class="user" onclick="displayedChat(${element.id})">
                        <div class="user-activities">
                        <div class="user-logo">
                            <img src = "${element.img ? element.img : userDefaultImg}">
                        </div>
                        <div class="user-data-chat">
                            <div class="username">${element.fullName}</div>
                        </div>
                    </div>
                </div>
                `
                })
            }
            else {
                usersArea.innerHTML = `<div class="no-users">no users yet</div>`
            }
        })
})



function displayedChat(id) {

    fetch(`https://655f26f7879575426b44ad38.mockapi.io/users/${id}`)
        .then(res => res.json())
        .then(data => {
            chattingArea.style.display = "flex";
            nosegnal.style.display = 'none';
            chatUserName.innerHTML = data.fullName;
            chatLogoImg.setAttribute("src", data.img ? data.img : userDefaultImg);

            chatLogoImg.addEventListener("click", () => {
                userModalContentImg.setAttribute("src", data.img ? data.img : userDefaultImg);
                userModalImg.classList.add("user-modal-img-active");
            })
        })
}

userModalImg.addEventListener("click", () => {
    userModalImg.classList.remove("user-modal-img-active")
})