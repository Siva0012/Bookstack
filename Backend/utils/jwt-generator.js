const jwt = require('jsonwebtoken')

function adminTokenGenerator(admin) {
    return token = jwt.sign(admin , process.env.JWT_ADMIN_SECRET , {expiresIn : 60 * 60 * 24})
}

function uesrTokenGenerator(user) {
    return token = jwt.sign(user , process.env.JWT_USER_SECRET , {expiresIn : 60 * 60 * 24})
}

module.exports = {
    adminTokenGenerator,
    uesrTokenGenerator
}

