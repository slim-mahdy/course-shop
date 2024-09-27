const userModel = require("./../../models/user");
const banUserModel = require("./../../models/ban-phone");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerValidator = require("./../../validators/register");

exports.register = async (req, res) => {
  const validaionResult = registerValidator(req.body);
  if (validaionResult != true) {
    return res.status(422).json(validaionResult);
  }

  const { name, username, email, password, phone } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(409).json({
      message: "user is already exist",
    });
  }

  const isUserBan = await banUserModel.find({ phone });

  if (isUserBan.length) {
    return res.status(409).json({ message: "user is ban dont try ):(" });
  }

  const countOfUsers = await userModel.count();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    username,
    email,
    phone,
    password: hashedPassword,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });

  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, "password");

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day",
  });

  return res.status(201).json({ user: userObject, accessToken });
};
exports.login = async (req, res) => {
  const { identifire, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email: identifire }, { username: identifire }],
  });

  if (!user) {
    return res.status(401).json({
      message: "ther is not user with this username or email",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password is not valid:(",
    });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return res.json(accessToken)
};
exports.getMe = async (req, res) => {};
