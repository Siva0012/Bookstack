import {chatAxiosInstance} from '../Utils/axios'

const getChats = (id) => {
      return chatAxiosInstance.get(`/get-chat/${id}`)
}

const createChat = (data) => {
      return chatAxiosInstance.post('/create' , data)
}

export {
      getChats,
      createChat
}
