const controller = require("../controller");

class productController extends controller {
  async addProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getListOfProducts(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  productController: new productController(),
};
