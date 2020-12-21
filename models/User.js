const mongoose = require('mongoose'); // this is creating a variable out of the 'mongoose' dependency? 
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    handle: {
        type: String, 
        required: true 
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
}, {
    timestamps: true // notice timestamps is placed outside of the first object. 
})

module.exports = User = mongoose.model('User', UserSchema); 

// first argument is what we want our models to be called, the second is the schema to create the model
// instantiating an object 
// a document is a row (an entry) on the table 
// a collection is the table itself

// this looks similar to a table/schema in rails