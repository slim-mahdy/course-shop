const express = require("express");

const ticketController = require("./../../controllers/v1/ticket");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, ticketController.create)
  .get(authMiddleware, isAdminMiddleware, ticketController.getAll);

router.route("/user").get(authMiddleware, ticketController.userTickets);

router
  .route("/departments")
  .get(authMiddleware, ticketController.departments)
  .post(authMiddleware, isAdminMiddleware, ticketController.createDepartments);

router
  .route("/departmentsSub")
  .post(
    authMiddleware,
    isAdminMiddleware,
    ticketController.createDepartmentsSub
  );

router
  .route("/departments/:id/subs")
  .get(authMiddleware, ticketController.departmentsSubs);

router
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, ticketController.setAnswer);

router.route("/:id/answer").get(authMiddleware, ticketController.getAnswer);

module.exports = router;
