const {
  namespaceController,
} = require("../http/controller/support/namespace.controller");
const { conversationModel } = require("../model/conversation");

module.exports = class namespaceSocketHandler {
  #io;
  constructor(io) {
    this.#io = io;
  }
  initConnection() {
    this.#io.on("connection", async (socket) => {
      const namespaceList = await conversationModel
        .find({}, { title: 1, endpoints: 1 })
        .sort({ _id: -1 });
      socket.emit("namespaceList", namespaceList);
    });
  }
  async createNamespaceConnection() {
    const namespaces = await conversationModel
      .find({}, { title: 1, endpoints: 1, rooms: 1 })
      .sort({ _id: -1 });
    for (const namespace of namespaces) {
      this.#io.of(`/${namespace.endpoints}`)
        .on("connection", async (socket) => {
          const conversation = await conversationModel.findOne({ endpoints: namespace.endpoints }, { rooms: 1 }).sort({ _id: -1 });
          socket.on("joinRoom", (roomName) => {
            const lastRoom = Array.from(socket.rooms)[1]
            if(lastRoom){
              socket.leave(lastRoom)
            }
            socket.join(roomName);
            const roomInfo = conversation.rooms.find(item => item.name == roomName)
            socket.emit("roomInfo", roomInfo)
          });
          socket.emit("roomList", conversation.rooms);
        });
    }
  }
};
