const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");

const episodes = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "unlock" /* types: unlock / lock */ },
    time: { type: String, required: true },
    videoAddress: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
episodes.virtual("videoUrl").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`;
});
const chapter = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, default: "" },
    episodes: { type: [episodes], default: [] },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    bio: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    disLikes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    price: { type: Number, required: true },
    disCount: { type: Number, default: 0 },
    type: {
      type: String,
      default: "free" /*cash, free , premium */,
      required: true,
    },
    status: {
      type: String,
      default: "not started" /*not started, holding, compeleted */,
    },
    time: { type: String, default: "00:00:00" },
    teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    chapters: { type: [chapter], default: [] },
    students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
courseSchema.index({ title: "text", bio: "text", description: "text" });

courseSchema.virtual("imageURL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
});
module.exports = {
  courseModel: mongoose.model("course", courseSchema),
};
