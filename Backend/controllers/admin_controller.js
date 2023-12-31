const path = require('path')

const Admin = require('../models/admin_model')
const Members = require('../models/member_model')
const Books = require('../models/book_model')
const Categories = require('../models/category_model')
const Banners = require('../models/banner_model')
const LenderHistory = require('../models/lender_history')
const Reservations = require('../models/reservation_model')
const Notifications = require('../models/notification_model')
const sendEmail = require('../utils/send_email')
const { sendNotificationToUser } = require('../config/socket')

const jwt = require('jsonwebtoken')
const { uploadToCloudinary, removeFromCloudinary } = require('../config/cloudinary')
const { adminTokenGenerator } = require('../utils/jwt-generator')
const mongoose = require('mongoose')
const {validationResult} = require('express-validator')

const verifyAdmin = async (req, res, next) => {
    try {
        const adminId = req.adminId
        const admin = await Admin.findOne({ _id: adminId })
        if (admin) {
            res.status(200).json({ message: "Admin verified", isAdmin: true })
        } else {
            res.status(401).json({ message: "Failed admin authentication at server" })
        }
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(404).json(errors.array())
        } else {
            const isExist = await Admin.findOne({ email: email })
            if (isExist) {
                if (password === isExist.password) {
                    const token = adminTokenGenerator({ adminId: isExist._id })
                    const admin = {
                        _id : isExist._id,
                        email : isExist.email,
                        name : isExist.name
                    }
                    res.status(200).json({ message: `Admin signed in successfully !!`, token: token, admin: admin })
                } else {
                    res.status(401).json({ error: "Invalid Email or password" })
                }
            } else {
                res.status(400).json({ error: "Invalid Email or password" })
            }
        }
    } catch (err) {
        next(err)
    }
}

const getMembers = async (req, res, next) => {
    try {
        const members = await Members.find({}).sort()
        if (members) {
            res.status(200).json({ members: members })
        } else {
            res.status(400).json({ message: "No members found" })
        }

    } catch (err) {
        next(err)
    }
}

const blockOrUnblockMember = async (req, res, next) => {
    try {

        const { memberId, isBlocked } = req.body
        const memberUpdate = await Members.findByIdAndUpdate(memberId, { $set: { isBlocked: !isBlocked } })
        let message = ''
        if (memberUpdate.isBlocked) {
            message = "You are Unblocked by the admin"
        } else if (!memberUpdate.isBlocked) {
            message = "You are Blocked by the admin"
        }
        const today = new Date()
        const notification = {
            notificationType: 'Block',
            notificationDate: today,
            message: message,
            member: memberId
        }
        const not = new Notifications(notification)
        await not.save()
        sendNotificationToUser(memberId, notification)
        if (memberUpdate) {
            res.status(200).json({ isBlocked: memberUpdate.isBlocked, memberName: memberUpdate.name })
        }

    } catch (err) {
        next(err)
    }
}

const addBook = async (req, res, next) => {
    try {
        const bookTitle = req.body.title
        const isExists = await Books.findOne({ title: bookTitle })
        if (!isExists) {
            const coverPhoto = req.file.path ?? null
            const data = await uploadToCloudinary(coverPhoto, "book-cover-images")
            const { title, author, edition, category,
                isbn, stock, publisher, description, shelfNumber } = req.body
            const bookData = {
                title: title,
                author: author,
                edition: edition,
                category: category,
                isbn: isbn,
                publisher: publisher,
                stock: stock,
                coverPhoto: data.url,
                publicId: data.public_id,
                description: description,
                shelfNumber: shelfNumber
            }

            const book = new Books(bookData)
            await book.save()
                .then((response) => {
                    if (response) {
                        res.status(201).json({ message: `Added "${bookData.title}"`, book: response })
                    } else {
                        res.status(404).json({ message: "Error in adding book", error: "Error in adding book" })
                    }
                })
        } else {
            res.status(409).json({ error: `"${bookTitle}" is already exists !!` })
        }
    } catch (err) {
        next(err)
    }
}

const getSingleMember = async (req, res, next) => {
    try {

        const memberId = req.params.memberId
        const memberData = await Members.findOne({ _id: memberId })
        if (memberData) {
            res.status(200).json({ message: "Member details", memberData: memberData })
        } else {
            res.status(404).json({ message: "No member exists" })
        }
    } catch (err) {
        next(err)
    }
}

const addCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body
        const isExists = await Categories.findOne({ name: name })
        const allCategories = await Categories.find()
        if (!isExists) {
            const category = new Categories(
                {
                    name: name,
                    description: description
                }
            )
            await category.save()
                .then((response) => {
                    if (response) {
                        res.status(201).json({ message: "Category added" })
                    } else {
                        res.status(500).json({ message: "Error in adding category" })
                    }
                })
        } else {
            res.status(404).json({ error: `"${name}" is already exists !!` })
        }

    } catch (err) {
        next(err)
    }
}

const getCategories = async (req, res, next) => {
    try {
        const catData = await Categories.find({}).sort({ dateAdded: -1 })
        if (catData) {
            res.status(200).json({ message: "Categories sent", catData: catData })
        }
    } catch (err) {
        next(err)
    }
}

const getBooks = async (req, res, next) => {
    try {
        const books = await Books.find({}).populate("category").sort({ dateAdded: -1 })
        if (books) {
            res.status(200).json({ message: "Books sent", books: books })
        } else {
            res.status(404).json({ message: "No books found" })
        }
    } catch (err) {
        next(err)
    }
}

const getSingleBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId
        const book = await Books.findOne({ _id: bookId }).populate("category")
        if (book) {
            res.status(200).json({ message: "Sent the book", bookData: book })
        } else {
            res.status(404).json({ message: "No book found" })
        }
    } catch (err) {
        next(err)
    }
}

const updateBook = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
           return res.status(404).json(errors.array())
        } else {
            const { title, author, edition, category, isbn, stock, publisher, maximumReservation, description } = req.body
            const bookId = req.params.bookId
            const update = {
                title: title,
                author: author,
                edition: edition,
                category: category,
                isbn: isbn,
                stock: stock,
                publisher: publisher,
                maxReservations: maximumReservation,
                description: description,
            }
            const bookUpdate = await Books.findByIdAndUpdate(bookId, update)
            if (bookUpdate) {
                res.status(200).json({ message: "book received", updated: true })
            } else {
                res.status(404).json({ error: "Failed to update", updated: false })
            }
        }
    } catch (err) {
        next(err)
    }
}

const updateBookImage = async (req, res, next) => {
    try {
        const bookId = req.params.bookId
        const coverPhoto = req.file.path
        const bookData = await Books.findById(bookId)
        const existingPublicId = bookData.publicId
        //remove image from cloudinary
        await removeFromCloudinary(existingPublicId)
        //upload new image to cloudinary
        const data = await uploadToCloudinary(coverPhoto, 'book-cover-images')
        if (data) {
            const bookUpdate = await Books.findByIdAndUpdate(bookId, { $set: { coverPhoto: data.url, publicId: data.public_id } })
            if (bookUpdate) {
                res.status(200).json({ message: "Book updated successfully", updated: true })
            } else {
                res.status(404).json({ error: "Couldn't update book", updated: false })
            }
        }
    } catch (err) {
        next(err)
    }
}

const removeBook = async (req, res, next) => {
    try {

        const bookId = req.params.bookId
        let isListed = req.params.isListed

        isListed === 'false' ? isListed = false : isListed = Boolean(isListed)
        let response
        isListed ?
            response = await Books.updateOne(
                { _id: bookId },
                { $set: { listed: false } }
            ) :
            response = await Books.updateOne(
                { _id: bookId },
                { $set: { listed: true } }
            )
        if (response) {
            if (isListed) {
                res.status(200).json({ message: "Book unlisted successfully" })
            } else {
                res.status(200).json({ message: "Book listed successfully" })
            }
        } else {
            res.status(404).json({ error: "Error in deleting book" })
        }
    } catch (err) {
        next(err)
    }
}

const addBanner = async (req, res, next) => {
    try {
        const { title, description, url } = req.body
        const bannerImage = req.file.path
        const isExists = await Banners.findOne({ title: title })
        if (!isExists) {

            //upload image to cloudinary
            const imageUploaded = await uploadToCloudinary(bannerImage, "banner-images")

            //adding to database
            const banner = new Banners({
                title: title,
                description: description,
                url: url,
                image: imageUploaded.url,
                publicId: imageUploaded.public_id,
            })
            const updateResponse = await banner.save()
            if (updateResponse) {
                res.status(201).json({ message: `Created new Banner !!` })
            } else {
                res.status(404).json({ message: `Error in creating new banner` })
            }

        } else {
            res.status(404).json({ error: `Banner already exists !!` })
        }

    } catch (err) {
        next(err)
    }
}

const getBanners = async (req, res, next) => {
    try {
        const bannerData = await Banners.find({}).sort({ createdAt: -1 })
        if (bannerData) {
            res.status(200).json({ message: "banner data", bannerData: bannerData })
        } else {
            res.status(404).json({ error: "Couldn't find banner data" })
        }
    } catch (err) {
        next(err)
    }
}

const editBanner = async (req, res, next) => {
    try {
        const bannerId = req.params.bannerId
        const { title, description } = req.body
        const update = {}
        if (title) {
            update.title = title
        }
        if (description) {
            update.description = description
        }

        const updateResponse = await Banners.updateOne({ _id: bannerId }, { $set: update })
        updateResponse ?
            res.status(200).json({ message: "Banner updated successfully" })
            :
            res.status(404).json({ error: "Could'nt update banner" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const changeBannerStatus = async (req, res, next) => {
    try {
        const { bannerId, status } = req.body
        const udpate = !status
        const updateResponse = await Banners.findOneAndUpdate({ _id: bannerId }, { $set: { active: udpate } })
        if (updateResponse) {
            let message = ''
            status ? message = "Banner disabled" : message = "Banner enabled"
            res.status(200).json({ message: message })
        } else {
            res.status(404).json({ error: "Couldn't update the status" })
        }

    } catch (err) {
        next(err)
    }
}

const updateBannerImage = async (req, res, next) => {
    try {

        const bannerId = req.params.bannerId
        const bannerPhoto = req.file.path
        const bannerData = await Banners.findById(bannerId)
        const existingPublicId = bannerData.publicId
        //remove from cloudinary
        await removeFromCloudinary(existingPublicId)
        //upload to cloudinary
        const data = await uploadToCloudinary(bannerPhoto, 'banner-images')
        if (data) {
            bannerData.publicId = data.public_id
            bannerData.image = data.url
            await bannerData.save()
            res.status(200).json({ message: "Updated banner Image", updated: true, image: data.url })
        } else {
            res.status(404).json({ error: "Couldn't update banner image", updated: false })
        }

    } catch (err) {
        next(err)
    }
}

const updateBannerContent = async (req, res, next) => {
    try {
        const bannerId = req.params.bannerId
        const { title, description, url } = req.body
        const update = { title: title, description: description, url: url }
        const bannerUpdate = await Banners.findByIdAndUpdate(bannerId, { $set: update })
        if (bannerUpdate) {
            res.status(200).json({ message: "Updated banner", updated: true })
        } else {
            res.status(404).json({ error: "Couldn't update the banner", updated: false })
        }
    } catch (err) {
        next(err)
    }
}

const getLenderHistory = async (req, res, next) => {
    try {
        const page = req.params.page ? parseInt(req.params.page) : 1
        const limit = req.params.limit ? parseInt(req.params.limit) : 10
        const skip = (page - 1) * limit
        const lenderCount = await LenderHistory.countDocuments()
        const lenderData = await LenderHistory.find({}).populate('member').populate('book').select('-password').sort({ checkoutDate: -1 }).skip(skip).limit(limit)
        lenderData ? res.status(200).json({ message: "lender history", lenderData: lenderData , lenderCount }) :
            res.status(404).json({ error: "no lender data" })

    } catch (err) {
        next(err)
    }
}

const changeCheckoutStatus = async (req, res, next) => {
    try {
        const lenderId = req.params.lenderId
        const status = req.params.status
        const lenderData = await LenderHistory.findById(lenderId).populate('book')
        const bookId = lenderData.book
        const bookData = await Books.findById(bookId)
        const memberId = lenderData.member
        const sendNotification = async(type , message , memberId) => {
            const userId = memberId.toString()
            const notification = {
                notificationType : type,
                notificationDate : new Date(),
                message : message,
                member : userId
            }
            const not = new Notifications(notification)
            await not.save()
            sendNotificationToUser(memberId , notification)
        }

        if (status === 'Approved') {
            //After approval, change the duedate for the checkout
            const dueDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
            const message = `Your checkout for ${bookData.title} has Approved by the admin`
            await sendNotification("Checkout" , message , memberId )
            const udpateDue = await LenderHistory.findOneAndUpdate(
                { _id: lenderId },
                {
                    $set: { dueDate: dueDate }
                }
            )
        }
        if (status === 'Returned') {
            //checking for book reservation
            const bookData = await Books.findById(bookId)
            if (bookData.availableStock === 0 && bookData.reservationOrder.length > 0) {

                //finding the first reservation of the book
                const reservationId = bookData.reservationOrder[0].reservation
                const reservationData = await Reservations.findById(reservationId)
                //finding the member data
                const member = await Members.findById(reservationData.memberId)
                //sending notification to the member
                const mailNotification = `<p>Dear ${member.name},</p>
                <p>We are pleased to inform you that the book you reserved, "${bookData.title}", is now available for checkout at our library. You can proceed to the library and collect the book at your convenience.</p>
                <p>Please note that the book will be held for you for a limited time, and if you fail to collect it within 8 hours from now, your reservation will be canceled.</p>
                <p>If you have any questions or need further assistance, feel free to contact our library staff.</p>
                <p>Thank you for using our library services.</p>
                <p>Best regards,<br>Bookstack</p>`
                await sendEmail(member.email, "Book reservation", mailNotification)

                const notMessage = `The book "${bookData.title}" is available for checkout.`
                //create notification
                const notification = {
                    notificationType : "Reservation",
                    notificationDate : new Date(),
                    message : notMessage,
                    member : member._id
                }
                const not = new Notifications(notification)
                await not.save()
                //send notification to the member via socket
                sendNotificationToUser(member._id, notification)

                // change the nextCheckoutBy to give preference to the next member
                // bookData.nextCheckoutBy = member._id
                await bookData.save()

                // change the notification date in the reservation data
                reservationData.notification.hasNotified = true
                reservationData.notification.notifiedOn = new Date()
                await reservationData.save()
            }
            //update the available stock of the book
            const updateStock = await Books.findOneAndUpdate(
                { _id: bookId },
                {
                    $inc: { availableStock: +1 },
                }
            )
            //update the returndate of the checkout 
            // const returnDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            const returnDate = new Date()
            const updateReturnDate = await LenderHistory.findOneAndUpdate(
                { _id: lenderId },
                { $set: { returnDate: returnDate, hasFinePaid: true } }
            )
        }

        const lenderUpdate = await LenderHistory.findOneAndUpdate(
            { _id: lenderId },
            {
                $set: { status: status }
            }
        )
        if (lenderUpdate) {
            res.status(200).json({ message: `Changed status to "${status}" ` })
        }
    } catch (err) {
        next(err)
    }
}

const getChatMember = async (req, res, next) => {
    try {
        const { memberId } = req.params
        const memberData = await Members.findById(memberId).select('name , profilePicture')
        if (memberData) {
            res.status(200).json({ message: "member data", memberData })
        } else {
            res.status(404).json({ error: "No member data" })
        }
    } catch (err) {
        next(err)
    }
}

const getCheckoutData = async (req, res, next) => {
    try {

        const returnedBooks = await LenderHistory.find({ status: "Returned" }).select('book')
        const categoryCounts = await LenderHistory.aggregate(
            [
                { $match: { status: "Returned" } },
                {
                    $lookup: {  //lookup for getting book details
                        from: 'books',
                        localField: 'book',
                        foreignField: '_id',
                        as: 'book'
                    }
                },
                {
                    $unwind: '$book' //unwind for make it object
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'book.category',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                {
                    $unwind: '$category'
                },
                {
                    $group: {  //group by category and find count
                        _id: '$category.name',
                        count: { $sum: 1 }
                    }
                }
            ]
        )

        if (categoryCounts) {
            res.status(200).json({ message: "checkout data", data: categoryCounts })
        } else {
            res.status(404).json({ error: "No data" })
        }
    } catch (err) {
        next(err)
    }
}

const getMembershipData = async (req, res, next) => {
    try {
        const memberShipData = await Members.aggregate(
            [
                // {$match : {isMember : true}},
                {
                    $group: {
                        _id: '$membershipType',
                        count: { $sum: 1 }
                    }
                }
            ]
        )
        if (memberShipData) {
            res.status(200).json({ message: "member data", memberShipData })
        } else {
            res.status(404).json({ error: "No data found" })
        }
    } catch (error) {
        next(err)
    }
}

const getBmc = async (req, res, next) => {
    try {
        const books = await Books.find().count()
        const members = await Members.find().count()
        const categories = await Categories.find().count()
        const data = {
            books: books,
            members: members,
            categories: categories
        }
        if (data) {
            res.status(200).json({ message: "data sent", data: data })
        } else {
            res.status(404).json({ error: "No data found" })
        }

    } catch (err) {
        next(err)
    }
}

const totalFineAmount = async (req, res, next) => {
    try {
        const totalFine = await LenderHistory.aggregate(
            [
                { $match: { hasFinePaid: true, fineAmount: { $gt: 0 } } },
                {
                    $group: {
                        _id: null,
                        totalFinePaid: { $sum: '$fineAmount' }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalFineAmount: '$totalFinePaid'
                    }
                },

            ]
        )
        if (totalFine) {
            const totalFineAmount = totalFine[0].totalFineAmount
            res.status(200).json({ message: "fine amount", totalFineAmount })
        } else {
            res.status(404).json({ error: "No fine data found" })
        }
    } catch (err) {
        next(err)
    }
}

const getLenderData = async (req , res , next) => {
    try{
        const lenderData = await LenderHistory.find({}).populate('member').populate('book').select('-password').sort({checkoutDate : -1}).limit(5)
        if(lenderData) {
            res.status(200).json({message : "Lenderdata" , lenderData})
        } else {
            res.status(404).json({error : "couldn't find lenderdata"})
        }
    }catch(err) {
        next(err)
    }
}

const downloadLenderData = async (req , res, next) => {
    try{
        const from = new Date(req.params.from)
        const to = new Date(req.params.to)
        if(to > new Date()) {
            return res.status(404).json({error : "End date should be less than current date !!"})
        }
        if(from > to) {
            return res.status(404).json({error : "Invalid dates provided !!"})
        }
        const lenderData = await LenderHistory.find(
            {
                checkoutDate : {$gte : from , $lte : to}
            }
        ).populate('member').populate('book').select('-password')
        if(lenderData) {
            res.status(200).json({message : 'Dowload data' , lenderData})
        } else {
            res.status(404).json({error : "Couldn't find lender data"})
        }
    }catch(err) {
        next(err)
    }
}

const getBookWiseCheckoutData = async (req , res , next) => {
    try{
        const bookData = await LenderHistory.aggregate(
            [
                {
                    $match : {
                        status : 'Returned'
                    }
                },
                {
                    $group : {
                        _id : '$book',
                        count : {$sum : 1}
                    }
                },
                {
                    $lookup : {
                        from : 'books',
                        localField : '_id',
                        foreignField : '_id',
                        as : 'bookData'
                    }
                },
                {
                    $unwind : '$bookData'
                },
                {
                    $project : {
                        _id : 0,
                        bookTitle : '$bookData.title',
                        count : 1
                    }
                }
            ]
        )
        if(bookData) return res.status(200).json({message : 'book data' , bookData})
        else return res.status(404).json({error : "no data found"})
    }catch(err) {
        next(err)
    }
}

const getAdminData = async(req , res , next) => {
    try{
        const response = await Admin.find().select('-password')
        if(response) {
            const adminData = response[0]
            res.status(200).json({message : "admin data" , adminData : adminData})
        } else {
            res.status(404).json({error : "No data found"})
        }
    }catch(err) {
        next(err)
    }
}


module.exports = {
    login,
    getMembers,
    addBook,
    // addGoogleBook,
    verifyAdmin,
    getSingleMember,
    addCategory,
    getCategories,
    getBooks,
    getSingleBook,
    updateBook,
    removeBook,
    addBanner,
    getBanners,
    getLenderHistory,
    changeCheckoutStatus,
    changeBannerStatus,
    updateBannerImage,
    blockOrUnblockMember,
    updateBookImage,
    updateBannerContent,
    getChatMember,
    getCheckoutData,
    getMembershipData,
    getBmc,
    totalFineAmount,
    getLenderData,
    downloadLenderData,
    getBookWiseCheckoutData,
    getAdminData
}