const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
    UserEmail: { type: String, required: true, unique: true },
    UserName : {type:String },
    
  });

// this adds data to colletion users
const UserModel = mongoose.model('users' , UserSchema);
module.exports = UserModel
