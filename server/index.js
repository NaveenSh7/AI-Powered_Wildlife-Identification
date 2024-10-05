const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = 5000;

app.get ( "/" , (req,res)=>{
    res.send( '<h1>HI tutu</h1>');
} )


app.listen(PORT, () => {
    console.log("SERVER STARTED ");
  });
  