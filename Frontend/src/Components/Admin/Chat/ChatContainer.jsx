import { useEffect, useState } from "react";
import { getMessages, addMessage } from "../../../Utils/MessageApis";
import { getChatMember } from "../../../Utils/AdminApis";
import moment from "moment/moment";
import InputEmoji from "react-input-emoji";

function ChatContainer({ currentChat, adminId , setSendMessage , receivedMessages }) {
  const [memberData, setMemberData] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const memberId = currentChat?.members.find((id) => id !== adminId);
    getChatMember(memberId).then((response) => {
      if (response.data.memberData) {
        setMemberData(response.data.memberData);
      }
    });
  }, [currentChat]);

  useEffect(() => {
    getMessages(currentChat?._id).then((response) => {
      if (response.data.messageData) {
        setMessages(response.data.messageData);
      }
    });
  }, [currentChat]);

  useEffect(() => {
    if(receivedMessages !== null && receivedMessages.chatId === currentChat._id) {
      setMessages([...messages , receivedMessages])
    }
  } , [receivedMessages])

  const handleSend = (e) => {
    e.preventDefault();
    const message = {
      chatId: currentChat._id,
      senderId: adminId,
      text: newMessage,
    };

    //save the message to database
    addMessage(message).then((response) => {
      if (response.data.result) {
        setMessages([...messages, response.data.result]);
        setNewMessage("");
      }
    });

    //send message to the socket server
    const receiverId = currentChat.members.find((id) => id !== adminId)
    setSendMessage({...message , receiverId})
  };

  return (
    <div className="rounded-2xl h-full px-3 py-4 shadow-[0px_0px_3px_rgba(255,255,255,0.8)]">
      {currentChat ? (
        <div className="flex flex-col h-full justify-between">
          <div id="content">
            <div id="user-div" className="">
              <div className="flex items-center py-2 px-3 bg-black text-white shadow-[0px_0px_3px_rgba(255,255,255,0.8)] rounded-lg">
                <div className="lg:w-14 lg:h-14">
                  <img
                    className="h-full w-full rounded-full object-contain"
                    src={
                      memberData.profilePicture
                        ? memberData.profilePicture
                        : "../../../../public/public-images/image.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="lg:ms-4">
                  <h2>{memberData.name}</h2>
                </div>
              </div>
            </div>
            <div
              id="content-div"
              className="mt-4 p-1 overflow-auto lg:max-h-[350px] "
            >
              {messages &&
                messages.map((message , i) => {
                  return (
                    <div
                    key={i}
                      className={`${
                        message.senderId === adminId
                          ? "ms-auto lg:max-w-[320px] bg-black rounded-lg shadow-[0px_0px_3px_rgba(255,255,255,0.8)] p-2 mb-2"
                          : "lg:max-w-[320px] bg-black rounded-lg shadow-[0px_0px_3px_rgba(255,255,255,0.8)] p-2 mb-2"
                      }`}
                    >
                      <p className="break-words">{message.text}</p>
                      <p className="lg:text-[11px] text-end italic text-[#F2E5C7] mt-1">
                        {moment(message.createdAt).startOf("hour").fromNow()}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div id="input-section">
            <div className="flex">
              {/* <input className="w-full rounded-md" type="text" /> */}
              <InputEmoji value={newMessage} onChange={handleChange} />
              <button
                onClick={handleSend}
                className="px-4 hover:bg-blue-600 bg-blue-500 rounded-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="ms-6 mt-3 italic text-lg">
          Please select a chat from the chat list !!
        </h2>
      )}
    </div>
  );
}

export default ChatContainer;
