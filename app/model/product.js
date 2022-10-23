const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  //short description
  bio: { type: String, required: true },
  //full bio of product
  description: { type: String, required: true },
  images: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, required: true },
  comment: { type: [], default: [] },
  //array of users
  // must login first
  like: { type: [mongoose.Types.ObjectId], default: [] },
  disLike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  count: { type: String },
  price: { type: Number, required: true },
  //تخفیف
  disCount: { type: Number, default: 0 },
  //if its physical product
  size: {
    type: Object,
    default: {
      length: "",
      weight: "",
      height: "",
      width: "",
      colors: [],
      model: "",
      madeIn: "",
    },
  },
  //the product is physical or virtual
  type: { type: String, required: true },

  // Below is related to virtual products

  //virtual products duration (podcasts , videos , songs)
  time: { type: String, default: "undefind" },
  format: { type: String },
  teacher: { type: mongoose.Types.ObjectId, required: true },
});
module.exports = {
  productModel: mongoose.model("product", schema),
};
