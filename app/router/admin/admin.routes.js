const router = require("express").Router();
const { checkPremission } = require("../../http/middleware/permission.guard");
const { PERMISSIONS } = require("../../utils/constants");
const { blogAdminApiRoute } = require("./blog");
const { categoryAdminApiRoute } = require("./category");
const { chapterAdminApiRoute } = require("./chapter");
const { courseAdminApiRouter } = require("./course");
const { episodeAdminApiRoute } = require("./episode");
const { premissionAdminApiRoute } = require("./premission");
const { productAdminApiRoute } = require("./product");
const { roleAdminApiRoute } = require("./role");
const { userAdminApiRouter } = require("./user");

router.use("/category", checkPremission([PERMISSIONS.CONTENT_MANAGER]), categoryAdminApiRoute);
router.use("/blogs", checkPremission([PERMISSIONS.CONTENT_MANAGER]), blogAdminApiRoute);
router.use("/product", checkPremission([PERMISSIONS.CONTENT_MANAGER]), productAdminApiRoute);
router.use("/course", checkPremission([PERMISSIONS.TEACHER]), courseAdminApiRouter);
router.use("/chapter", checkPremission([PERMISSIONS.TEACHER]), chapterAdminApiRoute);
router.use("/episode", checkPremission([PERMISSIONS.TEACHER]), episodeAdminApiRoute);
router.use("/user", userAdminApiRouter);
router.use("/role", checkPremission([PERMISSIONS.ADMIN]), roleAdminApiRoute);
router.use("/premission", checkPremission([PERMISSIONS.ADMIN]), premissionAdminApiRoute);

module.exports = {
  adminRoutes: router,
};
