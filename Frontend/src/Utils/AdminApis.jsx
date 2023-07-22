import { adminAxiosInstance } from "./axios";

const googleLogin = (data) => {
    return adminAxiosInstance.post('/google-login' , data)
}

const isAdminAuth = () => {
    return adminAxiosInstance.get('/is-auth')
}

const adminLogin = (data) => {
    return adminAxiosInstance.post('/login' , data)
}

const addBook = (data) => {
    return adminAxiosInstance.post('/add-book' , data)
}


const getMembers = () => {
    return adminAxiosInstance.get('/members')
}

const blockMember = (data) => {
    return adminAxiosInstance.patch(`/block-member` , data)
}

const getSingleMember = (memberId) => {
    return adminAxiosInstance.get(`/view-member/${memberId}`)
}

const addCategory = (data) => {
    return adminAxiosInstance.post('/add-category' , data)
}

const getCategories = () => {
    return adminAxiosInstance.get('/categories')
}

const getBooks = () => {
    return adminAxiosInstance.get('/books')
}

const getSingleBook = (id) => {
    return adminAxiosInstance.get(`/single-book/${id}`)
}

// const updateBook = (id , data) => {
//     return adminAxiosInstance.post(`/update-book/${id}` , data)
// }

const listOrUnlist = (id , data) => {
    return adminAxiosInstance.get(`/remove-book/${id}/${data}`)
}

const getLenderHistory = (page , limit) => {
    return adminAxiosInstance.get(`/lender-history/${page}/${limit}`)
}

const changeCheckoutStatus = (lenderId , status) => {
    return adminAxiosInstance.get(`/change-checkout-status/${lenderId}/${status}`)
}

const addBanner = (data) => {
    return adminAxiosInstance.post('/add-banner' , data)
}

const getBanners = () => {
    return adminAxiosInstance.get('/get-banners')
}

const changeBannerStatus = (data) => {
    return adminAxiosInstance.post('/change-banner-status' , data)
}

const updateBannerImage = (bannerId , data) => {
    return adminAxiosInstance.patch(`update-banner-image/${bannerId}` , data)
}

const updateBannerContent = (bannerId , data) => {
    return adminAxiosInstance.patch(`update-banner-content/${bannerId}` , data)
}

const updateBook = (bookId , data) => {
    return adminAxiosInstance.patch(`/update-book/${bookId}` , data)
}

const updateBookImage = (bookId , data) => {
    return adminAxiosInstance.patch(`/update-book-image/${bookId}` , data)
}

const getChatMember = (memberId) => {
    return adminAxiosInstance.get(`/chat-member/${memberId}`)
}

const getCheckoutData = () => {
    return adminAxiosInstance.get('/get-checkout-data')
}

const getMembershipData = () => {
    return adminAxiosInstance.get('/get-membership-data')
}

const getBmc = () => {
    return adminAxiosInstance.get('/get-bmc')
}

const totalFines = () => {
    return adminAxiosInstance.get('/total-fine-amount')
}

const getLenderData = () => {
    return adminAxiosInstance.get('/lender-data')
}

const downloadLenderData = (data) => {
    const {from , to} = data
    return adminAxiosInstance.get(`/lender-data/${from}/${to}`)
}

export {
    adminLogin , 
    addBook,
    getMembers,
    isAdminAuth,
    getSingleMember,
    googleLogin,
    addCategory,
    getCategories,
    getBooks,
    getSingleBook,
    updateBook,
    listOrUnlist,
    getLenderHistory,
    changeCheckoutStatus,
    addBanner,
    getBanners,
    changeBannerStatus,
    updateBannerImage,
    blockMember,
    updateBookImage,
    updateBannerContent,
    getChatMember,
    getCheckoutData,
    getMembershipData,
    getBmc,
    totalFines,
    getLenderData,
    downloadLenderData
}