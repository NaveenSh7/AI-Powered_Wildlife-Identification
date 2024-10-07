const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors()); 
const { OpenAI } = require('openai');
//env
const mongoURI = "mongodb+srv://naveensharalayya:qhGfWNl95h1yyVty@cluster0.eg6nx.mongodb.net/test";
OPEN_AI_KEY = "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";

//schemas
const PORT = 5000;
const UserModel = require('./models/Users');
const WildModel = require ('./models/Wildlife');
const InfoModel = require('./models/Info');




//connecting to Db
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error: ', err));

app.use(cors()); 

app.get ( "/" , (req,res)=>{
    res.send( '<h1>Hiii tutu</h1>');
} )

// OpenAI-API

// Paisa  Nhi hei  bhaiii 🥲

const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

//
app.post("/openAI", async (req,res)=>{

    const { animal } = req.body;

  if (!animal) {
    return res.status(400).json({ error: 'Please provide an animal name.' });
  }
  const prompt = `Provide the Natural Habitat, Conservation Status, and Approximate Population for ${animal} in JSON format, like this:
{
  "Natural Habitat": "",
  "Conservation Status": "",
  "Approximate Population": ""
}`;


try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 60,
      temperature: 0.7,
    });


    let info = response.data.choices[0].text.trim();

    // Attempt to parse the info string as JSON
    try {
      info = JSON.parse(info); 
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
    
    res.json({ info : info });

  } catch (error) {
    console.error('Error fetching data from OpenAI API:', error);
    res.status(500).json({ error: 'Failed to fetch animal information.' });
  }
})


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

app.get( "/GetUser", async (req,res)=>{
 
    try {
        const data = await UserModel.find({});
        res.json({ success: true, msg: "server is getting", data1: data });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send("Error fetching data");
    }
} )

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














app.listen(PORT, () => {
    console.log("SERVER STARTED ");
  });
  