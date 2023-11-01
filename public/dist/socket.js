const socket = io("http://localhost:3050");
function stringToHtml(string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, "text/html");
  return doc.body.firstChild;
}
function initNamespaceConnection(endpoints) {
  const namespaceSocket = io(`http://localhost:3050/${endpoints}`);
  namespaceSocket.on("connect", () => {
    namespaceSocket.on("roomList", (rooms) => {
      const roomElementor = document.querySelector("#contacts ul");
      roomElementor.innerHTML = "";
      for (const room of rooms) {
        const html = stringToHtml(
          `
        <li class="contact">
          <div class="wrap">
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
    });
  });
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
        const endpoint = namespace.getAttribute('endpoint')
        initNamespaceConnection(endpoint)
      });
    }
  });
});
