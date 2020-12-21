const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('./keys');

const options = {}; 
options.jwtFromRequest = ExtractJwT.fromAuthHeaderAsBearerToken(); 
options.secretOrKey = keys.secretOrkey;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
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