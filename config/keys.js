
// module.exports = {
//     // mongoURI: 'mongodb+srv://tbDeveloper:h8XotaZtu9uSX24r@cluster0.lkotc.mongodb.net/test?retryWrites=true&w=majority',
//     mongoURI: 'mongodb+srv://tbDeveloper:h8XotaZtu9uSX24r@cluster0.lkotc.mongodb.net/MERNdb?retryWrites=true&w=majority',
//               //Make sure this is your own unique string
//     secretOrkey: 'afrM.GaCM>F&=HrG;(&930y.LrLb_['
//   }

if(process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}


// basically the secretOrkey is a json web token that is used for future authentication, keeps user logged in? 
// putting it in here as it wont be pushed to github