const express = require('express')
const admin_router = express.Router()
const adminController = require('../controllers/admin_controller')
const path = require('path')
const { verifyAdminToken } = require('../middlewares/Auth')
const upload = require('../middlewares/multer')
const { uploadCloudinary, removeFromCloudinary } = require('../config/cloudinary')



admin_router.get('/is-auth', verifyAdminToken, adminController.verifyAdmin)
admin_router.post('/login', adminController.login)

//protected routes

admin_router.get('/members', verifyAdminToken, adminController.getMembers)
admin_router.post('/add-book', verifyAdminToken, upload.single('coverPhoto'), adminController.addBook)
admin_router.post('/add-googleBook', verifyAdminToken, adminController.addGoogleBook)
admin_router.patch('/block-member' , verifyAdminToken , adminController.blockOrUnblockMember)
admin_router.get('/view-member/:memberId', verifyAdminToken, adminController.getSingleMember)
admin_router.post('/add-category', verifyAdminToken, adminController.addCategory)
admin_router.get('/categories', verifyAdminToken, adminController.getCategories)
admin_router.get('/books', verifyAdminToken, adminController.getBooks)
admin_router.get('/single-book/:bookId', verifyAdminToken, adminController.getSingleBook)
// admin_router.post('/update-book/:bookId', verifyAdminToken, upload.single('coverPhoto'), adminController.updateBook)
admin_router.patch('/update-book/:bookId' , verifyAdminToken , adminController.updateBook)
admin_router.patch('/update-book-image/:bookId' , verifyAdminToken , upload.single('coverPhoto') , adminController.updateBookImage)
admin_router.get('/remove-book/:bookId/:isListed', verifyAdminToken, adminController.removeBook)
admin_router.post('/add-banner' , verifyAdminToken , upload.single('bannerPhoto') , adminController.addBanner)
admin_router.patch('/update-banner-image/:bannerId', verifyAdminToken , upload.single('bannerPhoto') , adminController.updateBannerImage)
admin_router.get('/lender-history' , verifyAdminToken, adminController.getLenderHistory)
admin_router.get('/change-checkout-status/:lenderId/:status' , verifyAdminToken , adminController.changeCheckoutStatus)
admin_router.get('/get-banners' , verifyAdminToken , adminController.getBanners)
admin_router.post('/change-banner-status' , verifyAdminToken , adminController.changeBannerStatus)
admin_router.post('/update-banner-image' , verifyAdminToken , upload.single('bannerPhoto') , adminController.updateBannerImage)
admin_router.patch('/update-banner-content/:bannerId' , verifyAdminToken , adminController.updateBannerContent)
admin_router.get('/chat-member/:memberId' , verifyAdminToken , adminController.getChatMember)
admin_router.get('/get-checkout-data' , verifyAdminToken , adminController.getCheckoutData)
admin_router.get('/get-membership-data' , verifyAdminToken , adminController.getMembershipData)
admin_router.get('/get-bmc' , verifyAdminToken , adminController.getBmc)

module.exports = admin_router