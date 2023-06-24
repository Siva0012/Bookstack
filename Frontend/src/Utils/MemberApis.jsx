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
    checkoutBooks
}