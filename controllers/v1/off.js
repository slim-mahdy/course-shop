const offModel = require("./../../models/off");
const courseModel = require("./../../models/course");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  const offs = await offModel
    .find({}, "-__v")
    .populate("course", "name href price")
    .populate("creator", "name")
    .lean();

  return res.json(offs);
};

exports.create = async (req, res) => {
  const { code, percent, course, max } = req.body;

  const newOff = await offModel.create({
    code,
    percent,
    course,
    max,
    uses: 0,
    creator: req.user._id,
  });

  if (!newOff) {
    return res.status(404).json({ message: "can not creat new off :((" });
  }

  return res.status(201).json(newOff);
};

exports.setOnAll = async (req, res) => {
  const { discount } = req.body;

  const coursesDiscount = await courseModel.updateMany({ discount });

  if (!coursesDiscount) {
    return res.status(404).json({ message: "cant set Discount on Course :(" });
  }

  return res.json({ message: "Discount set on all Course successfully :))" });
};

exports.getOne = async (req, res) => {
  const { code } = req.params;
  const { course } = req.body;
  const isValidId = isValidObjectId(course);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const off = await offModel.findOne({code , course})

  if (!off) {
    return res.status(404).json({message: "conde is not valid :(("})
  }else if (off.max == off.uses) {
    return res.status(409).json({message : "code is already used :(("})
  }else{
    await offModel.findOneAndUpdate({
        code,course
    },{
        uses : off.uses + 1
    })

    return res.json(off);
  }
};

exports.remove = async (req, res) => {
  const {id} =req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const deletedOff = await offModel.findOneAndRemove({_id:id});

  return res.json({message :"deleted successfully :)",deletedOff});
};
