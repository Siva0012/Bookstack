import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { BiShow } from "react-icons/bi";

//member APIs
import { getSingleBook } from "../../Utils/MemberApis";
import GoogleBookViewer from "./GoogleBookViewer";

function SingleBook({ bookData, handleAddtoBag, handleBookReserve }) {
  const memberId = useSelector((state) => state.memberData.value._id);
  const [showModal, setShowModal] = useState(true);
  const [preview, setPreview] = useState(false);

  const handlePreview = () => {
    setShowModal((prev) => !prev);
  };

  return (
    bookData && (
      <>
        <div className="mx-auto lg:flex lg:flex-row lg:justify-evenly lg:p-8 rounded-md bg-user-nav text-black lg:w-[800px] h-fit">
          <div className="lg:max-w-[1/2] lg:flex lg:flex-col lg:items-center lg:justify-center p-2">
            <div
              onMouseEnter={() => setPreview((prev) => !prev)}
              onMouseLeave={() => setPreview((prev) => !prev)}
              className="lg:w-[260px] lg:h-[280px] "
              style={{
                backgroundImage: `url(${bookData.coverPhoto})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              {preview && (
                <div
                  onClick={() => handlePreview()}
                  className="text-white cursor-pointer bg-black/50 w-full h-full flex flex-col items-center justify-center"
                >
                  <h1 className="text-lg">Preview</h1>
                  <BiShow size={32} />
                </div>
              )}
            </div>
          </div>
          <div className="relative lg:max-w-[1/2] lg:p-5 shadow-[0px_0px_5px_rgba(0,0,0,0.1)]">
            {
               bookData.availableStock <= 0 && <span className="lg:relative lg:left-[85%] lg:bottom-1">Available for reservation</span>
          }
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
            {bookData &&
            bookData.nextCheckoutBy &&
            bookData.nextCheckoutBy.toString() === memberId.toString() &&
            bookData.availableStock === 1 ? (
              <div
                onClick={() => handleAddtoBag(bookData._id)}
                className=" hover:cursor-pointer lg:mt-6 lg:text-md text-white font-semibold bg-blue-600 lg:py-1 rounded-md text-center hover:bg-white hover:text-blue-600 hover:shadow-[0px_0px_8px_rgba(0,0,255,0.40)]"
              >
                Add to book-bag
              </div>
            ) : bookData.availableStock > 0 &&
              bookData.reservationOrder.length === 0 ? (
              <div
                onClick={() => handleAddtoBag(bookData._id)}
                className=" hover:cursor-pointer lg:mt-6 lg:text-md text-white font-semibold bg-button-green lg:py-1 rounded-md text-center hover:bg-white hover:text-green-700 hover:shadow-[0px_0px_8px_rgba(0,255,0,0.40)]"
              >
                Add to book-bag
              </div>
            ) : (bookData.availableStock === 0 &&
                bookData.reservationOrder.length < bookData.maxReservations) ||
              (bookData.availableStock > 0 &&
                bookData.reservationOrder.length) ? (
              <div
                onClick={() => handleAddtoBag(bookData._id)}
                className=" hover:cursor-pointer lg:mt-6 lg:text-md text-white font-semibold bg-yellow-400 lg:py-1 rounded-md text-center hover:bg-white hover:text-green-700 hover:shadow-[0px_0px_8px_rgba(0,255,0,0.40)]"
              >
                Reserve
              </div>
            ) : (
              <div className=" hover:cursor-pointer lg:mt-6 lg:text-md text-white font-semibold bg-red-500 lg:py-1 rounded-md text-center hover:bg-white hover:text-green-700 hover:shadow-[0px_0px_8px_rgba(0,255,0,0.40)]">
                Reservation full
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 w-[800px] mx-auto">
          <GoogleBookViewer
            isbn={bookData.isbn}
            showViewer={showModal}
          />
        </div>
      </>
    )
  );
}

export default SingleBook;
