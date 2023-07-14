function ChatContainer() {
  return (
    <div className="rounded-2xl h-full px-3 bg-user-nav py-4 shadow-[0px_0px_3px_rgba(255,255,255,0.2)]">
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
                <h2>User name</h2>
              </div>
            </div>
          </div>
          <div id="content-div" className="mt-4 p-1 overflow-auto lg:max-h-[350px] text-black ">
            <div className="lg:max-w-[300px] bg-user-nav rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.8)] p-2 mb-2">
              <p className="break-words">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                expedita 
              </p>
              <p className="text-[#F2E5C7] mt-1">time</p>
            </div>
            <div className="ms-auto lg:max-w-[300px] bg-user-nav rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.8)] p-2 mb-2">
              <p className="break-words">
                Lorem ipsum dolor sit uae iusto. Sit.
              </p>
              <p className="text-[#F2E5C7] mt-1">time</p>
            </div>
            <div className="lg:max-w-[300px] bg-user-nav rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.8)] p-2 mb-2">
              <p className="break-words">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <p className="text-[#F2E5C7] mt-1">time</p>
            </div>
            <div className="lg:max-w-[300px] bg-user-nav rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.8)] p-2 mb-2">
              <p className="break-words">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <p className="text-[#F2E5C7] mt-1">time</p>
            </div>
            <div className="ms-auto lg:max-w-[300px] bg-user-nav rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.8)] p-2 mb-2">
              <p className="break-words">
                Lorem ipsum dolor sit uae iusto. Sit.
              </p>
              <p className="text-[#F2E5C7] mt-1">time</p>
            </div>
            <div className="lg:max-w-[300px] bg-user-nav rounded-lg shadow-[0px_0px_3px_rgba(0,0,0,0.8)] p-2 mb-2">
              <p className="break-words">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <p className="text-[#F2E5C7] mt-1">time</p>
            </div>
          </div>
        </div>
        <div id="input-section" className="mt-2">
          <div className="flex">
            <input className="w-full rounded-md" type="text" />
            <button className="px-4 hover:bg-blue-600 bg-blue-500 rounded-md ms-2">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
