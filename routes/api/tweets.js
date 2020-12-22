const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Tweet = require('../../models/Tweet'); // importing the Tweet model 
const validateTweetInput = require('../../validation/tweets'); // importing the tweet validation 

// router.get("/test", (req, res) => res.json({ msg: "This is the tweets route" }));
// router.get("/reply", (eq, res) => res.json({msg: "Reply to a tweet"})); testing, works 

router.get('/', (req, res) => {
    Tweet.find()
        .sort({date: -1}) // works like the rocket operator in ruby 
        .then(tweets => res.json(tweets)) // responds with this list of tweets 
        .catch(err => res.status(404).json({ notweetsfound: 'No tweets found'})); 
})

router.get('/user/:user_id', (req, res) => { // wildcard operator :user_id, find a specific users tweet
    Tweet.find({user: req. params.user_id}) // .find must be a built in model method, probably from schema library?
        .then(tweets => res.json(tweets)) // responds with this list of tweets
        .catch(err => 
            res.status(404).json({notweetsfound: 'No tweets found from that user'}
            )
        );
}); 

router.get('/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err => 
            res.status(404).json({ notweetfound: 'No tweet found with that ID' })
            );
});

router.post('/', 
    passport.authenticate('jwt', { session: false }), // this is a middleware function, so is the following. jwt is a strategy being used...  
    (req, res) => {
        const { errors, isValid } = validateTweetInput(req.body); // passing the body of the post request to tweets and then destructuring the returned object of errors and isValid 

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const newTweet = new Tweet({ // is this the json we're going to be rendering with on the React frontend?, yes it is, look below.   
            text: req.body.text,
            user: req.user.id
        })

        newTweet.save().then(tweet => res.json(tweet)); // the .save() is what hits the database, the .then is whats returns and what i imagine we can render on the frontend 
    }
);

module.exports = router;