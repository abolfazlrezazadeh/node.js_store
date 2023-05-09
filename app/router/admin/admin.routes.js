const router = require("express").Router();
const { vrefiyAccessToken } = require("../../http/middleware/verifyAccesssToken");
const { blogAdminApiRoute } = require("./blog");
const { categoryAdminApiRoute } = require("./category");
const { chapterAdminApiRoute } = require("./chapter");
const { courseAdminApiRouter } = require("./course");
const { productAdminApiRoute } = require("./product");

router.use("/course", courseAdminApiRouter);
router.use("/category", categoryAdminApiRoute);
router.use("/blogs", blogAdminApiRoute);
router.use("/product", productAdminApiRoute);
router.use("/chapter", chapterAdminApiRoute);

module.exports = {
  adminRoutes: router,
};
