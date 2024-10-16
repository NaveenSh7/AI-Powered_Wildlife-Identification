const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  UserEmail: { type: String, required: true, unique: true },
  UserName: { type: String },
  
  // Array of objects, each containing two strings
  Saved: [{
    Url: { type: String, required: true },
    Name: { type: String, required: true }
  }],
  Reports: [{
    Url: { type: String, required: true },
    Name: { type: String },
    Data: { type: String },
  }]
});

// this adds data to collection users

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
