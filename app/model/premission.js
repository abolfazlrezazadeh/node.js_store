const { default: mongoose } = require("mongoose");

const premissionSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String, default: "" },
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = {
  premissionModel: mongoose.model("premission", premissionSchema),
};
