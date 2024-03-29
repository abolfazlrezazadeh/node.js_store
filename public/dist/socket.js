const socket = io("http://localhost:3050");
let namespaceSocket;
function stringToHtml(string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, "text/html");
  return doc.body.firstChild;
}


function initNamespaceConnection(endpoints) {
  if (namespaceSocket) namespaceSocket.close();
  namespaceSocket = io(`http://localhost:3050/${endpoints}`);
  namespaceSocket.on("connect", () => {
    namespaceSocket.on("roomList", (rooms) => {
      const roomElementor = document.querySelector("#contacts ul");
      roomElementor.innerHTML = "";
      roomElementor.removeEventListener("click", getRoomInfo);
      for (const room of rooms) {
        getRoomInfo(endpoints, room.name);
        const html = stringToHtml(
          `
        <li class="contact" roomName="${room.name}">
          <div class="wrap">
              <img src="${room.image}"/>
              <div class="meta">
                  <p class="name">${room.name}</p>
                  <p class="preview">${room.description}</p>
              </div>
          </div>
          </li>
          `
        );
        roomElementor.appendChild(html);
      }
      const roomNodes = document.querySelectorAll("ul li.contact");
      for (const room of roomNodes) {
        room.addEventListener("click", () => {
          const roomName = room.getAttribute("roomName");
          getRoomInfo(endpoints, roomName);
        });
      }
    });
  });
}


function getRoomInfo(endpoints, roomName) {
  document.querySelector("#roomName h3").setAttribute("roomname", roomName);
  document.querySelector("#roomName h3").setAttribute("endpoint", endpoints);
  namespaceSocket.emit("joinRoom", roomName);
  namespaceSocket.off("roomInfo");
  namespaceSocket.on("roomInfo", (roomInfo) => {
    document.querySelector(".messages ul").innerHTML = "";
    document.querySelector("#roomName h3").innerText = roomInfo.name;
    const messages = roomInfo.messages;
    const userId = document.getElementById("userId").value;
    for (const message of messages) {
      const li = stringToHtml(`
      <li class="${userId == message.sender ? "sent" : "replies"}">
      <img src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" alt="" />
      <p>${message.message}</p>
    </li>
      `);
      document.querySelector(".messages ul").appendChild(li);
    }
  });
  namespaceSocket.on("countOfOnlineUsers", (count) => {
    document.getElementById("onlineCount").innerText = count;
  });
}


function sendMessage() {
  const roomName = document
    .querySelector("#roomName h3")
    .getAttribute("roomName");
  const endpoint = document
    .querySelector("#roomName h3")
    .getAttribute("endpoint");
  const message = document.querySelector(
    ".message-input input#messageInput"
  ).value;
  if (message.trim() == "") {
    return alert("input message can not be empty");
  }
  const userId = document.getElementById("userId").value;
  // debugged after 5 days with these 2 line of codes
  socket.off("newMessage")
  socket.removeAllListeners("newMessage");
  namespaceSocket.emit("newMessage", {
    message,
    roomName,
    endpoint,
    sender: userId,
  });
  namespaceSocket.off("confirmMessage")
  namespaceSocket.on("confirmMessage",data => {
    const li = stringToHtml(`
      <li class="${userId == data.sender ? "sent" : "replies"}">
          <img src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt="" />
          <p>${data.message}</p>
       </li>
    `);
    document.querySelector(".messages ul").appendChild(li);
    //empty message input
    document.querySelector(".message-input input#messageInput").value = "";
    const messageElement = document.querySelector("div.messages");
    messageElement.scrollTo(0, messageElement.scrollHeight);
  })
}


socket.on("connect", () => {
  socket.on("namespaceList", (namespacesList) => {
    const namespaceElement = document.getElementById("namespaces");
    namespaceElement.innerHTML = "";
    initNamespaceConnection(namespacesList[0].endpoints);
    for (const namespace of namespacesList) {
      const Li = document.createElement("li");
      const p = document.createElement("p");
      p.setAttribute("class", "namespaceTitle");
      p.setAttribute("endpoint", namespace.endpoints);
      p.innerText = namespace.title;
      Li.appendChild(p);
      namespaceElement.appendChild(Li);
    }
    const namespaceNodes = document.querySelectorAll(
      "#namespaces li p.namespaceTitle"
    );
    for (const namespace of namespaceNodes) {
      namespace.addEventListener("click", () => {
        const endpoint = namespace.getAttribute("endpoint");
        initNamespaceConnection(endpoint);
      });
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.code == "Enter" && e.target.id === "messageInput") {
      e.preventDefault(); // Prevent form submission
      sendMessage();
    }
  });

  document.querySelector("button.submit").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission
    sendMessage();
  });
});
