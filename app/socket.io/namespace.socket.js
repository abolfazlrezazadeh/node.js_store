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
        socket.emit("namespaceList" , namespaceList)
    });
  }
};
