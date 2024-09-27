const commentModel = require("./../../models/comment");
const courseModel = require("./../../models/course");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const { body, courseHref, score } = req.body;

  const course = await courseModel.findOne({ href: courseHref }).lean();

  const comment = await commentModel.create({
    body,
    course: course._id,
    creator: req.user._id,
    isAccept: 0,
    isAnswer: 0,
    score,
  });

  return res.status(201).json(comment);
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const deletedComment = await commentModel.findOneAndRemove({ _id: id });

  if (!deletedComment) {
    return res.status(404).json({ message: "comment not found!" });
  }

  const message = "comment deleted successfully :)";

  res.json({ message, deletedComment });
};

exports.accept = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const acceptedComment = await commentModel.findOneAndUpdate(
    {
      _id: id,
    },
    { isAccept: 1 }
  );

  if (!acceptedComment) {
    return res.status(404).json({ message: "comment not found!" });
  }

  res.json({ message: "comment accepted successfully:)" });
};

exports.reject = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const rejectedComment = await commentModel.findOneAndUpdate(
    {
      _id: id,
    },
    { isAccept: 0 }
  );

  if (!rejectedComment) {
    return res.status(404).json({ message: "comment not found!" });
  }

  res.json({ message: "comment rejeceted successfully:)" });
};

exports.answer = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const acceptedComment = await commentModel.findOneAndUpdate(
    { _id: id },
    { isAccept: 1 }
  );

  if (!acceptedComment) {
    return res.status(404).json({ message: "comment not found! :(" });
  }

  const answerComment = await commentModel.create({
    body,
    course: acceptedComment.course,
    creator: req.user._id,
    isAccept: 1,
    isAnswer: 1,
    mainCommentId: id,
  });

  return res.status(201).json(answerComment);
};

exports.getAll = async (req, res) => {
  const comments = await commentModel
    .find({})
    .populate("course" , "name")
    .populate("creator","name")
    .lean();

  let allComennts = [];
  let i = true;
  comments.forEach((comment) => {
    i =true;
    comments.forEach((answerComment) => {
      if (String(comment._id) == String(answerComment.mainCommentId)) {
        i = false;
        comment.answer = answerComment;
        allComennts.push({
          ...comment,
          course: comment.course.name,
          creator: comment.creator.name,
        });
      }
    }); 
  if (i && comment.isAnswer === 0) {
    i = false;
    allComennts.push({
      ...comment
    })
  } 
  });

  res.json(allComennts);
};
