import axios from 'axios'

const memberBaseUrl = import.meta.env.VITE_REACT_APP_MEMBER_BASE_URL
const adminBaseUrl = import.meta.env.VITE_REACT_APP_ADMIN_BASE_URL
const chatBaseUrl = import.meta.env.VITE_REACT_APP_CHAT_BASE_URL
const messageBaseUrl = import.meta.env.VITE_REACT_APP_MESSAGE_BASE_URL

const createAxiosClient = (baseUrl) => {
    const client = axios.create(
        {
            baseURL : baseUrl,
            timeout : 8000,
            timeoutErrorMessage : "Request timeout... Please try again"
        }
    )
    return client
}

const attachToken = (req , tokenName) => {
    const authToken = localStorage.getItem(tokenName)
    if(authToken) {
        req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
}


const memberAxiosInstance = createAxiosClient(memberBaseUrl)
memberAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req , "userJwt")
    return modifiedReq
})

const adminAxiosInstance = createAxiosClient(adminBaseUrl)
adminAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req , "adminJwt")
    return modifiedReq
})

const chatAxiosInstance = createAxiosClient(chatBaseUrl)
const messageAxiosInstance = createAxiosClient(messageBaseUrl)


export {memberAxiosInstance , adminAxiosInstance , chatAxiosInstance , messageAxiosInstance}