const { Kind } = require("graphql");
const { blogModel } = require("../model/blog");
const { courseModel } = require("../model/course");
const { productModel } = require("../model/product");
const createHttpError = require("http-errors");

function parseObject(valueNode) {
  const value = Object.create(null);
  valueNode.fields.forEach((field) => {
    value[field.name.value] = praseValueNode(field.value);
  });
}
function praseValueNode(valueNode) {
  switch (valueNode.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.FLOAT:
    case Kind.INT:
      return Number(valueNode.value);
    case Kind.OBJECT:
      return parseObject(valueNode.value);
    case Kind.LIST:
      return valueNode.values.map((value) => praseValueNode(value));
    default:
      return null;
  }
}
function parseLiteral(valueNode) {
  switch (valueNode.kind) {
    case Kind.STRING:
      return valueNode.value.charAt === "{"
        ? JSON.parse(valueNode.value)
        : valueNode.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(valueNode.value);
    case Kind.OBJECT:
      return;
    default:
  }
}
function toObject(value) {
  if (typeof value === "object") return value;
  if (typeof value === "string" && value.charAt(0) === "{")
    return JSON.parse(value);
}
async function checkExistBlog(id) {
  const blog = await blogModel.findOne({ _id: id });
  if (!blog) throw createHttpError.NotFound("Blog not found");
  return blog;
}
async function checkExistCourse(id) {
  const course = await courseModel.findOne({ _id: id });
  if (!course) throw createHttpError.NotFound("course not found");
  return course;
}
async function checkExistProduct(id) {
  const product = await productModel.findOne({ _id: id });
  if (!product) throw createHttpError.NotFound("product not found");
  return product;
}
module.exports = {
  toObject,
  praseValueNode,
  parseLiteral,
  parseObject,
  checkExistBlog,
  checkExistCourse,
  checkExistProduct
};
