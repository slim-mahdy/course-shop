const notificationModel = require("./../../models/notification");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const { message, admin } = req.body;

  const isValidId = isValidObjectId(admin);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const notification = await notificationModel.create({
    message,
    admin,
  });

  res
    .status(201)
    .json({ message: "notification created successfully :))", notification });
};

exports.get = async (req, res) => {
  const { _id } = req.user;

  const isValidId = isValidObjectId(_id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const notifications = await notificationModel.find({ admin: _id }).lean();

  return res.json(notifications);
};

exports.seen = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const notification = await notificationModel.findOneAndUpdate({_id :id},{
    seen :1
  })

  res.json({message:"notification updated (seen :1) successfully :)",notification})

};

exports.getAll = async (req, res) => {
  const notifications = await notificationModel.find({}).populate("admin" ,"-password").lean();

  return res.json(notifications);
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const notification = await notificationModel.findByIdAndRemove(id).lean();

  return res.json(notification);
};

