const Validator = require('validator'); // importing the Validator library 
const validText = require('./valid_text'); // importing validText function created under valid_text.js

module.exports = function validateTweetInput(data) {
    let errors = {};

    data.text = validText(data.text) ? data.text : ''; // passing in the text to validText to be checked. data must come in as an object then. 

    if(!Validator.isLength(data.text, { min: 5, max: 140})) {
        errors.text = 'Tweet must be between 5 and 140 characters'; 
    }

    if(Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors, 
        isValid: Object.keys(errors).length === 0
    };
};

// these validations have you passing in some information, in this case the body of requests and it checks them for certain criteras 