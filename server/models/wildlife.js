const mongoose =  require('mongoose');

const wildSchema = new mongoose.Schema({
    Url : { type:String, required: true, unique: true },
    Count: { type: Number , default:0 },
    Extract : {type:String },
    
  });

// this adds data to colletion users
const WildModel = mongoose.model('wildlife' , wildSchema);
module.exports = WildModel
