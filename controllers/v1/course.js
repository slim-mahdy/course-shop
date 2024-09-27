const courseModel = require("./../../models/course");
const sessionsModel = require("./../../models/sessions");
const courseUserModel = require("./../../models/courseUser");
const commentsModel = require("./../../models/comment");
const categoryModel = require("./../../models/category");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const {
    name,
    description,
    support,
    href,
    price,
    status,
    discount,
    categoryID,
  } = req.body;

  const course = await courseModel.create({
    name,
    description,
    support,
    creator: req.user._id,
    href,
    price,
    status,
    discount,
    categoryID,
    cover: req.file.filename,
  });

  const mainCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json(mainCourse);
};

exports.getOne = async (req, res) => {
  const { href } = req.params;

  const course = await courseModel
    .findOne({ href })
    .populate("creator", "-password")
    .populate("categoryID");

  const sessions = await sessionsModel
    .find({ course: course._id })
    .populate("course")
    .lean();
  const comments = await commentsModel
    .find({ course: course._id, isAccept: 1 })
    .populate("course")
    .populate("creator", "-password")
    .lean();

  const courseSrudentscount = await courseUserModel
    .find({ course: course._id })
    .count();

  const isUserRegisteredToThisCourse = !!(await courseUserModel.find({
    user: req.user._id,
    course: course._id,
  }));

  let allComennts = [];

  comments.forEach((comment) => {
    comments.forEach((answerComment) => {
      if (String(comment._id) == answerComment.mainCommentId) {
        allComennts.push({
          ...comment,
          course: comment.course.name,
          creator: comment.creator.name,
          answerComment,
        });
      }
    });
  });

  res.json({
    course,
    sessions,
    comments: allComennts,
    courseSrudentscount,
    isUserRegisteredToThisCourse,
  });
};

exports.createSession = async (req, res) => {
  const { title, time, free } = req.body;
  const { id } = req.params;

  const sessions = await sessionsModel.create({
    title,
    time,
    free,
    course: id,
    video: req.file.filename,
  });

  return res.status(201).json(sessions);
};

exports.getAll = async (req, res) => {
  const courses = await courseModel
    .find({})
    .populate("categoryID")
    .populate("creator")
    .lean();

  const registers = await courseUserModel.find({}).lean();
  const comments = await commentsModel.find({}).lean();

  const allCourses = [];

  courses.forEach((course) => {
    let totalScores = null;
    let i = null;

    const courseRegisters = registers.filter(
      (register) => String(register.course) == String(course._id)
    );

    const courseComments = comments.filter(
      (comment) => String(comment.course) == String(course._id)
    );

    courseComments.forEach((comment) => {
      totalScores += comment.score;
      i++;
    })

    allCourses.push({
      ...course,
      categoryID : course.categoryID.title,
      creator : course.creator.name,
      registers : courseRegisters.length,
      courseAveragScore : totalScores / i,
    });    
  });

  return res.json(allCourses)
};

exports.getAllSessions = async (req, res) => {
  const sessions = await sessionsModel.find({}).populate("course").lean();
  return res.json(sessions);
};

exports.getSessionInfo = async (req, res) => {
  const { sessionID } = req.params;

  const isValidId = isValidObjectId(sessionID);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const course = await courseModel.findOne({ href: req.params.href }).lean();

  const session = await sessionsModel.findOne({ _id: sessionID });

  const sessions = await sessionsModel.find({ course: course._id });

  return res.json({ session, sessions });
};

exports.removeSessions = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const deletedSession = await sessionsModel.findOneAndDelete({ _id: id });

  if (!deletedSession) {
    return res.status(201).json({ message: "session in not found!!" });
  }

  const message = "session is deleted succecfully :";

  return res.json({ message, deletedSession });
};

exports.register = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  const isValidCourseID = isValidObjectId(id);
  if (!isValidCourseID) {
    return res.status(409).json({ message: "course id is not valid" });
  }

  const isUserAlreadyRegistered = await courseUserModel.findOne({
    user: req.user._id,
    course: id,
  });

  if (isUserAlreadyRegistered) {
    return res.status(409).json({ message: "user already registered" });
  }

  const register = await courseUserModel.create({
    user: req.user._id,
    course: id,
    price,
  });

  return res.status(201).json({ message: "you are Registered successfully" });
};

exports.getCourseByCategory = async (req, res) => {
  const { href } = req.params;

  const category = await categoryModel.findOne({ href });

  if (category) {
    const categoryCourses = await courseModel.find({
      categoryID: category._id,
    });

    res.json(categoryCourses);
  } else {
    res.json([]);
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return res.status(409).json({ message: "objectID is not valid :{" });
  }

  const removedCourse = await courseModel.findOneAndRemove({ _id: id });

  if (!removedCourse) {
    return res.status(404).json({ message: "course not found :(" });
  }

  return res.json(removedCourse);
};

exports.getRelated = async (req, res) => {
  const { href } = req.params;

  const course = await courseModel.findOne({ href });
  if (!course) {
    return res.status(404).json({ message: "course not found" });
  }

  let relatedCourses = await courseModel.find({
    categoryID: course.categoryID,
  });

  relatedCourses = relatedCourses.filter((course) => href !== course.href);

  res.json(relatedCourses);
};

exports.popular = async (req, res) => {
  const courses = await courseModel.find({}).lean();
  let sumscores = null;
  let sumcomment = null;
  for (let i = 0; i < courses.length; i++) {
    // score [id : .... , score : 5,.....]
    sumscores = 0;
    sumcomment = 0;
    courses[i].score = await commentsModel
      .find({ course: courses[i]._id })
      .select("score")
      .lean();
    for (let j = 0; j < courses[i].score.length; j++) {
      sumscores += courses[i].score[j].score;
      sumcomment += 1;
    }
    courses[i].sumscore = sumscores / sumcomment;
  }

  courses.sort((a, b) => {
    return b.sumscore - a.sumscore;
  });

  res.json(courses);
};

exports.presell = async (req, res) => {
  const presellCourse = await courseModel.find({ status: "presell" }).lean();

  res.json(presellCourse);
};
