
import {io} from 'socket.io-client'
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL

const socketInstance = io(baseUrl)

export default socketInstance