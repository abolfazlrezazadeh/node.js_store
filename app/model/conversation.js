const { default: mongoose } = require("mongoose");
const messageSchema = new mongoose.Schema({
  sender: { type: String },
  message: { type: String },
  dateTime: { type: String },
});
const roomSchema = new mongoose.Schema({
  name: { type: String , required : true, unique : true},
  description: { type: String },
  image: { type: String },
  messages: { type: [messageSchema], default: [] },
});
const conversatonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  endpoints: { type: String, required: true },
  rooms: { type: [roomSchema], default: [] },
});

module.exports = {
  conversationModel: mongoose.model("conversation", conversatonSchema),
};
