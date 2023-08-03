const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    comment: { type: String, required: true },
    // premission to show the comment
    show: { type: Boolean, required: true, default: false },
    openToComment: { type: Boolean, default: true },
    parent: { type: mongoose.Types.ObjectId },
  },
  {
    timestamps: { createdAt: true },
  }
);

module.exports = {
  commentSchema,
};
