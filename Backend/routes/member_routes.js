const express = require('express')
const member_router = express.Router()
const memberController = require('../controllers/member_controller')
const { verifyMemberToken } = require('../middlewares/Auth')

member_router.get('/is-member-auth'  , verifyMemberToken , memberController.verifyMember)

member_router.post('/login' , memberController.login)
member_router.post('/register' , memberController.register)
member_router.post('/google-login' , memberController.googleLogin)

member_router.get('/categories' , verifyMemberToken , memberController.getCategories)
member_router.get('/books' , verifyMemberToken , memberController.getBooks)
member_router.get('/books/:catId' , verifyMemberToken , memberController.getBooksByCat)
module.exports = member_router