const router = require("express").Router();
const { checkPremission } = require("../../http/middleware/permission.guard");
const { blogAdminApiRoute } = require("./blog");
const { categoryAdminApiRoute } = require("./category");
const { chapterAdminApiRoute } = require("./chapter");
const { courseAdminApiRouter } = require("./course");
const { episodeAdminApiRoute } = require("./episode");
const { premissionAdminApiRoute } = require("./premission");
const { productAdminApiRoute } = require("./product");
const { roleAdminApiRoute } = require("./role");
const { userAdminApiRouter } = require("./user");

router.use("/course", courseAdminApiRouter);
router.use("/category", categoryAdminApiRoute);
router.use("/blogs", blogAdminApiRoute);
router.use("/product", productAdminApiRoute);
router.use("/chapter", chapterAdminApiRoute);
router.use("/episode", episodeAdminApiRoute);
router.use("/user",checkPremission(["USER" , "ADMIN"]), userAdminApiRouter);
router.use("/role", roleAdminApiRoute);
router.use("/premission", premissionAdminApiRoute);

module.exports = {
  adminRoutes: router,
};
