const jwt = require('jsonwebtoken')

module.exports.verifyAdminToken = async (req , res , next) => {

    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            res.status(401).json({message : "No token in the headers"})
        } else {
            jwt.verify(token , process.env.JWT_ADMIN_SECRET , (err , decoded) => {
                if(err) {
                    res.status(401).json({message : "Error in verification of jwt"})
                } else {
                    //decode.role = admin then next
                    req.adminId = decoded.adminId
                    next()
                }
            })
        }
    }catch(err) {
    }
}

//payload as role = admin check when decoding

module.exports.verifyMemberToken = async (req , res , next) => {
    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            res.status(401).json({message : "No token in the headers"})
        } else {
            jwt.verify(token , process.env.JWT_USER_SECRET , (err , decoded) => {
                if(err) {
                    res.status(401).json({message : "Error in verification of jwt"})
                } else {
                    req.memberId = decoded.memberId
                    next()
                }
            })
        }
    } catch(err) {
    }
}