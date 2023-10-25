const { conversationModel } = require("../../../model/conversation");
const controller = require("../controller");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");

class namespacecontroller extends controller {
  async addNamespace(req, res, next) {
    try {
      const { title, endpoints } = req.body;
      const namespace = conversationModel.create({ title, endpoints });
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
            message : 'Conversation space successfully created'
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfNamspaces(req, res, next) {
    try {
      const namespace = conversationModel.find({},{rooms : 0})
      return res.status(httpStatus.CREATED).json({
        statusCode : httpStatus.CREATED,
        data : {
            namespace
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  namespaceController: new namespacecontroller(),
};
