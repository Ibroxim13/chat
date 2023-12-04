const search = document.querySelector(".search");
const usersArea = document.querySelector(".users");
const chatUserName = document.querySelector(".chatUserName");
const chatLogoImg = document.querySelector(".chatLogoImg img");
const userModalImg = document.querySelector(".user-modal-img");
const userModalContentImg = document.querySelector(".user-modal-content img")
const sendIcon = document.querySelector(".sendIcon");
const writePostInput = document.querySelector(".writePostInput");

let allChats = [];
let allUsers = [];
let selectedUserId = null;


window.addEventListener("load", () => {
    getAllChats();
})


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
                // getAllChats()
            }
        })

    if (search.value.length == 0) {
        getAllChats()
    }
})



function displayedChat(id) {
    selectedUserId = id;
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

function getAllChats() {
    fetch(`https://655f26f7879575426b44ad38.mockapi.io/users/${user.id}/chats`)
        .then(res => res.json())
        .then(data => {
            allChats = data;
            allChats.forEach(elem => {
                fetch(`https://655f26f7879575426b44ad38.mockapi.io/users/${elem.receiverId}`)
                    .then(res => res.json())
                    .then(data => {
                        usersArea.innerHTML += `
                <div class="user" onclick="displayedChat(${data.id})">
                <div class="user-activities">
                <div class="user-logo">
                    <img src = "${data.img ? data.img : userDefaultImg}">
                </div>
                <div class="user-data-chat">
                    <div class="username">${data.fullName}</div>
                </div>
                </div>
                </div>
                `
                    })
            })
        })
}

sendIcon.addEventListener("click", () => {

    if (writePostInput.value.length > 0) {
        if (allChats.length == 0) {
            createChat()
        }
        else {
            let checker = allChats.filter(item => item.receiverId == selectedUserId)
            if (checker.length == 0) {
                createChat()
            }
            else {
                alert("message yoziladi")
            }
        }
    }
})


function createChat() {
    fetch(`https://655f26f7879575426b44ad38.mockapi.io/users/${user.id}/chats`, {
        method: "POST",
        body: JSON.stringify({
            "senderId": user.id,
            "receiverId": selectedUserId,
            "id": null,
            "userId": user.id
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            createReceiverChat()
        })
}


function createReceiverChat() {
    fetch(`https://655f26f7879575426b44ad38.mockapi.io/users/${selectedUserId}/chats`, {
        method: "POST",
        body: JSON.stringify({
            "senderId": selectedUserId,
            "receiverId": user.id,
            "id": null,
            "userId": selectedUserId
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            getAllChats()
        })
}
