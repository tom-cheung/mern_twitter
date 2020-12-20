const mongoose = require('mongoose');

const express = require("express");
const app = express();

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World, Welcome to MERNTwitter. Let's start developing!"));

const port = process.env.PORT || 5000;
// tells the app object to listen on a specific port 
// process.env.PORT deals with eventual Heroku deployment 

app.listen(port, () => console.log(`Server is running on port ${port}`));