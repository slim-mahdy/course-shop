const jwt = require("jsonwebtoken");
const userModel = require("./../models/user");

module.exports = async (req, res, next) => {
  

  let authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(403).json({
      message:"you dont have token:!"
  })
  }

  authHeader = authHeader.split(" ");

  if (authHeader.length !== 2) {
    return res.status(403).json({
        message:"you dont have access to this(its protected:)"
    })
  }

  const token = authHeader[1];

  try {
    const jwtPayload = jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findById(jwtPayload.id).lean();
    Reflect.deleteProperty(user,"password")

    req.user = user;

    next()
    
  } catch (error) {
    return res.json(error)
  }
};
