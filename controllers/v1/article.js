const articleModel = require("./../../models/article");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  const articles = await articleModel.find().lean();

  return res.json(articles);
};

exports.create = async (req, res) => {
  const { title, description, body, href, category, publish } = req.body;

  const article = await articleModel.create({
    title,
    description,
    body,
    href,
    category,
    publish,
    creator: req.user._id,
    cover: req.file.filename,
  });

  res.status(201).json({ Message: "article created successfully", article });
};

exports.getOne = async (req, res) => {
  const { href } = req.params;

  const article = await articleModel.findOne({ href });

  if (!article) {
    return res.status(409).json({ Message: "Article not found" });
  }

  res.json(article);
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({ message: "object id is not valid" });
  }

  const deletedArticle = await articleModel.findByIdAndRemove(id);

  if (!deletedArticle) {
    return res.status(409).json({ message: "artiicle not found !!!" });
  }

  return res.json({
    message: "article deleted successfully :))",
    deletedArticle,
  });
};

exports.saveDraft = async (req, res) => {
  
  const { title, description, body, href, category,id } = req.body;

  if (!id) {
    const saveDraftArticle = await articleModel.create({
      title,
      description,
      body,
      href,
      category,
      publish: 0,
      creator: req.user._id,
      cover: req.file.filename,
    });

    return res
      .status(201)
      .json({ message: "Draft saved successfully :))", saveDraftArticle });
  }

  const updatedArticle = await articleModel.findOneAndUpdate(
    { _id: id },
    {
      body,
    }
  );

  return res.json({message:"Draft updated successfully", updatedArticle});
};
