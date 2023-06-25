const express = require('express')
const member_router = express.Router()
const memberController = require('../controllers/member_controller')
const { verifyMemberToken } = require('../middlewares/Auth')
const upload = require('../middlewares/multer')

member_router.get('/is-member-auth'  , verifyMemberToken , memberController.verifyMember)

member_router.post('/login' , memberController.login)
member_router.post('/register' , memberController.register)
member_router.post('/google-login' , memberController.googleLogin)

member_router.get('/categories' , verifyMemberToken , memberController.getCategories)
member_router.get('/books' , verifyMemberToken , memberController.getBooks)
member_router.get('/books/:catId' , verifyMemberToken , memberController.getBooksByCat)
member_router.get('/get-member' , verifyMemberToken , memberController.getMember)
member_router.post('/update-profile-picture' , verifyMemberToken , upload.single('profilePicture') , memberController.updateImage)
member_router.post('/update-profile-fields' , verifyMemberToken , memberController.updateProfileFields)
member_router.post('/create-payment-intent' ,  verifyMemberToken ,memberController.createPaymentIntent)
member_router.post('/add-membership' , verifyMemberToken , memberController.addMembership)
member_router.get('/add-to-book-bag/:bookId' , verifyMemberToken , memberController.addToBookBag)
member_router.get('/get-book-bag' , verifyMemberToken , memberController.getBookBag)
member_router.get('/remove-from-book-bag/:bookId' , verifyMemberToken , memberController.removeFromBookBag)
member_router.get('/checkout-books' , verifyMemberToken , memberController.checkoutBooks)
member_router.get('/get-banners' , verifyMemberToken , memberController.getBanners)
member_router.get('/get-recent-books' , verifyMemberToken , memberController.recentBooks)

module.exports = member_router