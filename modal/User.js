const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  name:{
  	type:String
  },
  password:{
  	type:String
  },
  created_on:{
  	type:Date,
  	default:Date.now()
  }

});

User = mongoose.model('User', userSchema);
module.exports=User