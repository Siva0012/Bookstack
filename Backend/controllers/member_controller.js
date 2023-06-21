const Members = require('../models/member_model')
const Books = require('../models/book_model')
const Categories = require('../models/category_model')

const bcrypt = require('bcrypt')
const { tokenGenerator } = require('../utils/jwt-generator')
const { response } = require('express')

//cloudinary
const { uploadToCloudinary } = require('../config/cloudinary')
const { removeFromCloudinary } = require('../config/cloudinary')


const verifyMember = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const member = Members.findOne({ _id: memberId })
        if (member) {
            res.status(200).json({ message: "Verified member from server side", isMember: true })
        } else {
            res.status(401).json({ message: "Failed member authentication at database" })
        }

    } catch (err) {
        console.log(err)
    }
}

const register = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body
        const memberResponse = await Members.findOne({ email: email })
        if (memberResponse) {
            bcrypt.compare(password, memberResponse.password).then((status) => {
                if (status) {
                    res.send("user is already registered")
                } else {
                    res.send("Not registered")
                }
            })
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const dateOfJoin = Date.now()
            const members = new Members({
                name: name,
                email: email,
                phone: phone,
                password: encryptedPassword,
                dateOfJoin: dateOfJoin
            })
            await members.save()
                .then((response) => {
                    if (response) {
                        const payLoad = {
                            memberId: response._id,
                            email: response.email,
                            date: response.dateOfJoin
                        }
                        const token = tokenGenerator(payLoad)
                        res.status(200).json({ message: "created user", token: token })
                    }
                })

        }

    } catch (err) {
        console.log(err, 'on member registration');
    }
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body
        const memberExists = await Members.findOne({ email: req.body.email })
        if (memberExists) {
            const isAuser = await bcrypt.compare(password, memberExists.password)
            if (isAuser) {
                const payLoad = {
                    memberId: memberExists._id,
                    email: memberExists.email,
                    data: memberExists.dateOfJoin
                }
                const token = tokenGenerator(payLoad)
                const userData = {
                    memberId: memberExists._id,
                    name: memberExists.name,
                    email: memberExists.email,
                    date: memberExists.dateOfJoin,

                }
                res.status(200).json({ message: `Signed in as ${memberExists.name}`, token: token, user: userData })
            } else {
                res.status(401).json({ message: "Password doesn't match", error: "Invalid password" })
            }
        } else {
            res.status(404).json({ message: "No members exists", error: "Invalid Email" })
        }

    } catch (err) {
        console.log(err);
        next()
    }
}

const googleLogin = async (req, res, next) => {
    try {
        const { email, id, name } = req.body
        const isExists = await Members.findOne({ email: email })
        if (isExists) {
            const payLoad = {
                memberId: isExists._id,
                name: isExists.name,
                date: isExists.dateOfJoin
            }
            const token = tokenGenerator(payLoad)
            res.status(200).json({ message: `Signed in as ${isExists.name}`, memberData: isExists, token: token })
        } else {
            const password = await bcrypt.hash(id, 10)
            const member = new Members(
                {
                    name: name,
                    email: email,
                    password: password,

                }
            )
            await member.save()
                .then((response) => {
                    if (response) {
                        const payload = {
                            memberId: response._id,
                            name: response.name,
                            date: response.dateOfJoin //changed from data to date
                        }
                        const token = tokenGenerator(payload)
                        res.status(201).json({ message: `Signed in as ${response.name}`, memberData: response, token: token })
                    } else {
                        res.status(404).json({ message: "failed to register" })
                    }
                })
                .catch(err => console.log(err))
        }

    } catch (err) {
        console.log(err);
    }
}

const getCategories = async (req, res, next) => {
    try {
        const catData = await Categories.find({})
        if (catData) {
            res.status(200).json({ message: "recieved categories", catData: catData })
        } else {
            res.status(404).json({ message: "No data found" })
        }
    } catch (err) {
        console.log(err);
    }
}

const getBooks = async (req, res, next) => {
    try {
        const bookData = await Books.find({ isAvailable: true })
        if (bookData) {
            res.status(200).json({ message: "recieved books", bookData: bookData })
        } else {
            res.status(404).json({ message: "No data found" })
        }
    } catch (err) {
        console.log(err);
    }
}

const getBooksByCat = async (req, res, next) => {
    try {
        const catId = req.params.catId
        const bookData = await Books.find({ $and: [{ category: catId }, { isAvailable: true }] }).populate('category')
        if (bookData) {
            res.status(200).json({ message: "recieved books by category", bookData: bookData })
        } else {
            res.status(404).json({ message: "No data found" })
        }
    } catch (err) {
        console.log(err);
    }
}

const getMember = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const memberData = await Members.findOne(
            { _id: memberId },
            { password: 0 }
        )
        if (memberData) {
            res.status(200).json({ message: "send member data", memberData: memberData })
        } else {
            res.status(404).json({ error: "no member exists" })
        }

    } catch (err) {
        console.log(err);
    }
}

const updateImage = async (req, res, next) => {
    try {
        const profilePicture = req.file.path
        const memberId = req.memberId
        if (profilePicture) {
            const isImageExists = await Members.findOne({ _id: memberId, profilePicture: { $exists: true } })
            if (!isImageExists) {
                //uploading to cloudinary
                const data = await uploadToCloudinary(profilePicture, "members-profile-pictures")
                if (data) {
                    //updating database
                    const updateResponse = await Members.updateOne(
                        { _id: memberId },
                        { $set: { profilePicture: data.url, publicId: data.public_id } }
                    )
                    if (updateResponse) {
                        res.status(200).json({ message: "Image updated successfully" })
                    } else {
                        res.status(404).json({ error: "Couldn't upload image" })
                    }
                }
            } else {
                //removing image from cloudinary
                const existingPublicId = isImageExists.publicId
                const responseData = await removeFromCloudinary(existingPublicId)

                //uploading new image to cloudinary
                const data = await uploadToCloudinary(profilePicture, "members-profile-pictures")
                if (data) {
                    //updating database
                    const updateResponse = await Members.updateOne(
                        { _id: memberId },
                        {
                            $set: { profilePicture: data.url, publicId: data.public_id }
                        }
                    )
                    if (updateResponse) {
                        res.status(200).json({ message: "Updated your profile picture !!." , image : data.url })
                    } else {
                        res.status(404).json({ error: "Failed to update image !!." })
                    }
                } else {
                    res.status(404).json({ error: "Failed to upload image !!." })
                }

            }
        }
    } catch (err) {
        console.log(err);
    }
}

const updateProfileFields = async (req , res , next) => {
    try{
        
        console.log("this is req. body at edit profile" , req.body);
        const {fieldName , fieldValue } = req.body
        const memberId = req.memberId
        if(fieldValue === "") {
            res.status(404).json({error : "Required field"})
        } else {
            const update = {
                [fieldName] : fieldValue
            }
            const updateResponse = await Members.updateOne(
                {_id : memberId},
                {$set : update}
            )
            const memberData = await Members.findOne({_id : memberId})
            if(updateResponse) {
                res.status(200).json({message : `Updated user name to "${memberData.name}"`})
            } else {
                res.status(404).json({error : "Couldn't update the user name"})
            }
        }

    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    register,
    login,
    verifyMember,
    googleLogin,
    getBooks,
    getCategories,
    getBooksByCat,
    getMember,
    updateImage,
    updateProfileFields
}