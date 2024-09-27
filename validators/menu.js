const validator = require("fastest-validator");

const v = new validator();

const schema = {
  title: { type: "string", min: 1, max: 255 },
  href: { type: "string", min: 1, max: 255 },
  parent: { type:"string" ,optional: true, min: 1, max: 510 },
  $$strict: true,
};

const check = v.compile(schema);

module.exports = check;