const menuModel = require("./../../models/menu");
const validator = require("./../../validators/menu");
exports.getAll = async (req, res) => {
  const menus = await menuModel.find({}).lean();

  menus.forEach(menu => {
    let submenus = []
    for (let i = 0; i < menus.length; i++) {
      const mainMenu = menus[i]; 
      if (String(mainMenu.parent) == String(menu._id)) {
        submenus.push(menus.splice(i, 1));
        i = i - 1;
      }   
    }
    menu.submenus = submenus;
  })

  return res.json(menus);

};

exports.create = async (req, res) => {
  const validaionResult = validator(req.body);

  if (validaionResult != true) {
    return res.status(409).json(validaionResult);
  }

  const { title, href, parent } = req.body;
  const menu = await menuModel.create({
    title,
    href,
    parent,
  });

  if (!menu) {
    return res.status(404).json({message : "cant create menu!!!!"});
  }

  return res.json(menu);
};

exports.getAllInPanel = async (req, res) => {};

exports.remove = async (req, res) => {};
