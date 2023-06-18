const path = require('path')

const Admin = require('../models/admin_model')
const Members = require('../models/member_model')
const Books = require('../models/book_model')
const Categories = require('../models/category_model')
const Banners = require('../models/banner_model')

const jwt = require('jsonwebtoken')
const { uploadToCloudinary, removeFromCloudinary } = require('../config/cloudinary')

const verifyAdmin = async (req, res, next) => {
    try {
        const adminId = req.adminId
        const admin = await Admin.findOne({ _id: adminId })
        if (admin) {
            res.status(200).json({ message: "Admin verified", isAdmin: true })
        } else {
            res.status(401).json({ message: "Failed admin authentication at database" })
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
                const token = jwt.sign({ adminId: isExist._id }, process.env.JWT_SECRET)
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

const googleLogin = async (req, res, next) => {
    try {
        console.log(req.body);
        res.status(200).json({ message: "received request here" })
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
        const bookId = req.params.bookId
        let isAvailable = req.params.isAvailable

        isAvailable === 'false' ? isAvailable = false : isAvailable = Boolean(isAvailable)
        let response

        isAvailable ?
            response = await Books.updateOne(
                { _id: bookId },
                { $set: { isAvailable: false } }
            ) :
            response = await Books.updateOne(
                { _id: bookId },
                { $set: { isAvailable: true } }
            )
        if (response) {
            console.log(response);
            if (isAvailable) {
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
        const { title, subtitle } = req.body
        const bannerImage = req.file.path

        const isExists = await Banners.findOne({ title: title })
        if (!isExists) {

            //upload image to cloudinary
            const imageUploaded = await uploadToCloudinary(bannerImage, "banner-images")

            //adding to database
            const update = {
                title: title,
                subtitle: subtitle,
                image: imageUploaded.url,
                publicId: imageUploaded.public_id
            }

            const banner = new Banners(update)
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
    }
}

const editBanner = async (req, res, next) => {
    try {
        console.log("edit banner called");
        const bannerId = req.params.bannerId
        const { title, subtitle } = req.body
        const update = {}
        if (title) {
            update.title = title
        }
        if (subtitle) {
            update.subtitle = subtitle
        }

        const updateResponse = await Banners.updateOne({ _id: bannerId }, { $set: update })
        updateResponse ?
            res.status(200).json({ message: "Banner updated successfully" })
            :
            res.status(404).json({ message: "Could'nt update banner" })

    } catch (err) {
        console.log(err);
    }
}

const bannerImageUpdate = async (req, res, next) => {
    try {
        console.log("Called image update function");
        const bannerId = req.params.bannerId


        //finding the public id
        const isExists = await Banners.findOne({_id : bannerId})
        if(isExists) {
            const publicId = isExists.publicId            
            const {bannerPhoto} = req.file.path
            const update = {}
            if(bannerPhoto) {
                update.image = bannerPhoto
            }
        } else {

        }

    } catch (err) {
        console.log(err);
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
    addBanner
}