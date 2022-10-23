const {default : mongoose } = require("mongoose");

const schema = new mongoose.Schema({
   title : {type : String},
   text : {type :String},
   image : {type : [String] , required : true},
   // the place of slider
   //main , advertisment , other
   type : {type : String , default : "main"}
});
 module.exports = {
    slider : mongoose.model("slider",schema)
 }