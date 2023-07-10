import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";

function BookCardHorizontal({
  bookData,
  reservedOn,
  status,
  reservationId,
  cancelReservation,
}) {
  return (
    <div className="lg:w-[600px] flex bg-white rounded-md p-2 mb-2">
      <div className="md:w-[120px] md:h-[120px] ">
        <Link to={`/book/${bookData._id}`}>
          <img
            className="w-[100%] h-[100%] object-contain"
            src={bookData.coverPhoto}
            alt=""
          />
        </Link>
      </div>
      <div className="basis-[80%] ms-2 flex flex-col pt-2">
        <h2 className="text-start mb-1">{bookData.title}</h2>
        <h2 className="text-start mb-1 text-sm">{bookData.author}</h2>
        <h2 className="text-start mb-1 text-sm">
          Reserved On :{" "}
          <span className="ms-2 text-sm">
            {moment(reservedOn).format("MMMM Do YYYY h:mm:ss a")}
          </span>
        </h2>
        {status === "Reserved" ? (
          <>
            <button
              onClick={() => cancelReservation(reservationId)}
              className="bg-red-600 w-fit px-2 rounded-md text-sm py-1 text-white"
            >
              Cancel reservation
            </button>
          </>
        ) : status === "Cancelled" ? (
          <h1 className="text-sm text-red-500">
            You have cancelled this reservation !!
          </h1>
        ) : (
          <h1 className="text-sm text-red-500">
            This reservation has Expired
          </h1>
        )
        // <h1 className="text-start italic sm">This reservation has expired</h1>
        }
      </div>
    </div>
  );
}

export default BookCardHorizontal;
