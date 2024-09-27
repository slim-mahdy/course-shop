const courseModel = require("./../../models/course");

exports.get = async (req, res) => {
  const { keyword } = req.params;

  const courses = await courseModel.find({
    name : {$regex :".*" + keyword + ".*"}
  })

  res.json(courses);
};
