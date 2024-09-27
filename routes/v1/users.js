const exprerss = require("express");

const userController = require("./../../controllers/v1/users");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const router = exprerss.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, userController.getAll)
  .put(authMiddleware,userController.updateUser);

router
  .route("/ban/:id")
  .post(authMiddleware, isAdminMiddleware, userController.banUser);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, userController.removeUser);

router
  .route("/role")
  .put(authMiddleware, isAdminMiddleware, userController.chengRole);

module.exports = router;
