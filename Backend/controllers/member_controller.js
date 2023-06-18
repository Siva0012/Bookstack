const Members = require('../models/member_model')
const Books = require('../models/book_model')
const Categories = require('../models/category_model')

const bcrypt = require('bcrypt')
const { tokenGenerator } = require('../utils/jwt-generator')
const { response } = require('express')

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
                    memberId : memberExists._id,
                    name : memberExists.name,
                    email : memberExists.email,
                    date : memberExists.dateOfJoin,

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



module.exports = {
    register,
    login,
    verifyMember,
    googleLogin,
    getBooks,
    getCategories,
    getBooksByCat
}