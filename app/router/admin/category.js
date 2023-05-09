const router = require("express").Router();
const {
  categoryController,
} = require("../../http/controller/admin/category/category.controller");



router.post("/add", categoryController.addCategory);

router.get("/parents", categoryController.getAllParents);

router.get("/children/:parent", categoryController.getChildOfParents);

router.get("/list-of-all", categoryController.getAllCategoryWithoutPopulate);

router.get("/all", categoryController.getAllCategory);

router.delete("/remove/:id", categoryController.removeCategory);

router.get("/:id", categoryController.getCategoryByID);

router.patch("/update/:id", categoryController.editCategoryTitle);

module.exports = {
  categoryAdminApiRoute: router,
};
