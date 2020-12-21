const mongoose = require('mongoose');
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
// instantiating an object 
// a document is a row (an entry) on the table 
// a collection is the table itself