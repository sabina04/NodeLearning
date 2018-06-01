const config = require('../../config'),
jwt = require('jsonwebtoken');



//module.exports = token;

module.exports = {
    generateToken : function (tokenData) {
      return  token = jwt.sign({
        //exp: Math.floor(Date.now() / 1000) + (60 * 60),  
        data : tokenData}, 
        config.jwtSecret);
    },
    verifyToken : function(token){
        const tokenData = jwt.verify(token, config.jwtSecret, function(err, decoded) {
            return decoded;
        });
        return tokenData;

    }
}