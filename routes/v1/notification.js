const express = require("express");
const router = express.Router();
const notificationController = require("./../../controllers/v1/notification");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, notificationController.create)
  .get(authMiddleware, isAdminMiddleware, notificationController.getAll);

router
  .route("/admins")
  .get(authMiddleware, isAdminMiddleware, notificationController.get);

router
  .route("/:id/seen")
  .put(authMiddleware, isAdminMiddleware, notificationController.seen);

router
  .route("/:id/remove")
  .delete(authMiddleware, isAdminMiddleware, notificationController.remove);

module.exports = router;
