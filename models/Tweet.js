const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const TweetSchema = new Schema({
    user: { // needs require true? 
        type: Schema.Types.ObjectId, // i imagine this is a reference to a user? / this is like a active record association 
        ref: 'users' // this is the name of the model we want to associate this with, which is users. 
    }, 

    text: {
        type: String,
        required: true
    }, 

    data: { // can this be placed outside of the this first object, like in users? 
        type: Date, 
        default: Date.now
    }
}); 

module.exports = Tweet = mongoose.model('tweet', TweetSchema);

// naming convention singular and capitalized 