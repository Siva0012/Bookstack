const path = require('path')

const Admin = require('../models/admin_model')
const Members = require('../models/member_model')
const Books = require('../models/book_model')
const Categories = require('../models/category_model')
const Banners = require('../models/banner_model')
const LenderHistory = require('../models/lender_history')

const jwt = require('jsonwebtoken')
const { uploadToCloudinary, removeFromCloudinary } = require('../config/cloudinary')
const { adminTokenGenerator } = require('../utils/jwt-generator')

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
        console.log(err);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const isExist = await Admin.findOne({ email: email })
        if (isExist) {
            if (password === isExist.password) {
                const token = adminTokenGenerator({ adminId: isExist._id })
                res.status(200).json({ message: `Admin signed in successfully !!`, token: token, admin: isExist })
            } else {
                res.status(401).json({ message: "Password is not matching", error: "Invalid Password" })
            }
        } else {
            res.status(400).json({ message: "No such admin exists", error: "Invalid Email" })
        }
    } catch (err) {
        console.log(err);
    }
}

const getMembers = async (req, res, next) => {
    try {
        const members = await Members.find({})
        if (members) {
            res.status(200).json({ members: members })
        } else {
            res.status(400).json({ message: "No members found" })
        }

    } catch (err) {
        console.log(err);
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
                isbn, stock, publisher, description } = req.body
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
                description: description
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
        console.log(err);
        next()
    }
}

const addGoogleBook = async (req, res, next) => {
    try {
        console.log("request in add google book", req.body);
        res.status(201).json({ message: 'book created' })
    } catch (err) {
        console.log(err);
    }
}

const getSingleMember = async (req, res, next) => {
    try {

        const memberId = req.params.memberId
        console.log("memberdidddd", memberId);
        const memberData = await Members.findOne({ _id: memberId })
        if (memberData) {
            res.status(200).json({ message: "Member details", memberData: memberData })
        } else {
            res.status(404).json({ message: "No member exists" })
        }
    } catch (err) {
        console.log("error in getsinglemember", err);
    }
}

const addCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body
        const isExists = await Categories.findOne({ name: name })
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
            console.log("eorsfjiosdfuasdufosdfasdfsdhfiosdufoij");
            res.status(404).json({ error: `"${name}" is already exists !!` })
        }

    } catch (err) {
        console.log(err);
    }
}

const getCategories = async (req, res, next) => {
    try {
        const catData = await Categories.find({})
        if (catData) {
            res.status(200).json({ message: "Categories sent", catData: catData })
        }
    } catch (err) {
        console.log(err);
    }
}

const getBooks = async (req, res, next) => {
    try {
        const books = await Books.find({}).populate("category")
        if (books) {
            res.status(200).json({ message: "Books sent", books: books })
        } else {
            res.status(404).json({ message: "No books found" })
        }
    } catch (err) {
        console.log(err);
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
        console.log(err);
    }
}

const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId
        const bookData = req.body

        const title = req.body.title
        const author = req.body.author
        const edition = req.body.edition
        const category = req.body.category._id || req.body.category
        const isbn = req.body.isbn
        const stock = req.body.stock
        const publisher = req.body.publisher
        const description = req.body.description
        const coverPhoto = req.file.path

        // deleting image from cloudinary
        const existingBookData = await Books.findOne({ _id: bookId })
        console.log("existing book", existingBookData);
        const existingPublicId = existingBookData.publicId
        const response = await removeFromCloudinary(existingPublicId)

        // uploading new image to cloudinary
        const data = await uploadToCloudinary(coverPhoto, "book-cover-images")

        // upating database
        const update = {
            title: title,
            author: author,
            edition: edition,
            category: category,
            isbn: isbn,
            stock: stock,
            publisher: publisher,
            description: description,
            coverPhoto: data.url,
            publicId: data.public_id
        }
        const updateResponse = await Books.findOneAndUpdate({ _id: bookId }, update, { new: true })
        console.log("update response at server", updateResponse)
        if (updateResponse) {
            res.status(200).json({ message: "Updated book", updateBook: updateResponse })
        } else {
            res.status(404).json({ message: "Update failed" })
        }
    } catch (err) {
        console.log(err);
        next()
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
            console.log(response);
            if (isListed) {
                res.status(200).json({ message: "Book unlisted successfully" })
            } else {
                res.status(200).json({ message: "Book listed successfully" })
            }
        } else {
            res.status(404).json({ error: "Error in deleting book" })
        }
    } catch (err) {
        console.log(err);
    }
}

const addBanner = async (req, res, next) => {
    try {
        const { title, description } = req.body
        const bannerImage = req.file.path
        const isExists = await Banners.findOne({ title: title })
        if (!isExists) {

            //upload image to cloudinary
            const imageUploaded = await uploadToCloudinary(bannerImage, "banner-images")

            //adding to database
            const banner = new Banners({
                title: title,
                description: description,
                image: imageUploaded.url,
                publicId: imageUploaded.public_id
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
        console.log(err);
        res.status(500).json({ error: err.message })
    }
}

const getBanners = async (req, res, next) => {
    try {
        const bannerData = await Banners.find({})
        if (bannerData) {
            res.status(200).json({ message: "banner data", bannerData: bannerData })
        } else {
            res.status(404).json({ error: "Couldn't find banner data" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}

const editBanner = async (req, res, next) => {
    try {
        console.log("edit banner called");
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
        console.log(err);
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
        console.log(err);
        res.status(500).json({ error: "Internal server Error" })
    }
}

const updateBannerImage = async (req, res, next) => {
    try {
        const { bannerId } = req.body
        const bannerPhoto = req.file.path
        const bannerData = await Banners.findOne({ _id: bannerId })
        if (bannerData) {
            const existingPublicId = bannerData.public_id

            //removing image from cloudinary
            const removeImage = await removeFromCloudinary(existingPublicId)

            //uploading new image
            const data = await uploadToCloudinary(bannerPhoto, 'banner-images')
            if (data) {
                //update database
                const bannerImageUpdate = await Banners.findOneAndUpdate(
                    {
                        _id: bannerId
                    },
                    {
                        $set: { image: data.url, public_id: data.public_id }
                    }
                )
                if (bannerImageUpdate) {
                    res.status(200).json({ message: "Updated banner image" })
                } else {
                    res.status(404).json({ error: "Error occured" })
                }
            }
        }




    } catch (err) {
        console.log(err);
    }
}

const getLenderHistory = async (req, res, next) => {
    try {

        // const lenderData = await LenderHistory.find({}).populate('member').populate('book').select('-password')

        const lenderData = await LenderHistory.find({}).populate('member').populate('book').select('-password')

        lenderData ? res.status(200).json({ message: "lender history", lenderData: lenderData }) :
            res.status(404).json({ error: "no lender data" })

    } catch (err) {
        console.log(err);
        res.status(500).jso({ error: err.message })
    }
}

const changeCheckoutStatus = async (req, res, next) => {
    try {
        const lenderId = req.params.lenderId
        const status = req.params.status
        const lenderData = await LenderHistory.findById(lenderId).populate('book')
        const bookId = lenderData.book

        if (status === 'Approved') {
            //After approval, change the duedate for the checkout
            const dueDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
            const udpateDue = await LenderHistory.findOneAndUpdate(
                { _id: lenderId },
                {
                    $set: { dueDate: dueDate }
                }
            )
        }
        if (status === 'Returned') {
            //update the available stock of the book
            const updateStock = await Books.findOneAndUpdate(
                { _id: bookId },
                {
                    $inc: { availableStock: +1 },
                }
            )
            console.log("STOCK UPDATE OF THE BOOK", updateStock);
            //update the returndate of the checkout 
            const returnDate = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            const updateReturnDate = await LenderHistory.findOneAndUpdate(
                {_id : lenderId},
                {$set : {returnDate : returnDate}}
            )
            console.log("RETURN DATE UPDATE OF CHECKOUT" , updateReturnDate);

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


module.exports = {
    login,
    getMembers,
    addBook,
    addGoogleBook,
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
    updateBannerImage
}