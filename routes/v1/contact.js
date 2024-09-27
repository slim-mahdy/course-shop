const express = require("express");
const router = express.Router();

const contactController = require("./../../controllers/v1/contact");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

router
.route("/")
.get(authMiddleware, isAdminMiddleware, contactController.getAll)
.post(contactController.create);

router
.route("/:id")
.delete(authMiddleware, isAdminMiddleware, contactController.remove);
router
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, contactController.answer);

module.exports = router;
