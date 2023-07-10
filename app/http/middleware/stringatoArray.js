// tag1#tag2#tag_3#
// string                           => [...values] || [value] || []
// undefind || null

const StringToArray = function (field) {
  return function (req, res, next) {
    if (req.body[field]) {
      if (typeof req.body[field] == "string") {
        if (req.body[field].indexOf("#") >= 0) {
          req.body[field] = req.body[field]
            .split("#")
            .map((item) => item.trim());
        } else if (req.body[field].indexOf(",") >= 0) {
          req.body[field] = req.body[field]
            .split(",")
            .map((item) => item.trim());
        } else {
          // if tag have one item
          req.body[field] = [req.body[field]];
        }
      } else if (Array.isArray(req.body[field])) {
        req.body[field] = req.body[field].map((item) => item.trim());
        req.body[field] = [...new Set(req.body[field])];
      }
      if (Array.isArray(req.body[field])) {
        req.body[field] = req.body[field].map((item) => item.trim());
        req.body[field] = [...new Set(req.body[field])];
      }
    } else {
      req.body[field] = [];
    }
    // for (const iterator of object) {

    // }
    next();
  };
};

module.exports = {
  StringToArray,
};
