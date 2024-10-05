const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
<<<<<<< HEAD
const mongoURI = "mongodb+srv://naveensharalayya:qhGfWNl95h1yyVty@cluster0.eg6nx.mongodb.net/test";


//connecting to Db
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error: ', err));

=======
>>>>>>> c7f8f2a4878acfb3be795f1f561aac9ca69a2b4c

const PORT = 5000;

app.get ( "/" , (req,res)=>{
    res.send( '<h1>HI tutu</h1>');
} )


app.listen(PORT, () => {
    console.log("SERVER STARTED ");
  });
  