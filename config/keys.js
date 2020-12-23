if(process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}


// basically the secretOrkey is a json web token that is used for future authentication, keeps user logged in? 
// putting it in here as it wont be pushed to github