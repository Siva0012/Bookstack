import { memberAxiosInstance } from "./axios";

const isMemberAuth = () => {
    console.log("isMemberAuth called");
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
    return memberAxiosInstance.post('update-profile-fields' , data)
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
    updateProfileFields    
}