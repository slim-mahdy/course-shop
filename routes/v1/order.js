const express = require('express');

const authMiddleware = require("./../../middlewares/auth");
const orderController = require('./../../controllers/v1/order');


const router = express.Router();

router.route("/").get(authMiddleware,orderController.getAll)
router.route("/:id").get(authMiddleware,orderController.get)

module.exports = router;
