import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//member APIs
import { getSingleBook } from "../../Utils/MemberApis";

function SingleBook({ bookData, handleAddtoBag, handleBookReserve }) {
  return (
    bookData && (
      <div className="mx-auto lg:flex lg:flex-row lg:justify-evenly lg:p-8 rounded-md bg-user-nav text-black lg:w-[800px] h-fit">
        <div className="lg:max-w-[1/2] lg:flex lg:flex-col lg:items-center lg:justify-center p-2">
          <div className=" lg:w-[260px] lg:h-[280px]">
            <img
              className="w-full h-full object-contain "
              src={
                bookData.coverPhoto
                  ? bookData.coverPhoto
                  : "../../../public/public-images/image.jpg"
              }
              alt=""
            />
          </div>
        </div>
        <div className="relative lg:max-w-[1/2] lg:p-5 shadow-[0px_0px_5px_rgba(0,0,0,0.1)]">
          {/* {
               bookData.availableStock <= 0 && <span className="lg:relative lg:left-[85%] lg:bottom-1">Available for reservation</span>
          } */}
          <h2 className="lg:text-3xl lg:mb-3">{bookData.title}</h2>
          <h2 className="lg:text-xl lg:mb-0.5 font-semibold text-black">
            {bookData.author}
          </h2>
          {bookData.category && (
            <h2 className="lg:text-md lg:mb-0.5">{bookData.category.name}</h2>
          )}
          <h2 className="lg:text-base mb-0.5">{bookData.edition}</h2>
          <h2 className="text-sm italic">
            <span className="lg:text-base lg:mb-0.5 not-italic">
              {bookData.publisher}
            </span>
          </h2>
          <div className=" border-user-from border lg:p-1 rounded-sm italic lg:text-sm lg:mb-1 ">
            <p>{bookData.description}</p>
          </div>
          {
            bookData.availableStock > 0 ?
            (
              <div
              onClick={() => handleAddtoBag(bookData._id)}
              className=" hover:cursor-pointer lg:mt-6 lg:text-md text-white font-semibold bg-green-700 lg:py-1 rounded-md text-center hover:bg-white hover:text-green-700 hover:shadow-[0px_0px_8px_rgba(0,255,0,0.40)]"
            >
              Checkout
            </div>
            ) : (
              bookData.availableStock > 0 && bookData.reservationOrder.length < bookData.maxReservations ?
              (
                <div
                onClick={() => handleBookReserve(bookData._id)}
                className=" hover:cursor-pointer lg:mt-6 lg:text-md text-white font-semibold bg-green-700 lg:py-1 rounded-md text-center hover:bg-white hover:text-green-700 hover:shadow-[0px_0px_8px_rgba(0,255,0,0.40)]"
              >
                Reserve
              </div>
              ) : (
                <div
                className=" hover:cursor-pointer lg:mt-6 lg:text-md text-white font-semibold bg-yellow-500 lg:py-1 rounded-md text-center hover:bg-white hover:text-red-700 hover:shadow-[0px_0px_8px_rgba(255,0,0,0.40)]"
              >
                Reservation full
              </div>
              )
            )
          }
          {/* {bookData.availableStock > 0 ? (
            <div
              onClick={() => handleAddtoBag(bookData._id)}
              className=" hover:cursor-pointer lg:mt-6 lg:text-md text-white font-semibold bg-green-700 lg:py-1 rounded-md text-center hover:bg-white hover:text-green-700 hover:shadow-[0px_0px_8px_rgba(0,255,0,0.40)]"
            >
              Checkout
            </div>
          ) : (
            <div
              onClick={() => handleBookReserve(bookData._id)}
              className=" hover:cursor-pointer lg:mt-6 lg:text-md text-white font-semibold bg-green-700 lg:py-1 rounded-md text-center hover:bg-white hover:text-green-700 hover:shadow-[0px_0px_8px_rgba(0,255,0,0.40)]"
            >
              Reserve
            </div>
          )} */}
        </div>
      </div>
    )
  );
}

export default SingleBook;
