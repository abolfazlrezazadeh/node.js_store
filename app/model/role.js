const { default: mongoose } = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String, default: "" },
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
  roleModel: mongoose.model("role", roleSchema),
};
