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
        res.status(500).json({error : "Internal server Error"})
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
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
                res.status(401).json({ error: "Invalid Password" })
            }
        } else {
            res.status(400).json({ error: "Invalid Email" })
        }
    } catch (err) {
        res.status(500).json({error : "Internal server Error"})
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
        res.status(500).json({error : "Internal server Error"})
    }
}

const blockOrUnblockMember = async (req, res, next) => {
    try {

        const { memberId, isBlocked } = req.body
        const memberUpdate = await Members.findByIdAndUpdate(memberId, { $set: { isBlocked: !isBlocked } })
        let message = ''
        if (memberUpdate.isBlocked) {
            message = "You have blocked by the admin"
        } else if (!memberUpdate.isBlocked) {
            message = "You have unblocked by the admin"
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
        res.status(500).json({ error: "Internal server Error" })
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
        res.status(500).json({ error: "Internal server Error" })
    }
}

// const addGoogleBook = async (req, res, next) => {
//     try {
//         res.status(201).json({ message: 'book created' })
//     } catch (err) {
//         console.log(err);
//     }
// }

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
        res.status(500).json({ error: "Internal server Error" })
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
        res.status(500).json({ error: "Internal server Error" })

    }
}

const getCategories = async (req, res, next) => {
    try {
        const catData = await Categories.find({}).sort({ dateAdded: -1 })
        if (catData) {
            res.status(200).json({ message: "Categories sent", catData: catData })
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server Error" })

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
        res.status(500).json({ error: "Internal server Error" })

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
        res.status(500).json({ error: "Internal server Error" })

    }
}

// const updateBook = async (req, res, next) => {
//     try {
//         const bookId = req.params.bookId
//         const bookData = req.body

//         //destructure inpuit sanitization
//         const title = req.body.title
//         const author = req.body.author
//         const edition = req.body.edition
//         const category = req.body.category._id || req.body.category
//         const isbn = req.body.isbn
//         const stock = req.body.stock
//         const publisher = req.body.publisher
//         const description = req.body.description
//         const coverPhoto = req.file.path

//         // deleting image from cloudinary
//         const existingBookData = await Books.findOne({ _id: bookId })
//         console.log("existing book", existingBookData);
//         const existingPublicId = existingBookData.publicId
//         const response = await removeFromCloudinary(existingPublicId)

//         // uploading new image to cloudinary
//         const data = await uploadToCloudinary(coverPhoto, "book-cover-images")

//         // upating database
//         const update = {
//             title: title,
//             author: author,
//             edition: edition,
//             category: category,
//             isbn: isbn,
//             stock: stock,
//             publisher: publisher,
//             description: description,
//             coverPhoto: data.url,
//             publicId: data.public_id
//         }
//         //micro modules for making code simpel
//         const updateResponse = await Books.findOneAndUpdate({ _id: bookId }, update, { new: true })
//         console.log("update response at server", updateResponse)
//         if (updateResponse) {
//             res.status(200).json({ message: "Updated book", updateBook: updateResponse })
//         } else {
//             res.status(404).json({ message: "Update failed" })
//         }
//     } catch (err) {
//         console.log(err);
//         next()
//     }
// }

const updateBook = async (req, res, next) => {
    try {
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

    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
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
        res.status(500).json({ error: "Internal server Error" })
    }
}

const removeBook = async (req, res, next) => {
    try {

        // Books.find({})
        // .then((books) => {
        //     const promises = books.map((book) => {
        //         book.availableStock = book.stock
        //         return book.save()
        //     })
        //     return Promise.all(promises)
        // })

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
        res.status(500).json({ error: "Internal server Error" })

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
        res.status(500).json({ error: err.message })
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
        res.status(500).json({ error: "Internal server error" })
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
        res.status(500).json({ error: "Internal server Error" })
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
        res.status(500).json({ error: "Internal server Error" })

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
        res.status(500).jsone({ error: "Internal servre error" })
    }
}

const getLenderHistory = async (req, res, next) => {
    try {

        const lenderData = await LenderHistory.find({}).populate('member').populate('book').select('-password').sort({ checkoutDate: -1 })
        lenderData ? res.status(200).json({ message: "lender history", lenderData: lenderData }) :
            res.status(404).json({ error: "no lender data" })

    } catch (err) {
        res.status(500).jso({ error: err.message })
    }
}

const changeCheckoutStatus = async (req, res, next) => {
    try {
        const lenderId = req.params.lenderId
        const status = req.params.status
        const lenderData = await LenderHistory.findById(lenderId).populate('book')
        const bookId = lenderData.book
        const memberId = lenderData.member
        if (status === 'Approved') {
            //After approval, change the duedate for the checkout
            const dueDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
            sendNotificationToUser(memberId, "Your checkout has approved")
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
                const message = `<p>Dear ${member.name},</p>
                <p>We are pleased to inform you that the book you reserved, "${bookData.title}", is now available for checkout at our library. You can proceed to the library and collect the book at your convenience.</p>
                <p>Please note that the book will be held for you for a limited time, and if you fail to collect it within 8 hours from now, your reservation will be canceled.</p>
                <p>If you have any questions or need further assistance, feel free to contact our library staff.</p>
                <p>Thank you for using our library services.</p>
                <p>Best regards,<br>Bookstack</p>`
                await sendEmail(member.email, "Book reservation", message)

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
        res.status(500).json({ error: err.message })
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
        res.status(500).json({ error: "Internal server Error" })
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
        res.statu(500).json({ error: "Internal server Error" })
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
        res.status(500).json({ error: "Internal server Error" })
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
        res.status(500).json({ error: "Internal server Error" })
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
        res.status(500).json({ error: "Internal server Error" })
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
    totalFineAmount
}