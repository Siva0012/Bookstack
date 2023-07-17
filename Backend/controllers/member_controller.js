const Admins = require('../models/admin_model')
const Members = require('../models/member_model')
const Books = require('../models/book_model')
const Categories = require('../models/category_model')
const LenderHistory = require('../models/lender_history')
const Banners = require('../models/banner_model')
const Reservations = require('../models/reservation_model')
const Tokens = require('../models/token')
const sendEmail = require('../utils/send_email')
const escapeRegExp = require('lodash.escaperegexp')

const crypto = require('crypto')

require('dotenv').config()

//bcrypt
const bcrypt = require('bcrypt')

//generate token
const { uesrTokenGenerator } = require('../utils/jwt-generator')

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
            const isExists = await bcrypt.compare(password, memberResponse.password)
            if (isExists) {
                return res.status(404).json({ error: "The user has already registered" })
            }
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
            const member = await members.save()
            if (member) {
                console.log("member data", member);
                const verificationToken = await new Tokens(
                    {
                        memberId: member._id,
                        token: crypto.randomBytes(32).toString('hex')
                    }
                ).save()
                if (verificationToken) {
                    const url = `${process.env.FRONT_END_URL}/${member._id}/verify/${verificationToken.token}`
                    const message = `  <p>Dear ${member.name},</p>
                    <p>Thank you for registering with our website. To verify your email address, please click on the following link:</p>
                    <p><a href="${url}</a></p>
                    <p>If you did not register with our website, please disregard this email.</p>
                    <p>Best regards,</p>
                    <p>Bookstack</p>`
                    const sendMail = await sendEmail(member.email, "Verify Email", message)
                    res.status(200).json({ message: "Created member successfully", memberCreated: true })
                }
            } else {
                console.log("member not saved");
            }

        }

    } catch (err) {
        console.log(err, 'on member registration');
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const memberId = req.params.memberId
        const token = req.params.token
        const member = await Members.findOne({ _id: memberId })
        if (!member) return res.status(400).send({ message: "Invalid link" })
        const verificationToken = await Tokens.findOne(
            {
                memberId: member._id,
                token: token
            }
        )
        if (!verificationToken) return res.status(400).send({ message: 'Invalid link' })

        await Members.findOneAndUpdate({ _id: member._id }, { verified: true })
        await verificationToken.deleteOne()
        res.status(200).json({ message: "Successfully verified Member", verified: true })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })
    }
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body
        const memberExists = await Members.findOne({ email: email })

        if (memberExists) {
            if (!memberExists.verified) {
                const verificationToken = await Tokens.findOne({ memberId: memberExists._id })
                // console.log("verification tokennnnnnnnn" , verificationToken);
                if (!verificationToken) {
                    const verificationToken = await new Tokens(
                        {
                            memberId: memberExists._id,
                            token: crypto.randomBytes(32).toString('hex')
                        }
                    ).save()
                    const url = `${process.env.FRONT_END_URL}/${memberExists._id}/verify/${verificationToken.token}`
                    const sentMail = await sendEmail(memberExists.email, "Verify Email", url)
                    return res.status(404).json({ error: "Please verify your email using the link that has been sent !!" })
                }
                return res.status(404).json({ error: "Please verify your email using the link that has been sent !!" })
            }
            const isAuser = await bcrypt.compare(password, memberExists.password)
            if (isAuser) {
                const payLoad = {
                    memberId: memberExists._id,
                    email: memberExists.email,
                    date: memberExists.dateOfJoin
                }
                const token = uesrTokenGenerator(payLoad)
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
            const token = uesrTokenGenerator(payLoad)
            const userData = await Members.findOne({ _id: isExists._id }, { password: 0, publicId: 0, phone: 0, email: 0, address: 0 })
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
                        const token = uesrTokenGenerator(payload)
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

const getChatMember = async (req , res , next) => {
    try{
        const {memberId} = req.params
        const memberData = await Members.findById(memberId).select('-password')
        if(memberData) {
            res.status(200).json({message : "member data" , memberData : memberData})
        } else {
            res.status(404).json({error : "Failed to fetch member data"})
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({error : "Internal server Error"})
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
        const { membershipType } = req.body
        const calculatePrice = (membershipType) => {
            if (membershipType === 'student') {
                return 999 * 100
            } else if (membershipType === 'premium') {
                return 1399 * 100
            } else if (membershipType === 'upgrade') {
                return 400 * 100
            }
        }

        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculatePrice(membershipType),
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (err) {
        console.log(err);
    }

}

const addMembership = async (req, res, next) => {
    try {
        let { memberShipType } = req.body
        const memberId = req.memberId
        const membershipId = uuidv4()

        if (memberShipType === 'upgrade') {
            memberShipType = 'premium'
        }

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
            res.status(200).json({ message: "Updated membership" })
        } else {
            res.status(404).json({ error: "Failed to udpate the membership" })
        }
    } catch (err) {
        console.log(err);
    }
}

const createFinePaymentIntent = async (req, res, next) => {
    try {
        console.log("called payfines");
        const memberId = req.memberId
        const memberData = await Members.findById(memberId)
        const fineAmount = memberData.totalFineAmount * 100
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: fineAmount,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        // res.send({
        //     clientSecret: paymentIntent.client_secret
        // })
        res.status(200).json({ message: "Payment successfull", clientSecret: paymentIntent.client_secret, fineAmount: fineAmount })

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal server errro" })
    }
}

const changeFineStatus = async (req, res, next) => {
    try {
        const memberId = req.memberId

        //change the total fine amount of the member to zero
        const memberData = await Members.findById(memberId)
        const fineAmount = memberData.totalFineAmount
        memberData.totalFineAmount = 0

        //changing has fine paid for checkouts having fines
        const activeCheckouts = await LenderHistory.find(
            {
                member: memberId,
                $and: [{ fineAmount: { $gt: 0 } }, { status: 'Borrowed' }, { hasFinePaid: false }]
            }
        )
        activeCheckouts.forEach(async (checkout) => {
            const fineAmount = checkout.calculateFine()
            checkout.fineAmount = fineAmount
            checkout.hasFinePaid = true
            await checkout.save()
        })
        await memberData.save()
            .then((response) => {
                if (response) {
                    res.status(200).json({ message: `Payed an amount of ${fineAmount}` })
                } else {
                    res.status(404).json({ error: "Couldn't update status" })
                }
            })

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal server Error" })
    }
}

const addToBookBag = async (req, res, next) => {

    try {
        const memberId = req.memberId
        const bookId = req.params.bookId
        const memberData = await Members.findById(memberId)
        const bookData = await Books.findById(bookId)
        //checking member and membership details
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

        //checking whether the book is exist in the bookbag or not
        const isBookExists = await Members.findOne({ _id: memberId, bookBag: { $elemMatch: { book: bookId } } })
        if (isBookExists) {
            res.status(404).json({ error: "Book already in the bag" })
        } else {

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
        const memberData = await Members.findById(memberId)
        if (memberData.hasFinePaid) {
            const existingCheckouts = await LenderHistory.find(
                {
                    member: memberId,
                    $or: [{ status: 'Pending' }, { status: 'Approved' }, { status: 'Borrowed' }]
                }
            )
            if ((memberData.membershipType === 'Student' && existingCheckouts.length >= 3) || (memberData.membershipType === 'Premium' && existingCheckouts.length >= 5)) {
                return res.status(404).json({ error: "You have already reached you checkout limits !!" })
            } else {
                const bookIds = await Members.findOne({ _id: memberId }).populate('bookBag.book').select('-_id bookBag.book')
                //check whether the book is already checked out by the member
                let bookAlreadyCheckedout = false
                let existBook
                for (const data of bookIds.bookBag) {
                    const existingBookCheckouts = await LenderHistory.find(
                        {
                            member: memberId,
                            book: data.book._id,
                            $or: [{ status: 'Pending' }, { status: 'Approved' }, { status: 'Borrowed' }]
                        }
                    )
                    console.log("existing checkoutss" , existingBookCheckouts);
                    if (existingBookCheckouts.length > 0) {
                        bookAlreadyCheckedout = true
                        existBook = data.book.title
                        break
                        // return res.status(404).json({ error: `The book "${data.book.title}" has already checked out or requested by you !!` })
                    }

                    //check for book reservation
                    const bookId = data.book._id
                    const bookData = await Books.findById(bookId)
                    //checking whether the book is a reserved book or not and update the reservation preference
                    if (bookData.availableStock === 1 && bookData.reservationOrder.length > 0) {
                        //finding the second reservation of the book
                        if (bookData.reservationOrder.length > 1) {
                            const reservationId = bookData.reservationOrder[1].reservation
                            const reservationData = await Reservations.findById(reservationId)
                            //finding the member data
                            const member = await Members.findById(reservationData.memberId)
                            console.log("Next member is", member.name);
                            //change the nextCheckoutBy to next member
                            bookData.nextCheckoutBy = member._id
                            //set the reservation status to expire
                            const currentReservationId = bookData.reservationOrder[0].reservation
                            const updateReservation = await Reservations.findByIdAndUpdate(currentReservationId, { $set: { status: "Completed" } })
                            //removing the current reservation from the reservation order array
                            bookData.reservationOrder.shift()

                        } else {
                            //set the reservation status to expire
                            const currentReservationId = bookData.reservationOrder[0].reservation
                            const updateReservation = await Reservations.findByIdAndUpdate(currentReservationId, { $set: { status: "Completed" } })
                            //removing the current reservation from the reservation order array
                            bookData.reservationOrder.shift()
                            bookData.nextCheckoutBy = null
                        }
                        await bookData.save()
                    }

                    //updating available stock
                    await Books.findOneAndUpdate({ _id: data.book._id }, { $inc: { availableStock: -1 } })

                    // creating lender history for the book
                    const checkoutDate = new Date()
                    const dueDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                    const currentTime = new Date();
                    const tenMinutesLater = new Date(currentTime.getTime() + 5 * 60 * 1000);
                    const lenderHistory = new LenderHistory({
                        member: memberId,
                        book: data.book._id,
                        checkoutDate: checkoutDate,
                        dueDate: dueDate,
                        returnDate: null,
                        fineAmount: 0,
                        status: 'Pending',
                        expiresIn: tenMinutesLater
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
                }
                if (bookAlreadyCheckedout) {
                    res.status(404).json({ error: `The book "${existBook}" has already checked out or requested by you !!` })
                } else {
                    res.status(200).json({ message: "Checkout successfull" })
                }
            }

        } else {
            res.status(404).json({ error: "You have pending fines to pay..!!" })
        }

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getBanners = async (req, res, next) => {
    try {
        const bannerData = await Banners.find({ active: true })
        if (bannerData) {
            res.status(200).json({ message: "Sending banner data", bannerData: bannerData })
        } else {
            res.status(404).json({ error: "Couldn't fetch banner data" })
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal sever error" })
    }
}

const recentBooks = async (req, res, next) => {
    try {
        const bookData = await Books.find()
            .populate('category')
            .sort({ dateAdded: -1 })
            .limit(6)
        if (bookData) {
            res.status(200).json({ message: "Last added 5 books", recentBooks: bookData })
        } else {
            res.status(404).json({ error: "Couldn't find books" })
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
}

const getCheckouts = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const checkoutData = await LenderHistory.find(
            { member: memberId }
        ).populate('book')

        if (checkoutData) {
            res.status(200).json({ message: "Checkout history", checkoutData: checkoutData })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}

const getActiveCheckouts = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const activeCheckouts = await LenderHistory.find(
            {
                member: memberId,
                $and: [{ fineAmount: { $gt: 0 } }, { hasFinePaid: false }]

            }
        ).populate('book').populate('member').select('-password')
        if (activeCheckouts) {
            res.status(200).json({ message: "Active checkout data", activeCheckouts: activeCheckouts })
        } else {
            res.status(404).json({ error: "No active checkouts" })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })
    }
}

const reserveBook = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const bookId = req.params.bookId

        const memberData = await Members.findById(memberId)
        const bookData = await Books.findById(bookId)


        //check the member status

        //check for membership
        if (!memberData.isMember) {
            return res.status(404).json({ error: "You are not a member" })
        }
        //check for existing fines
        if (!memberData.hasFinePaid) {
            return res.status(404).json({ error: "You have existing fines !!" })
        }
        //check for reserved books numbers
        if (memberData.membershipType === 'Student' && memberData.reservations >= 1) {
            return res.status(404).json({ error: "You have reached your reservation limit !!" })
        }
        if (memberData.membershipType === 'Premium' && memberData.reservations >= 3) {
            return res.status(404).json({ error: "You have reached your reservation limit !!" })
        }
        //check if the book is already obtained by the member
        const lenderData = await LenderHistory.find(
            {
                member: memberId, $or: [{ status: 'Approved' }, { status: 'Pending' }, { status: 'Borrowed' }]
            }
        )
        if (lenderData.length > 0) {
            return res.status(404).json({ error: "This book has already occupied or requested by you !!" })
        }
        //check whether the book has already reserved by the user
        const memberDetails = await Members.findById(memberId) //populating all data from the reservation field
            .populate(
                {
                    path: 'reservations.reservation',
                    populate: [
                        { path: 'memberId', model: 'Members' },
                        { path: 'bookId', model: 'Books' }
                    ]
                }
            )

        const isAlreadyExist = memberDetails.reservations.filter((reservation) => {
            return reservation.reservation.bookId._id.toString() === bookId && reservation.reservation.status === 'Reserved'
        })
        if (isAlreadyExist.length) {
            return res.status(404).json({ error: 'You have already reserved this book !!' })
        }
        //if there is no reservation
        // create new book reservation
        const reservation = new Reservations(
            {
                memberId: memberId,
                bookId: bookId,
                reservedOn: new Date()
            }
        )

        await reservation.save()
        //adding reservation to member
        memberDetails.reservations.push(
            {
                reservation: reservation._id
            }
        )
        memberDetails.save()
        //adding reservation to book

        //add the memberId nextCheckoutBy field if the book has no previous reservations
        if (bookData.reservationOrder.length === 0) {
            bookData.nextCheckoutBy = memberId
        }
        bookData.reservationOrder.push(
            {
                reservation: reservation._id
            }
        )
        bookData.save()

        res.status(200).json({ message: `Book reservation for "${bookData.title}" has been processed !!` })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })
    }
}

const getReservedBooks = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const reservedBooks = await Members.findById(memberId)
            .select('-password')
            .populate(
                {
                    path: 'reservations.reservation',
                    populate: [
                        { path: 'bookId', model: 'Books' }
                    ]
                }
            )
        if (reservedBooks) {
            res.status(200).json({ message: "Reserved books", reservedBooks: reservedBooks.reservations })
        } else {
            res.status(500).json({ error: "No reserved books exists !!" })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })
    }
}

const getSingleBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId
        const bookData = await Books.findById(bookId).populate('category')
        if (bookData) {
            res.status(200).json({ message: "Book data sent", bookData: bookData })
        } else {
            res.status(404).json({ error: "No data found" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })
    }
}

const searchBooks = async (req, res, next) => {
    try {
        const searchKey = escapeRegExp(req.params.searchKey)
        const regex = new RegExp(searchKey, 'i')
        const bookData = await Books.find(
            { $or: [{ title: { $regex: regex } }, { author: { $regex: regex } }] }
        ).sort({ 'title': -1 })
        if (bookData) {
            res.status(200).json({ message: "Search results", bookData: bookData })
        } else {
            res.status(404).json({ error: "No books found" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })
    }
}

const cancelReservation = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const reservationId = req.params.reservationId

        //removing the reservation from the book reservationorder and udpating the status
        const reservationData = await Reservations.findById(reservationId)
        const bookId = reservationData.bookId
        const bookData = await Books.findById(bookId)

        //Update nextCheckoutBy if the member is the current nextCheckoutBy
        if (bookData.nextCheckoutBy.toString() === memberId.toString()) {
            const secondReservationId = bookData.reservationOrder[1].reservation
            if (secondReservationId) {
                const secondReservationData = await Reservations.findById(secondReservationId)
                bookData.nextCheckoutBy = secondReservationData.memberId
            } else {
                bookData.nextCheckoutBy = null
            }
            await bookData.save()
        }
        const bookUpdate = await Books.findByIdAndUpdate(
            bookId,
            {
                $pull: { reservationOrder: { reservation: reservationId } }
            }
        )
        //status update
        reservationData.status = 'Cancelled'
        const updateReservation = await reservationData.save()

        if (updateReservation && bookUpdate) {
            res.status(200).json({ message: "Your book reservation has been cancelled" })
        } else {
            res.status(404).json({ error: "Couldn't cancel reservation" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })
    }
}

const getFineHistory = async (req, res, next) => {
    try {
        const memberId = req.memberId
        const fineData = await LenderHistory.find(
            {
                member: memberId, hasFinePaid: true, fineAmount : {$gt : 0} , $or : [{status : 'Returned'} , {status : "Borrowed"}]
            }
        ).populate('book')
        if (fineData) {
            res.status(200).json({ message: "Fine histories", fineData: fineData })
        } else {
            res.status(404).json({ error: "No fine data found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server Error" })
    }
}

const getAdmin = async (req , res , next) => {
    try{
        const adminData = await Admins.find({})
        const admin = {
            name : adminData[0].name,
            id : adminData[0]._id
        }
        if(adminData) {
            res.status(200).json({message : "Admin data" , admin})
        } else {
            res.status(404).json({error : "No admin data"})
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({error : "Internal server Error"})
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
    getBanners,
    recentBooks,
    getCheckouts,
    getActiveCheckouts,
    createFinePaymentIntent,
    changeFineStatus,
    reserveBook,
    getReservedBooks,
    verifyEmail,
    getSingleBook,
    searchBooks,
    cancelReservation,
    getFineHistory,
    getChatMember,
    getAdmin
}