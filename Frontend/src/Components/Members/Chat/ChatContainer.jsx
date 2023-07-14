import { useEffect, useState } from "react";
import { getMessages } from "../../../Utils/MessageApis";
import { getAdmin } from "../../../Utils/MemberApis";
import moment from "moment/moment";
import InputEmoji from "react-input-emoji";

function ChatContainer({ currentChat, memberId }) {
  const [adminData, setAdminData] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    getAdmin().then((response) => {
      if (response.data.admin) {
        console.log(response.data.admin, "admin");
        setAdminData(response.data.admin);
      }
    });
  }, [currentChat]);

  useEffect(() => {
    getMessages(currentChat?._id).then((response) => {
      if (response.data.messageData) {
        console.log(response.data.messageData, "messagesss");
        setMessages(response.data.messageData);
      }
    });
  }, [currentChat]);

  return (
    <div className="rounded-2xl h-full px-3 bg-user-nav py-4 shadow-[0px_0px_3px_rgba(255,255,255,0.2)]">
      {currentChat ? (
        <div className="flex flex-col h-full justify-between">
          <div id="content">
            <div id="user-div" className="">
              <div className="flex items-center py-2 px-3 bg-user-nav text-black shadow-[0px_0px_3px_rgba(0,0,0,0.5)] rounded-lg">
                <div className="lg:w-10 lg:h-10">
                  <img
                    className="h-full w-full rounded-full"
                    src="../../../../public/public-images/image.jpg"
                    alt=""
                  />
                </div>
                <div className="lg:ms-4">
                  <h2 className="capitalize">{adminData?.name}</h2>
                </div>
              </div>
            </div>
            {messages &&
              messages.map((message) => {
                return (
                  <div
                    id="content-div"
                    className="mt-4 p-1 overflow-auto lg:max-h-[350px] text-black "
                  >
                    <div
                      className={`${
                        message.senderId === memberId ? "ms-auto " : ""
                      }lg:max-w-[300px] bg-user-nav rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.8)] p-2 mb-2`}
                    >
                      <p className="break-words">{message.text}</p>
                      <p className="text-black text-[11px] italic text-end mt-1">
                        {moment(message.createdAt).startOf("hour").fromNow()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div id="input-section" className="mt-2">
            <div className="flex">
              <InputEmoji onChange={handleChange} value={newMessage} />
              <button className="px-4 hover:bg-blue-600 bg-blue-500 rounded-md ms-2">
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h2>"there is not chat history"</h2>
      )}
    </div>
  );
}

export default ChatContainer;
