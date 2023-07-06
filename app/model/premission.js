const { default: mongoose } = require("mongoose");

const premissionSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    premissions: { type: String, default: "" },
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = {
  premissionController: mongoose.model("premission", premissionSchema),
};
