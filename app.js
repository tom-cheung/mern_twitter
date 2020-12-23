const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser'); // this is a dependency library that tells our app what sort of requests it should respond to
const passport = require('passport'); // this is a dependency from our package.json
const users = require("./routes/api/users"); //importing users routes 
const tweets = require("./routes/api/tweets"); // importing tweets routes 

mongoose // connect mongoose to the MongoDB 
  .connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: false })); // respond to urlencoded software like postman 
app.use(bodyParser.json()); // respond to json requests
app.use(passport.initialize());

require('./config/passport')(passport);

// app.get("/", (req, res) => {
//   console.log(res);
//   res.send("Hello World, Welcome to MERNTwitter. Let's start developing!")}); // replaced by app.use(passowrd.initialize());

app.use("/api/users", users); 
// if we get a request for a route that starts with /api/user we'll use the users function. Looking at the users.js file we defined
// a ES6 function that returns a json object 
app.use("/api/tweets", tweets);

// suppose to go here? 
const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }

//

const port = process.env.PORT || 5000;
// tells the app object to listen on a specific port 
// process.env.PORT deals with eventual Heroku deployment 

app.listen(port, () => console.log(`Server is running on port ${port}`));