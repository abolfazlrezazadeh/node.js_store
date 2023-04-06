const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.Schema");

const episodes = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});
const chapter = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episodes: { type: [episodes], default: [] },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bio: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
  comment: { type: [commentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  disLikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, required: true },
  disCount: { type: Number, default: 0 },
  type: {
    type: String,
    default: "free" /*cash, free , premium */,
    required: true,
  },
  time: { type: String, default: "00:00:00" },
  teacher: { type: mongoose.Types.ObjectId, required: true },
  chapters: { type: [chapter], default: [] },
  students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
});
courseSchema.index({ title: "text", bio: "text", description: "text" });

module.exports = {
  courseModel: mongoose.model("course", courseSchema),
};
