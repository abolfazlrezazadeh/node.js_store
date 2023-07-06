const { default: mongoose } = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    premissions: {
      type: [mongoose.Types.ObjectId],
      ref: "premissions",
      default: [],
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = {
  roleController: mongoose.model("role", roleSchema),
};
