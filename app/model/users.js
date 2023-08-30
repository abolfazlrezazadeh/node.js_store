const { default: mongoose,   } = require("mongoose");
const productSchema = new mongoose.Schema({
  productId : { type : mongoose.Types.ObjectId , ref : "product"},
  count : {type : Number , default : 1}
})
const courseSchema = new mongoose.Schema({
  courseId : { type : mongoose.Types.ObjectId , ref : "course"},
  count : {type : Number , default : 1}
})
const basketSchema = new mongoose.Schema({
  products : {type : [productSchema] , default : []},
  courses : {type : [courseSchema] , default : []}
})
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true, unique: true },
    phone: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    password: { type: String },
    courses: { type: [mongoose.Types.ObjectId], default: [], ref: "course" },
    basket : {type : [basketSchema], default : []},
    otp: {
      type: Object,
      default: {
        code: 0,
        expiresIn: 0,
      },
    },
    //invoices فاکتور
    bills: { type: [], default: "" },
    disCount: { type: Number, default: 0 },
    //if fill the birthday it gets discount on his birth day
    birthday: { type: String },
    role: { type: String, default: "USER" },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.index({
  first_name: "text",
  last_name: "text",
  phone: "text",
  email: "text",
});
module.exports = {
  userModel: mongoose.model("user", userSchema),
};
