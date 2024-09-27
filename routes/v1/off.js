const express = require("express");
const router = express.Router();
const offController = require("./../../controllers/v1/off");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, offController.getAll)
  .post(authMiddleware, isAdminMiddleware, offController.create);

router
  .route("/all")
  .post(authMiddleware, isAdminMiddleware, offController.setOnAll);

router
  .route("/:code")
  .post(authMiddleware, isAdminMiddleware, offController.getOne);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, offController.remove);

module.exports = router;
