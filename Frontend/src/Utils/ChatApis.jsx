import {chatAxiosInstance} from '../Utils/axios'

const getChats = (id) => {
      return chatAxiosInstance.get(`/get-chat/${id}`)
}


export {
      getChats,
}
