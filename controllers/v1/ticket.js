const departmentModle = require("./../../models/department");
const subDepartmentModle = require("./../../models/departmentsub");
const ticketsModle = require("./../../models/ticket");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const { departmentID, departmentsubID, priority, title, body, course } =
    req.body;

  const ticket = await ticketsModle.create({
    departmentID,
    departmentsubID,
    priority,
    title,
    body,
    course,
    user: req.user._id,
    answer: 0,
    isAnswer: 0,
  });

  if (!ticket) {
    return res.status(404).json({ message: "can't create ticket" });
  }

  const mainTicket = await ticketsModle
    .findOne({ _id: ticket._id })
    .populate("departmentID")
    .populate("departmentsubID")
    .populate("user")
    .lean();

  return res.status(201).json(mainTicket);
};

exports.getAll = async (req, res) => {
  const tickets = await ticketsModle
    .find({ answer: 0 })
    .populate("departmentID", "title")
    .populate("departmentsubID", "title")
    .populate("user", "name")
    .lean();

  return res.json(tickets);
};

exports.userTickets = async (req, res) => {
  const tickets = await ticketsModle
    .find({ user: req.user._id })
    .sort({_id : -1})
    .populate("departmentID", "title")
    .populate("departmentsubID", "title")
    .populate("user", "name")
    .lean();

    if (!tickets) {
      return res.status(404).json({message :"No tickets found :(("})
    }

    return res.json(tickets);
};

exports.departments = async (req, res) => {
  const departments = await departmentModle.find({}).lean();

  return res.json(departments);
};

exports.departmentsSubs = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const departmentSubs = await subDepartmentModle.find({ parent: id }).lean();

  return res.json(departmentSubs);
};

exports.setAnswer = async (req, res) => {
  const { body, ticketID } = req.body;

  const isValidId = isValidObjectId(ticketID);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const ticket = await ticketsModle.findOneAndUpdate(
    { _id: ticketID },
    { answer: 1 }
  );

  const answerTicket = await ticketsModle.create({
    title: "answer your ticket",
    departmentID: ticket.departmentID,
    departmentsubID: ticket.departmentsubID,
    priority: ticket.priority,
    body,
    patent: ticketID,
    course: ticket.course,
    user: req.user._id,
    answer: 0,
    isAnswer: 1,
  });

  return res.status(201).json(answerTicket);
};

exports.getAnswer = async (req, res) => {
  const { id } = req.params;
  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const ticket = await ticketsModle.findOne({ _id: id });
  const answerTicket = await ticketsModle.findOne({ patent: id });

  return res.json({
    ticket,
    answerTicket,
  });
};

exports.createDepartments = async (req, res) => {
  const { title } = req.body;

  const department = await departmentModle.create({
    title,
  });

  return res.status(201).json(department);
};

exports.createDepartmentsSub = async (req, res) => {
  const { title, parent } = req.body;

  const departmentSub = await subDepartmentModle.create({
    title,
    parent,
  });

  return res.status(201).json(departmentSub);
};
