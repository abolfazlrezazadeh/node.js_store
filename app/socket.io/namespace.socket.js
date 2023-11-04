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
          socket.on("joinRoom", async (roomName) => {
            const lastRoom = Array.from(socket.rooms)[1]
            if(lastRoom){
              socket.leave(lastRoom)
              await this.getCountOfOnlineUsers(namespace.endpoints , roomName)
            }
            socket.join(roomName);
            await this.getCountOfOnlineUsers(namespace.endpoints , roomName)
            const roomInfo = conversation.rooms.find(item => item.name == roomName)
            socket.emit("roomInfo", roomInfo)
            this.getNewMessage(socket)
                // when disconnected leave the room
            socket.on('disconnect',async ()=>{
            await this.getCountOfOnlineUsers(namespace.endpoints , roomName)
          })
          });
          socket.emit("roomList", conversation.rooms);
        });
    }
  }
  async getCountOfOnlineUsers(endpoint, roomName){
    const onlineUsers = await this.#io.of(`/${endpoint}`).in(roomName).allSockets();
    this.#io.of(`/${endpoint}`).in(roomName).emit("countOfOnlineUsers", Array.from(onlineUsers).length)
  }
  async getNewMessage(socket){
    socket.on("newMessage",(data)=>{
      console.log(data);
    })
  }
};
