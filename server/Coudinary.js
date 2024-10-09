const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dihb2u4ni', 
    api_key: '384272935651332', 
    api_secret: '6oPO7ey8a7aPuuNSwKznOueD80M' // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;