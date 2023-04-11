const {
  productController,
} = require("../../http/controller/admin/product.controller");
const { StringToArray } = require("../../http/middleware/stringatoArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();


router.post(
  "/add",
  uploadFile.array("images",10),
  StringToArray("tags"),
  productController.addProduct
);


router.get("/list", productController.getListOfProducts);


router.get("/:id", productController.getOneProduct);


router.delete("/remove/:id", productController.removeProduct);

router.patch(
  "/edit/:id",
  uploadFile.array("images",10),
  StringToArray("tags"),
  productController.updateProduct
);

module.exports = {
  productAdminApiRoute: router,
};
