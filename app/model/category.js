const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      default: undefined,
    },
  },
  {
    id: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);
schema.virtual("children", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
});
function aoutoPopulate(next) {
  this.populate([{ path: "children", select: { __v: 0, id: 0 } }]);
  next();
}
schema.pre("findOne", aoutoPopulate).pre("find", aoutoPopulate);
module.exports = {
  categoryModel: mongoose.model("category", schema),
};
