const express = require("express");
const router = express.Router();
const newsletterController = require("./../../controllers/v1/newsletters");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, newsletterController.getAll)
  .post(newsletterController.create);

module.exports = router;
