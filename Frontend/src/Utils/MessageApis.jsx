import {messageAxiosInstance} from '../Utils/axios'

const getMessages = (chatId) => {
      return messageAxiosInstance.get(`/${chatId}`)
}

export {
      getMessages
}