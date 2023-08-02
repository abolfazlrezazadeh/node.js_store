const { Kind } = require("graphql");

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

module.exports = {
  toObject,
  praseValueNode,
  parseLiteral,
  parseObject,
};
