const mongoose = require("mongoose");
//reply comment
const answerComment = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    // premission to show the comment
    show: { type: Boolean, required: true, default: false },
    openToComment : {type : Boolean , default : false}
  },
  {
    timestamps: { createdAt: true },
  }
);
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    // premission to show the comment
    show: { type: Boolean, required: true, default: false },
    openToComment: { type: Boolean, default: true },
    answers: { type: [answerComment], default: [] },
  },
  {
    timestamps: { createdAt: true },
  }
);

module.exports = {
  commentSchema,
};
