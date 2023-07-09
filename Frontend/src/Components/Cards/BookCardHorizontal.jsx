import moment from "moment/moment";
import React from "react";

function BookCardHorizontal({ bookData, reservedOn }) {
  return (
    <div className="lg:w-[600px] flex bg-white rounded-md p-2 mb-2">
      <div className="md:w-[120px] md:h-[140px] ">
        <img
          className="w-[100%] h-[100%] object-contain"
          src={bookData.coverPhoto}
          alt=""
        />
      </div>
      <div className="basis-[80%] ms-2 flex flex-col pt-2">
        <h2 className="text-start mb-2">{bookData.title}</h2>
        <h2 className="text-start mb-2">{bookData.author}</h2>
        <h2 className="text-start">
          Reserved On : <span className="ms-2">{moment(reservedOn).format("MMMM Do YYYY")}</span>
        </h2>
      </div>
    </div>
  );
}

export default BookCardHorizontal;
