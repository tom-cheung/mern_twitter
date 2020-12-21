const express = require("express");
const router = express.Router(); // get a Router object off of the router 
const bcrypt = require('bcryptjs');
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
// const passport = require('../../config/passport')
const passport = require('passport')

router.get("/test", (req, res) => {
    res.json({ msg: "This is the users route" }
    )}); // just ES6 syntax 

router.post('/register', (req, res) => {
    // checks to make sue nobody has already registered with a duplicate email 

    User.findOne({email: req.body.email}) // i imagine req.body.email is the handle that was submitted to through to this route 
        .then(user => {
            if(user) { // if user exists, meaning if a response was given, then there's a user with that handle. I imagine I can name user whatever
                // Throw a 400 error if the email address already exists
            } else { // else create a user object using the User model required above, which comes from models User.js
                const newUser = new User({
                    handle: req.body.handle, 
                    email: req.body.email, 
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash; 
                        newUser.save() 
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    }) // seems like this is using bcrypt to encrypt the password. bcrypt.hash seems to take in a password, a salt?, and a callback 
                })
            }
        })

})

router.post('/login', (req, res) => {
    const email = req.body.email; 
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                return res.status(404).json({email: "This user does not exist!"});
            }

            bcrypt.compare(password, user.password) // i suppose this is very similar to how bcrypt was utilized in the rails user model
                .then(isMatch => {
                    if (isMatch) {
                        // res.json({msg: "Success!"});
                        const payload = {id: user.id, handle: user.handle};

                        jwt.sign(
                            payload, 
                            keys.secretOrkey, 
                            // tell the key to expire in one hour 
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true, 
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        return res.status(400).json({password: "Incorrect password!"});
                    }
                })
        })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id, 
        handle: req.user.handle, 
        email: req.user.email
    })
})

module.exports = router;