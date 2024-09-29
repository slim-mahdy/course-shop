// hello world
const express = require("express");


const authRouter = require("./routes/v1/auth");
const usersRouter = require('./routes/v1/users');
const categoryRouter = require('./routes/v1/category');
const coursesRouter = require('./routes/v1/course');
const commentRouter = require('./routes/v1/comment');
const contactRouter = require('./routes/v1/contact');
const newsletterRouter = require('./routes/v1/newsletter');
const searchRouter = require('./routes/v1/search');
const notificationRouter = require('./routes/v1/notification');
const offsRouter = require('./routes/v1/off');
const articleRouter = require('./routes/v1/article');
const orderRouter = require('./routes/v1/order');
const ticketRouter = require('./routes/v1/ticket');
const menuRouter = require('./routes/v1/menu');

const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/v1/auth",authRouter);
app.use("/v1/users",usersRouter);
app.use("/v1/category",categoryRouter);
app.use("/v1/courses",coursesRouter);
app.use("/v1/comments",commentRouter);
app.use("/v1/contacts",contactRouter);
app.use("/v1/newsletters",newsletterRouter);
app.use("/v1/search",searchRouter);
app.use("/v1/notification",notificationRouter);
app.use("/v1/offs",offsRouter);
app.use("/v1/article",articleRouter);
app.use("/v1/orders",orderRouter);
app.use("/v1/tickets",ticketRouter);
app.use("/v1/menus",menuRouter);

module.exports = app;
