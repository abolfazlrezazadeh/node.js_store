const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true, unique: true },
    phone: { type: Number, required: true },
    email: { type: String, lowercase: true, unique: true },
    password: { type: String },
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
    roles: { type: [String], default: ["user"] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);
module.exports = {
  userModel: mongoose.model("user", schema),
};
