const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");

const schema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    shortText: { type: String, required: true },
    image: { type: String },
    tags: { type: [String], default: [] },
    category: { type: [mongoose.Types.ObjectId], required: true },
    comments: { type: [commentSchema], default: [] },
    like: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    disLike: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);
schema.virtual("users", {
  ref: "user",
  localField: "_id", 
  foreignField: "author",
});
schema.virtual("category_detail", {
  ref: "category",
  localField: "_id",
  foreignField: "category",
});
module.exports = {
  blogModel: mongoose.model("blog", schema),
};
