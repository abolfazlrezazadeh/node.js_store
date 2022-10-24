const {default : mongoose } = require("mongoose");

const schema = new mongoose.Schema({
   first_name : {type : String},
   last_name : {type : String},
   username : {type : String, lowercase : true, unique : true},
   mobile : {type : Number},
   email : {type : String, lowercase :true, unique : true},
   password : {type : String},
   otp : {type : Object , default : {
      code : 0 ,
      expires : 0 ,
   }},
   //invoices فاکتور
   bills : {type : [] , default : ""} ,
   disCount : {type : Number , default : 0},
   //if fill the birthday it gets discount on his birth day
   birthday : {type : String },
   roles : {type : [String] , default : ["user"]}
});
 module.exports = {
    userModel : mongoose.model("user",schema)
 }