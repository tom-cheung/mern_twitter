const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateRegisterInput(data) {
    let errors = {}; 

    data.handle = validText(data.handle) ? data.handle : ''; // ternary statement that checks if the data is validText, and returns it if it is, if not it returns an empty string 
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : ''; 
    
    // validations for handle 
    if(!Validator.isLength(data.handle, { min: 2, max: 30})) {
        errors.handle = 'Handle must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Handle field is required';
    }

    // validation for emails 
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    // validation for password 
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, { min: 6, max: 30})) {
        errors.password = 'Password must be at least 6 chaacters';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required'; 
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors, 
        isValid: Object.keys(errors).length === 0
    };
};