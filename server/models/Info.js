const mongoose =  require('mongoose');

const InfoSchema = new mongoose.Schema({

    
    Users: { type: Number , default:0 },
    Searches: { type: Number , default:0 },
    Reports: { type: Number , default:0 },
 
    
  });

// this adds data to colletion users
const InfoModel = mongoose.model('info' , InfoSchema);
module.exports = InfoModel
