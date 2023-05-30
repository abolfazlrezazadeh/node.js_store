const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");

const blogSchema = new mongoose.Schema(
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
blogSchema.virtual("users", {
  ref: "user",
  localField: "_id", 
  foreignField: "author",
});
blogSchema.virtual("category_detail", {
  ref: "category",
  localField: "_id",
  foreignField: "category",
});
blogSchema.virtual("imageURL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
});
module.exports = {
  blogModel: mongoose.model("blog", blogSchema),
};
