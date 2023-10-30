const controller = require("../controller");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const path = require("path");
const { conversationModel } = require("../../../model/conversation");
class roomcontroller extends controller {
  async addRoom(req, res, next) {
    try {
      const { name, description, fileUploadPath, fileName, namespace } =
        req.body;
      await this.findConversationWithEndpoint(namespace);
      await this.findRoomWithName(name);
      const image = path.join(fileUploadPath, fileName).replace(/\\/g, "/");

      const roomDetailes = { name, description, image };
      const room = await conversationModel.updateOne(
        { endpoints: namespace },
        { $push: { rooms: roomDetailes } }
      );
      if(!room.modifiedCount) throw createError.InternalServerError('please try again')
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "chat room successfully created",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfrooms(req, res, next) {
    try {
      const conversations = conversationModel.find({}, { rooms: 1 });
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          rooms: conversations,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findRoomWithName(name) {
    const room = await conversationModel.findOne({ "rooms.name": name });
    if (room) throw createError.BadRequest("this name is alreade taken");
  }
  async findConversationWithEndpoint(endpoints) {
    const room = await conversationModel.findOne({ endpoints });
    if (!room) throw createError.NotFound("the namespace not found");
    return room;
  }
}

module.exports = {
  roomController: new roomcontroller(),
};
