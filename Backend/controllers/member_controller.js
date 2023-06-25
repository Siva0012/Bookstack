const Members = require('../models/member_model')
const Books = require('../models/book_model')
const Categories = require('../models/category_model')
const LenderHistory = require('../models/lender_history')
const Banners = require('../models/banner_model')
require('dotenv').config()

//bcrypt
const bcrypt = require('bcrypt')

//generate token
const { tokenGenerator } = require('../utils/jwt-generator')

//uuid
const { v4: uuidv4 } = require('uuid');

//cloudinary
const { uploadToCloudinary } = require('../config/cloudinary')
const { removeFromCloudinary } = require('../config/cloudinary')
const { default: mongoose } = require('mongoose')

//member apis
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
            const dateOfJoin = new Date()
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
                // const userData = {
                //     memberId: memberExists._id,
                //     name: memberExists.name,
                //     email: memberExists.email,
                //     date: memberExists.dateOfJoin,

                // }
                const userData = await Members.findOne({ _id: memberExists._id }, { password: 0, publicId: 0, phone: 0, email: 0, address: 0 })
                res.status(200).json({ message: `Signed in as ${memberExists.name}`, token: token, member: userData })
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
            const userData = await Members.findOne({ _id: memberExists._id }, { password: 0, publicId: 0, phone: 0, email: 0, address: 0 })
            res.status(200).json({ message: `Signed in as ${isExists.name}`, member: userData, token: token })
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
        const bookData = await Books.find({ isListed: true })
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
        const bookData = await Books.find({ $and: [{ category: catId }, { listed: true }] }).populate('category')
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
                        console.log("updateresponse");
                        res.status(200).json({ message: "Updated your profile picture !!.", image: data.url })
                    } else {
                        console.log("no updater response");
                        res.status(404).json({ error: "Failed to update image !!." })
                    }
                } else {
                    console.log("cloudinary error");
                    res.status(404).json({ error: "Failed to upload image !!." })
                }

            }
        }
    } catch (err) {
        console.log(err);
    }
}

const updateProfileFields = async (req, res, next) => {
    try {

        console.log("this is req. body at edit profile", req.body);
        const { fieldName, fieldValue } = req.body
        const memberId = req.memberId
        if (fieldValue === "") {
            res.status(404).json({ error: "Required field" })
        } else {
            const update = {
                [fieldName]: fieldValue
            }
            const updateResponse = await Members.updateOne(
                { _id: memberId },
                { $set: update }
            )
            const memberData = await Members.findOne({ _id: memberId })
            if (updateResponse) {
                res.status(200).json({ message: `Updated user name to "${memberData.name}"` })
            } else {
                res.status(404).json({ error: "Couldn't update the user name" })
            }
        }

    } catch (err) {
        console.log(err);
    }
}

const createPaymentIntent = async (req, res, next) => {

    try {
        const { memberShipType } = req.body
        console.log("called function", memberShipType);

        const calculatePrice = (memberShipType) => {
            if (memberShipType === 'student') {
                return 999 * 100
            } else if (memberShipType === 'premium') {
                return 1399 * 100
            }
        }

        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculatePrice(memberShipType),
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log(paymentIntent, "payment INtente ttTTTt");
        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (err) {
        console.log(err);
    }


}

const addMembership = async (req, res, next) => {
    try {
        const { memberShipType } = req.body
        const memberId = req.memberId
        const membershipId = uuidv4()

        const currentDate = new Date()
        const memberSince = currentDate
        const memberUpto = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())
        const update = {
            isMember: true,
            membershipType: memberShipType,
            membershipId: membershipId,
            memberSince: memberSince,
            memberUpto: memberUpto
        }
        const updateResponse = await Members.updateOne({ _id: memberId }, update)
        if (updateResponse) {
            res.status(200).json({ message: "updated membership" })
        } else {
            res.status(404).json({ error: "failed to udpate the membership" })
        }
    } catch (err) {
        console.log(err);
    }
}

const addToBookBag = async (req, res, next) => {

    try {
        const memberId = req.memberId
        const bookId = req.params.bookId
        const memberData = await Members.findOne({ _id: memberId })
        const bookData = await Books.findOne({ _id: bookId })

        if (!memberData.isMember) {
            return res.status(404).json({ error: "You are not a member" })
        }
        if (memberData.membershipType === 'student') {
            if (memberData.bookBag.length >= 3) {
                return res.status(404).json({ error: "Your book-bag is full" })
            }
        } else if (memberData.membershipType === 'premium') {
            if (memberData.bookBag.length >= 5) {
                return res.status(404).json({ error: "Your book-bag is full" })
            }
        }

        //updating book in member schema
        const updateBookInMember = await Members.findOneAndUpdate(
            {
                _id: memberId
            },
            {
                $push: { bookBag: { book: bookId } }
            },
        )

        if (updateBookInMember) {
            res.status(200).json({ message: `Added "${bookData.title}" to book-bag` })
        } else {
            throw new Error("Failed to update book-bag")
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}

const removeFromBookBag = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const bookId = req.params.bookId
        const bookData = await Books.findOne({ _id: bookId })
        const updateBookBag = await Members.findOneAndUpdate(
            {
                _id: memberId
            },
            {
                $pull: { bookBag: { book: bookId } }
            }
        )
        if (updateBookBag) {
            res.status(200).json({ message: `Removed "${bookData.title}" from book bag` })
        } else {
            res.status(404).json({ error: "Couldn't update bookbag" })
        }

    } catch (err) {
        console.log(err);
    }
}

const getBookBag = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const memberData = await Members.findOne({ _id: memberId }).populate('bookBag.book').select('-password')
        if (memberData) {
            res.status(200).json({ message: "Populated book-bag", memberData: memberData })
        } else {
            res.status(404).json({ error: "Couldn't find the member" })
        }
    } catch (err) {
        console.log(err);
    }
}

const checkoutBooks = async (req, res, next) => {
    try {
        const memberId = req.memberId

        const bookIds = await Members.findOne({ _id: memberId }).populate('bookBag.book').select('-_id bookBag.book')
        bookIds.bookBag.forEach(async (data) => {

            //updating available stock
            await Books.findOneAndUpdate({ _id: data.book._id }, { $inc: { availableStock: -1 } })

            // creating lender history for the book
            const checkoutDate = new Date()
            const dueDate = new Date(new Date().getTime() + 7 * 24 * 60 * 1000)
            const lenderHistory = new LenderHistory({
                member: memberId,
                book: data.book._id,
                checkoutDate: checkoutDate,
                dueDate: dueDate,
                returnDate: null,
                fineAmount: 0,
                status: 'Borrowed'
            })
            await lenderHistory.save()

            //removing books from book-bag
            await Members.findOneAndUpdate(
                {
                    _id: memberId
                },
                {
                    $pull: { bookBag: { book: data.book._id } }
                }
            )
        })
        res.status(200).json({ message: "Checkout successfull" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getBanners = async (req , res , next) => {
    try{
        const bannerData = await Banners.find({})
        if(bannerData) {
            res.status(200).json({message : "Sending banner data" , bannerData : bannerData})
        } else {
            res.status(404).json({error : "Couldn't fetch banner data"})
        }
    }catch(err) {
        console.log(err.message);
        res.status(500).json({error : "Internal sever error"})
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
    updateProfileFields,
    createPaymentIntent,
    addMembership,
    addToBookBag,
    getBookBag,
    removeFromBookBag,
    checkoutBooks,
    getBanners
}