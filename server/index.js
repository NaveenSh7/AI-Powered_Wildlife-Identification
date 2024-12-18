const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/users');
const InfoModel = require('./models/Info');
const cloudinary = require('./Cloudinary');
const app = express();

app.use(express.json());

//env

require('dotenv').config();
const CSTRING = process.env.mongoURI;


app.use(cors({
    origin: ['http://localhost:3000', 'https://ai-powered-wildlife-identification-kmn5.vercel.app'],  // Add both local and production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));


//for local
// app.use(cors());



//schemas
const port = process.env.PORT || 5000 ;  // Default to port 5000 if no environment variable is set







mongoose.connect(  CSTRING)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error: ', err));
  

  


app.get('/', async (req, res) => {
    res.send("HOLA tutu");
   });



// storing user info
app.post ("/SaveUser" , async (req,res)=>{
    // console.log("BODY " , req.body)
   
    const {UserEmail , UserName} = req.body;
    const exist = await UserModel.findOne({ UserEmail });
    if (exist) {
        return res.status(200).send("User already exists");
    }
    try {

           const NewUser = new UserModel (
            {  UserEmail,  UserName}
        );
       await NewUser.save();
           
       await InfoModel.findOneAndUpdate(
        {}, // no query
        { $inc: { Users: 1 } },
        { upsert: true, new: true } 
    );

       res.send("Data Inserted")
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send("Error inserting data");
    }

})


// fetching user info
app.get("/GetUser", async (req, res) => {
    const { UserEmail } = req.query; // Extract UserEmail from query parameters

    try {
        const data = await UserModel.findOne({ UserEmail });
        if (!data) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        res.json({ success: true, data1: data });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send("Error fetching data");
    }
});


// fetching Statistics

app.get( "/GetInfo", async (req,res)=>{
 
    try {
        const data = await InfoModel.find({});
        res.json({ success: true, msg: "server is getting", data1: data });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send("Error fetching data");
    }
} )


//increamenting search
app.put("/IncSearch", async (req, res) => {
    try {
        const updatedInfo = await InfoModel.findOneAndUpdate(
            {}, // no query
            { $inc: { Searches: 1 } },
            { upsert: true, new: true }
        );
        res.status(200).json("Search count incremented " );
    } catch (err) {
        console.log(err);
        res.status(500).json( "Error incrementing search count");
    }
});

// Require multer for handling file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set 'uploads/' as the temporary storage path for the image

// Saving img to cloud and updating user
app.put("/SaveImg", upload.single('image'), async (req, res) => {
    
    const { UserEmail , Name } = req.body;
    const image = req.file.path; // This is the uploaded image file path
    
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "AI_WILD",
        });

        const user = await UserModel.findOneAndUpdate(
            { UserEmail: UserEmail },
            { $push: { Saved: { Url: result.secure_url, Name: Name } } }, // Save the pair of strings
            { new: true } // Return the updated user
        );


        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, message: "Image saved", user });
    } catch (err) {
        console.log("Couldn't save img", err);
        res.status(500).json({ error: "Failed to save image" });
    }

   
});


//reports
app.put("/ReportImg", upload.single('image'), async (req, res) => {
    
    const { UserEmail , Name, Info , topic} = req.body;
    const image = req.file.path; // This is the uploaded image file path
    
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "AI_WILD",
        });

        const user = await UserModel.findOneAndUpdate(
            { UserEmail: UserEmail },
            { $push: { Reports: { Url: result.secure_url, Name: Name, Data : Info, Topic:topic } } }, // Save the pair of strings
            { new: true } // Return the updated user
        );

        
        try {
            const updatedInfo = await InfoModel.findOneAndUpdate(
                {}, // no query
                { $inc: { Reports: 1 } },
                { upsert: true, new: true }
            );
            
        } catch (err) {
            console.log(err,"Error incrementing search count");
           
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, message: "report saved", user });
    } catch (err) {
        console.log("Couldn't save report", err);
        res.status(500).json({ error: "Failed to save report" });
    }
});



app.listen(port, () => {
    console.log("SERVER STARTED ");
  });
  






