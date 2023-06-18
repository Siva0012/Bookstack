const express = require('express')
const admin_router = express.Router()
const adminController = require('../controllers/admin_controller')
const path = require('path')
const { verifyAdminToken } = require('../middlewares/Auth')
const upload = require('../middlewares/multer')
const { uploadCloudinary, removeFromCloudinary } = require('../config/cloudinary')


// const storage = multer.diskStorage(
//     {
//         destination : (req , file , cb) => {
//             cb(null , path.join(__dirname , '../../Backend/public/images/'))
//         },
//         filename : (req , file , cb) => {
//             // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//             const uniqueSuffix = Date.now()
//             cb(null , uniqueSuffix + '-' + file.originalname)
//         }

//     }
// )
// const upload = multer({storage : storage})

admin_router.get('/is-auth', verifyAdminToken, adminController.verifyAdmin)
admin_router.post('/login', adminController.login)

//protected routes

admin_router.get('/members', verifyAdminToken, adminController.getMembers)
admin_router.post('/add-book', verifyAdminToken, upload.single('coverPhoto'), adminController.addBook)
admin_router.post('/add-googleBook', verifyAdminToken, adminController.addGoogleBook)
admin_router.get('/view-member/:memberId', verifyAdminToken, adminController.getSingleMember)
admin_router.post('/add-category', verifyAdminToken, adminController.addCategory)
admin_router.get('/categories', verifyAdminToken, adminController.getCategories)
admin_router.get('/books', verifyAdminToken, adminController.getBooks)
admin_router.get('/single-book/:bookId', verifyAdminToken, adminController.getSingleBook)
admin_router.post('/update-book/:bookId', verifyAdminToken, upload.single('coverPhoto'), adminController.updateBook)
admin_router.get('/remove-book/:bookId/:isAvailable', verifyAdminToken, adminController.removeBook)
admin_router.post('/add-banner' , verifyAdminToken , upload.single('bannerPhoto') , adminController.addBanner)


module.exports = admin_router