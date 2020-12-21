const JwtStrategy = require('passport-jwt').Strategy; // use the strategy that handles jwt tokens 
const ExtractJwT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User'); // 'User' is named after the model defined in the User.js model file 
const keys = require('./keys');

const options = {}; 
options.jwtFromRequest = ExtractJwT.fromAuthHeaderAsBearerToken(); // the latter is a built in passport method 
options.secretOrKey = keys.secretOrkey;

module.exports = passport => { // anonymous function, no name 
    passport.use(new JwtStrategy(options, (jwt_payload, done) => { 
        // instantiating a new object that takes in two arguments
        // done is the equivalent of next in the react middleware, it moves to the next bit of middleware 
        // this payload includes the items we specified earlier?  
        // console.log(jwt_payload);
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    // return the user to the frontend 
                    return done(null, user); 
                }
                // return false since there is no user 
                return done(null, false);
            })
            .catch(err => console.log(err));
    }))
};