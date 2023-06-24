import React from "react";

function BookBag() {
  return (
    <div className="w-[800px] p-2">
      <h1>Books in the bag</h1>
      <div className="w-full h-fit mt-2 flex">
        <div className="w-3/10 h-full">
          <div className="w-[150px]">
            <img
              className="w-[100%]"
              src="../../../public/public-images/image.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="w-7/10 h-full ms-5">Lorem ipsum dolor sit, amet coeaque, magnam ea unde totam, officia vel obcaecati hic molestiae veniam doloremque soluta consequatur voluptatem nisi deleniti, fuga non consectetur?</div>
      </div>
    </div>
  );
}

export default BookBag;
