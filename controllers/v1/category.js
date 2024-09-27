const categoryModel = require("./../../models/category");
const validator = require("./../../validators/category");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const validaionResult = validator(req.body);

  if (validaionResult != true) {
    return res.status(409).json(validaionResult);
  }

  const { title, href } = req.body;
  const category = await categoryModel.create({ title, href });
  res.json(category);
};
exports.getAll = async (req, res) => {
  const category = await categoryModel.find({});
  res.json(category);
};
exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const category = await categoryModel.findOneAndRemove({ _id: id });
  res.json({ message: "category deleted successfully" });
};
exports.update = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const validaionResult = validator(req.body);

  if (validaionResult != true) {
    return res.status(409).json(validaionResult);
  }

  const { title, href } = req.body;

  const updatedCategory = await categoryModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      href,
    }
  );

  if (!updatedCategory) {
    res.json({ message: "category not found" });
  }

  res.json(updatedCategory)
};
