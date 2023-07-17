import { memberAxiosInstance } from "./axios";

const isMemberAuth = () => {
    return memberAxiosInstance.get('/is-member-auth')
}

const memberRegister = (data) => {
    return memberAxiosInstance.post('/register' , data)
}

const memberLogin = (data) => {
    return memberAxiosInstance.post('/login' , data)
}

const googleLogin = (data) => {
    return memberAxiosInstance.post('/google-login' , data)
}

const verifyEmail = (memberId , token) => {
    return memberAxiosInstance.get(`/${memberId}/verify/${token}`)
}

const getBooks = () => {
    return memberAxiosInstance.get('/books')
}

const getCategories = () => {
    return memberAxiosInstance.get('/categories')
}

const getBooksByCategory = (id) => {
    return memberAxiosInstance.get(`/books/${id}`)
}

const getMember = () => {
    return memberAxiosInstance.get(`/get-member`)
}

const updateImage = (data) => {
    return memberAxiosInstance.post('/update-profile-picture' , data)
}

const updateProfileFields = (data) => {
    return memberAxiosInstance.post('/update-profile-fields' , data)
}

const createPaymentIntent = (data) => {
    return memberAxiosInstance.post('/create-payment-intent' , data)
}

const addMemberShip = (memberShipType) => {
    return memberAxiosInstance.post('/add-membership' , memberShipType)
}

const addToBookBag = (bookId) => {
    return memberAxiosInstance.get(`/add-to-book-bag/${bookId}`)
}

const getBookBag = () => {
    return memberAxiosInstance.get('/get-book-bag')
}

const removeFromBookBag = (bookId) => {
    return memberAxiosInstance.get(`/remove-from-book-bag/${bookId}`)
}

const checkoutBooks = () => {
    return memberAxiosInstance.get('/checkout-books')
}

const getBanners = () => {
    return memberAxiosInstance.get('/get-banners')
}

const getRecentBooks = () => {
    return memberAxiosInstance.get('/get-recent-books')
}

const getCheckouts = () => {
    return memberAxiosInstance.get('/get-checkouts')
}

const getActiveCheckouts = () => {
    return memberAxiosInstance.get('/get-active-checkouts')
}

const createFinePaymentIntent = () => {
    return memberAxiosInstance.get('/create-fine-payment-intent')
}

const payFine = () => {
    return memberAxiosInstance.post('/pay-fine')
}

const reserveBook = (bookId) => {
    return memberAxiosInstance.get(`/reserve-book/${bookId}`)
}

const getReservedBooks = () => {
    return memberAxiosInstance.get('/reserved-books')
}

const getSingleBook = (bookId) => {
    return memberAxiosInstance.get(`/book/${bookId}`)
}

const searchBooks = (searchKey) => {
    return memberAxiosInstance.get(`/search-books/${searchKey}`)
}

const cancelReservation = (reservationId) => {
    return memberAxiosInstance.patch(`/cancel-reservation/${reservationId}`)
}

const getChatMember = (memberId) => {
    return memberAxiosInstance.get(`/chat-member/${memberId}`)
}

const getAdmin = () => {
    return memberAxiosInstance.get('/get-admin')
}

const getFineHistory = () => {
    return memberAxiosInstance.get('/get-fines')
}

export {
    memberRegister,
    memberLogin,
    isMemberAuth,
    googleLogin,
    getBooks,
    getCategories,
    getBooksByCategory,
    getMember,
    updateImage,
    updateProfileFields,
    createPaymentIntent,
    addMemberShip,
    addToBookBag,
    getBookBag,
    removeFromBookBag,
    checkoutBooks,
    getBanners,
    getRecentBooks,
    getCheckouts,
    getActiveCheckouts,
    createFinePaymentIntent,
    payFine,
    reserveBook,
    getReservedBooks,
    verifyEmail,
    getSingleBook,
    searchBooks,
    cancelReservation,
    getChatMember,
    getAdmin,
    getFineHistory
}