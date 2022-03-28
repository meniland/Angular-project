const expressJwt = require('express-jwt');
const config = require('../config.json');

// Extracting the text from the secret's JSON
let { secret } = config;
//console.log(secret);

function authenticateJwtRequestToken() {
    // Load secret into 
    return expressJwt({ secret,  algorithms: ['sha1', 'RS256', 'HS256']  }).unless({
        path: [
           { url:"/users/",method:"POST"},
           { url:"/users/login",method:"POST"},
           { url:"/users/is-id-exist",method:"POST"},
        ]
       
    });
}

module.exports = authenticateJwtRequestToken;