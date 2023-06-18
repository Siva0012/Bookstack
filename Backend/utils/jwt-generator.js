const jwt = require('jsonwebtoken')

function tokenGenerator(user) {
    console.log(user);
    return token = jwt.sign(user , process.env.JWT_SECRET , {expiresIn : 60 * 60 * 24})
}

module.exports = {
    tokenGenerator
}

