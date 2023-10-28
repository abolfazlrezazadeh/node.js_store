const controller = require("../controller");

class roomcontroller extends controller {
  async addRoom(req, res, next) {
    try {
      const { title, endpoints } = req.body;
      const namespace = conversationModel.create({ title, endpoints });
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "Conversation room successfully created",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfrooms(req, res, next) {
    try {
      const namespace = conversationModel.find({}, { rooms: 0 });
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          namespace,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  roomController: new roomcontroller(),
};
