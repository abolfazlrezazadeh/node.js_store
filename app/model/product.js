const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    //short description
    bio: { type: String, required: true },
    //full bio of product
    description: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    comments: { type: [commentSchema], default: [] },
    //array of users
    // must login first
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    disLikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
    count: { type: Number },
    price: { type: Number, required: true },
    disCount: { type: Number, default: 0 },
    //if its physical product
    feature: {
      type: Object,
      default: {
        length: "",
        weight: "",
        height: "",
        width: "",
        colors: { type: [String], default: [] },
        model: [],
        madeIn: "",
      },
    },
    //the product is physical or virtual
    type: { type: String, required: true },
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

productSchema.index({ title: "text", description: "text", bio: "text" });
productSchema.virtual("imagesURL").get(function () {
  return this.images.map(
    (image) =>
      `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`
  );
});
module.exports = {
  productModel: mongoose.model("product", productSchema),
};
