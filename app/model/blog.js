const {default : mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    author : {type : mongoose.Types.ObjectId, required : true},
    title : {type : String , required : true},
    text : {type : String , required :true},
    image : {type : String },
    tags : {type : [String] , default : []},
    catagory : {type : mongoose.Types.ObjectId , required : true},
    catagory : {type : mongoose.Types.ObjectId , required : true},
    comments : {type : [] , default :[ ]},
    like : {type : mongoose.Types.ObjectId ,default : []},
    disLike : {type : mongoose.Types.ObjectId , default : []},
    bookmark  : {type : mongoose.Types.ObjectId , default : []},
});
 module.exports = {
    blogModel : mongoose.model("blog",schema)
 }