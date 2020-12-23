const express = require("express");
const router = express.Router(); // get a Router object off of express 
const bcrypt = require('bcryptjs');
const User = require('../../models/User') // import the user model, allows you to post to it 
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport')

// validations for login and registration 
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => {
    res.json({ msg: "This is the users route" }
    )}); // just ES6 syntax 

router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body); 
    // a bit of object destructuring to take out the errors object and isInvalid boolean which is being returned by register.js
    // knowing the way register.js validations are defined i imagine that you must pass in the right keys when registering a user 


    if(!isValid) {
        return res.status(400).json(errors);;
    }


    // checks to make sue nobody has already registered with a duplicate email 
    User.findOne({email: req.body.email}) 
        // i imagine req.body.email is the handle that was submitted to through to this route 
        // chaining .then lets me know User.findOne returns a promise 
        .then(user => {
            if(user) { // if user exists, meaning if a response was given, then there's a user with that handle. I imagine I can name user whatever
                // Throw a 400 error if the email address already exists
                // return res.status(400).json({email: "A user has already registered with this address"}) refactured per validation lecture
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else { // else create a user object using the User model required above, which comes from models User.js
                const newUser = new User({
                    handle: req.body.handle, 
                    email: req.body.email, 
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => { // 10 is the number of rounds to generate this salt, the CB is what to do after generating the salt 
                    bcrypt.hash(newUser.password, salt, (err, hash) => { // use the salt to hash the password, the salt is the salt to use (from above), cb is what to do after hashing
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


    const { errors, isValid } = validateLoginInput(req.body); 
    // passing in the req.body to the validateLoginInput function defined in login.js validation file 
    // this really is just like defining a helper method. You COULD define it all here but it would get very messy 

    if (!isValid) { // read it as if NOT valid 
        return res.status(400).json(errors);
    }

    const email = req.body.email;  // keying into the req object 
    const password = req.body.password;

    User.findOne({email}) // this is the equivalent of email: email, but can be shortened because of ES6. findOne returns one, find returns an array 
        .then(user => {
            if(!user) {
                // return res.status(404).json({email: "This user does not exist!"}); refactored per validations lecture
                errors.email = 'User not found'; 
                return res.status(404).json(errors);
            }

            bcrypt.compare(password, user.password) // i suppose this is very similar to how bcrypt was utilized in the rails user model
                .then(isMatch => { // basically takes the response and does something with it 
                    if (isMatch) {
                        // res.json({msg: "Success!"});
                        const payload = {id: user.id, handle: user.handle};  

                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            // tell the key to expire in one hour 
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true, 
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        // return res.status(400).json({password: "Incorrect password!"}); refactored per validation lecture
                        errors.password = 'Incorrect password'
                        return res.status(400).json(errors);
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