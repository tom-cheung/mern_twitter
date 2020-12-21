const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateLoginInput(data) { // looks to be a self defined method 
    let errors = {};

    data.email = validText(data.email) ? data.email : ''; // checking if the email and password are valid string. Returns them if they're otherwise returns empty strings 
    data.password = validText(data.password) ? data.password : ''; 

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"; // if the data.email when passed into Validator.isEmail returns false then you set a key of emails in errors and assign an error message. isEmail must be a function of Validator (imported above)
    }

    if (Validator.isEmpty(data.email)) { // seems to do something similar to the above, just with a different error message 
        errors.email = 'Email field is required dummy';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors, 
        isValid: Object.keys(errors).length === 0 // interesting. it's just returning a boolean if there are any error messages 
    };
};