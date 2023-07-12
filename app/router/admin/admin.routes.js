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

router.use("/course",checkPremission([PERMISSIONS.COURSES]), courseAdminApiRouter);
router.use("/category",checkPremission([PERMISSIONS.CATEGORY]), categoryAdminApiRoute);
router.use("/blogs",checkPremission([PERMISSIONS.BLOGS]), blogAdminApiRoute);
router.use("/product",checkPremission([PERMISSIONS.PRODUCTS]), productAdminApiRoute);
router.use("/chapter", checkPremission([PERMISSIONS.CHAPTERS]),chapterAdminApiRoute);
router.use("/episode",checkPremission([PERMISSIONS.EPISODES]), episodeAdminApiRoute);
router.use("/user",checkPremission([PERMISSIONS.USER]), userAdminApiRouter);
router.use("/role",checkPremission([PERMISSIONS.ALL]), roleAdminApiRoute);
router.use("/premission",checkPremission([PERMISSIONS.ALL]), premissionAdminApiRoute);

module.exports = {
  adminRoutes: router,
};
