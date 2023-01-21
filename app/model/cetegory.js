const {default : mongoose } = require("mongoose");

const schema = new mongoose.Schema({
   title : {type : String , required : true},
   parent : {type : mongoose.Types.ObjectId , default : undefined}
});
 module.exports = {
   categoryModel : mongoose.model("category",schema)
 }