import {messageAxiosInstance} from '../Utils/axios'

const getMessages = (chatId) => {
      return messageAxiosInstance.get(`/${chatId}`)
}

const addMessage = (data) => {
      return messageAxiosInstance.post('/add' , data)
}

export {
      getMessages,
      addMessage

}