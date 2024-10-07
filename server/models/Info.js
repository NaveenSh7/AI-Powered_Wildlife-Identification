const mongoose =  require('mongoose');

const InfoSchema = new mongoose.Schema({

    Animals: { type: Number , default:0 },
    Users: { type: Number , default:0 },
    Searches: { type: Number , default:0 },
 
    
  });

// this adds data to colletion users
const InfoModel = mongoose.model('info' , InfoSchema);
module.exports = InfoModel
