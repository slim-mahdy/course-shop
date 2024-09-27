const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerStorage = require("./../../utils/uploder");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const courseController = require("./../../controllers/v1/course");

router
.route("/")
.post(
  multer({ storage: multerStorage, limits: { fileSize: 10000000 } }).single(
    "cover"
    ),
    authMiddleware,
    isAdminMiddleware,
    courseController.create
    ).get(authMiddleware,isAdminMiddleware,courseController.getAll);
    
    
    
    router.route("/related/:href").get(courseController.getRelated)

    
    router.route("/category/:href").get(courseController.getCourseByCategory)
    
    router.route("/:id/register").post(authMiddleware , courseController.register );
    
    router.route("/:id/sessions").post(
      multer({
        storage: multerStorage,
        limits: { fileSize: 1000000000000 },
      }).single("video"),
      authMiddleware,
      isAdminMiddleware,
      courseController.createSession
      );
      
      router.route("/popular").get(courseController.popular)
      router.route("/presell").get(courseController.presell)
      
      router.route("/sessions").get(authMiddleware, isAdminMiddleware, courseController.getAllSessions);
      router.route("/:href/:sessionID").get(courseController.getSessionInfo);
      router.route("/sessions/:id").delete(authMiddleware,isAdminMiddleware,courseController.removeSessions)
      router.route("/:href").get(authMiddleware,courseController.getOne)    
      router.route("/:id").delete(authMiddleware, isAdminMiddleware ,courseController.remove)
      
      
      module.exports = router;
