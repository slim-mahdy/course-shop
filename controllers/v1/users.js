const userModel = require("./../../models/user");
const banUserModel = require("./../../models/ban-phone");
const bcrypt = require("bcrypt");
const { isValidObjectId } = require("mongoose");

exports.banUser = async (req, res) => {
  const mainUser = await userModel.findOne({ _id: req.params.id }).lean();

  banUserResult = banUserModel.create({ phone: mainUser.phone });

  if (banUserModel) {
    return res.status(200).json({ message: "user baned succesffuly :)" });
  }

  return res.status(500).json({ message: "server error" });
};

exports.getAll = async (req, res) => {
  const users = await userModel.find({}).select("-password");

  res.json(users);
};

exports.removeUser = async (req, res) => {
  const isValidId = isValidObjectId(req.params.id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const removedUser = await userModel.findByIdAndRemove({ _id: req.params.id });

  if (!removedUser) {
    return res.status(404).json({ message: "ther is no user" });
  }

  res.status(200).json({ message: "user removed successfully" });
};

exports.chengRole = async (req, res) => {
  const { id } = req.body;
  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const user = await userModel.findOne({ _id: id });

  let newRole = user.role == "ADMIN" ? "USER" : "ADMIN";

  const updatedUser = await userModel.findByIdAndUpdate(
    { _id: id },
    { role: newRole }
  );

  if (updatedUser) {
    return res.json({ message: "role cheng successfully :)" });
  }
};

exports.updateUser = async (req, res) => {
  const { name, username, password, email, phone } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const user = await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    {
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    }
  ).select("-password").lean();

  return res.json(user)
};
