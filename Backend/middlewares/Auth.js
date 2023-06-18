const jwt = require('jsonwebtoken')

module.exports.verifyAdminToken = async (req , res , next) => {

    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            res.status(401).json({message : "No token in the headers"})
        } else {
            jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
                if(err) {
                    res.status(401).json({message : "Error in verification of jwt"})
                } else {
                    req.adminId = decoded.adminId
                    next()
                }
            })
        }
    }catch(err) {
        console.log(err);
        res.json({message : "try catch err in verifyadmin token"})
    }
}

//payload as role = admin check when decoding

module.exports.verifyMemberToken = async (req , res , next) => {
    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            res.status(401).json({message : "No token in the headers"})
        } else {
            jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
                if(err) {
                    console.log("Error in jwt verification" , err);
                } else {
                    req.memberId = decoded.memberId
                    next()
                }
            })
        }
    } catch(err) {
        console.log(err);
        res.json({message : "try catch err in verifyuser token"})
    }
}