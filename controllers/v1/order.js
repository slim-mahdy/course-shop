const courseUserModel = require("./../../models/courseUser");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  const orders = await courseUserModel
    .find({ user: req.user._id })
    .populate("course", "name href")
    .lean();

  if (orders.length <= 0) {
    return res.status(404).json({ message: "cant find any order :((" });
  }

  return res.json(orders);
};

exports.get = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const order = await courseUserModel
    .findOne({ _id: id })
    .populate("course", "name href")
    .lean();


    return res.json(order);
};
