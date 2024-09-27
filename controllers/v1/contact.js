const contactModel = require("./../../models/contact");
const nodemailer = require('nodemailer');
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({}).lean();

  return res.json(contacts);
};

exports.create = async (req, res) => {
  const { name, email, phone, body } = req.body;

  const contact = await contactModel.create({
    name,
    email,
    phone,
    body,
    answer: 0,
  });

  if (!contact) {
    return res.status(404).json({ message: "Couldn't create contact" });
  }

  const message = "message send successfully :)";

  return res.status(201).json({ message, contact });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidCourseID = isValidObjectId(id);
  if (!isValidCourseID) {
    return res.status(409).json({ message: "objectID is not valid" });
  }

  const deleted = await contactModel.findOneAndRemove({ _id: id });

  if (!deleted) {
    return res.status(404).json({ message: "cant find someThing for delete" });
  }

  return res.json({ message: "deleted successfully :)", deleted });
};

exports.answer = async (req, res) => {
  const {email , answer} =req.body;

  let transporter = nodemailer.createTransport({
    service : "gmail",
    auth:{
      user:"mahdyamiri2019@gmail.com",
      pass:"vlsy sman ewoc rzsg"
    }
  })

  const mailOptions = {
    from:"example@gmail.com",
    to: email,
    subject:"answer your question from us",
    text:answer
  }

  transporter.sendMail(mailOptions,async (error, info) => {
    if (error) {
      return res.json({ message: error})
    }else{
      const contact = await contactModel.findOneAndUpdate({email},{answer :1})

      return res.json({message : "Email send successfully :))"})
    }
  })
};
