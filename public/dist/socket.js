const socket = io("http://localhost:3050");
socket.on("connect", () => {
  socket.on("namespaceList", (namespacesList) => {
    const namespaceElement = document.getElementById("namespaces");
    namespaceElement.innerHTML  = "";
    for (const namespace of namespacesList) {
      const Li = document.createElement("li");
      const p = document.createElement("p");
      p.innerText = namespace.title;
      Li.appendChild(p);
      namespaceElement.appendChild(Li);
    }
  });
});
