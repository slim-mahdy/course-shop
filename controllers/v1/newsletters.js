const newsletterModel = require("./../../models/newsletter");

exports.getAll = async (req, res) => {
  const newsletters = await newsletterModel.find({}).lean();

  return res.json(newsletters);
};

exports.create = async (req, res) => {
  const { email } = req.body;

  const checkEmail = email.split("@");

  console.log(checkEmail[1]);

  if (
    checkEmail[1] == "gmail.com" ||
    checkEmail[1] == "yahoo.com" ||
    checkEmail[1] == "email.com"
  ) {
    const newsletter = await newsletterModel.create({ email });
    return res.json({ message: "your Email added successfully :))", newsletter });
  }else{

      return res.json({ message: "please Enter real email address :(" });
  }

};
