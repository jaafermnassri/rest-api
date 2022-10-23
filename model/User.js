const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type:String,required:true},
  email: {type:String,required:true},
  age: Number,
  superpower: String,
});


module.exports = User = mongoose.model("User", userSchema);