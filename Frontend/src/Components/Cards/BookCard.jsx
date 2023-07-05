import { AiFillStar } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

function BookCard({ bookData, handleAddtoBag, handleBookReserve }) {
  return (
    <div
      id="card"
      className="p-4 mx-auto bg-white drop-shadow-[0_0px_8px_rgba(0,0,0,0.2)] w-[220px] md:w-[240px] lg:w-[280px] rounded-xl"
    >
      {bookData.isAvailable <= 0 ? (
        <div className="mb-3 drop-shadow-[0_0px_3px_rgba(255,0,0,0.8)]">
          <div className=" ms-auto py-[2px] md:py-1 px-1 md:px-2 rounded-full bg-white w-fit flex items-center">
            <span className=" text-[12px] md:text-sm lg:text-sm text-red-600 tracking-wide font-medium">
              Not Available
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-3 drop-shadow-[0_0px_3px_rgba(0,255,0,0.8)]">
          <div className=" ms-auto py-[2px] md:py-1 px-1 md:px-2 rounded-full bg-white w-fit flex items-center">
            <span className=" text-[12px] md:text-sm lg:text-sm text-green-600 tracking-wide font-medium">
              Available
            </span>
            <span className="text-green-500 ms-1">
              <TiTick />
            </span>
          </div>
        </div>
      )}
      {/* <div className="mb-3 drop-shadow-[0_0px_3px_rgba(0,255,0,0.8)]">
        <div className=" ms-auto py-[2px] md:py-1 px-1 md:px-2 rounded-full bg-white w-fit flex items-center">
          <span className=" text-sm md:text-sm text-green-600 tracking-wide font-medium">
            Available
          </span>
          <span className="text-green-500 ms-1">
            <TiTick />
          </span>
        </div>
      </div> */}
      <div
        id="image"
        className="mb-3 w-[6rem] h-[8rem] md:w-[7rem] md:h-[9rem] mx-auto drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] cursor-pointer hover:-translate-y-2 hover:drop-shadow-[5px_10px_5px_rgba(0,0,0,0.5)] duration-500"
      >
        <img
          src={
            bookData
              ? bookData.coverPhoto
              : "../../../public/public-images/image.jpg"
          }
          className="w-[100%] h-[100%] hover:cursor-pointer"
          alt=""
        />
      </div>
      <div
        id="contents"
        className=" p-3 rounded-lg bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.14)]"
      >
        <div className="flex flex-col space-y-2">
          <div
            id="hover-div"
            className="hover:text-user-to cursor-pointer space-y-1"
          >
            <h1 className="font-bold text-sm capitalize">{bookData.author}</h1>
            <p className="text-sm truncate capitalize ">
              {bookData.title}
            </p>
          </div>
          <div id="rating" className="">
            <AiFillStar className="text-md" color="#FF9529" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        {bookData.availableStock > 0 && bookData.reservationOrder.length < bookData.maxReservations ? (
          <button
            onClick={() => handleAddtoBag(bookData._id)}
            className="text-sm bg-button-green text-white font-bold w-full py-2 rounded-md hover:text-green-600 hover:bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)]"
          >
            Add to book-bag
          </button>
        ) : (
          <>
            {bookData.reservationOrder.length >= bookData.maxReservations ? (
              <button className="text-sm bg-button-green text-white font-bold w-full py-2 rounded-md hover:text-green-600 hover:bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)]">
                Not available
              </button>
            ) : (
              <button
                onClick={() => handleBookReserve(bookData._id)}
                className="text-sm bg-button-green text-white font-bold w-full py-2 rounded-md hover:text-green-600 hover:bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)]"
              >
                Reserve
              </button>
            )}
          </>
        )}
      </div>
    </div>
    // <div
    //   id="card"
    //   className="p-4 bg-white drop-shadow-[0_0px_8px_rgba(0,0,0,0.2)] w-auto lg:w-[280px] md:w-[200px] rounded-xl"
    // >
    //   <div className="mb-3 drop-shadow-[0_0px_3px_rgba(0,255,0,0.8)]">
    //     <div className=" ms-auto py-1 px-3 rounded-full text-sm bg-white w-fit flex items-center">
    //       <span className="text-green-600 tracking-wide font-medium">
    //         Available
    //       </span>
    //       <span className="text-green-500 ms-2"><TiTick /></span>
    //     </div>
    //   </div>
    //   <div
    //     id="image"
    //     className="mb-3 w-[10rem] mx-auto drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] cursor-pointer hover:-translate-y-2 hover:drop-shadow-[-5px_10px_5px_rgba(0,0,0,0.5)] duration-500"
    //   >
    //     <img
    //     src="../../../public/public-images/image.jpg"
    //       className="w-[100%]"
    //       alt=""
    //     />
    //   </div>
    //   <div
    //     id="contents"
    //     className=" p-3 rounded-lg bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.14)]"
    //   >
    //     <div className="">
    //       <div id="hover-div" className="hover:text-user-to cursor-pointer">
    //         <h1 className="font-bold">author</h1>
    //         <h1 className="text-lg">title</h1>
    //       </div>
    //       <div id="rating" className="my-auto">
    //         <AiFillStar size={21} color="#FF9529" />
    //       </div>
    //       <span></span>
    //     </div>
    //   </div>
    //   <div className="mt-4">
    //     <button className="bg-button-green text-white font-bold w-full py-2 rounded-md hover:text-orange-600 hover:bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)]">
    //       Add to book-bag
    //     </button>
    //   </div>
    // </div>
  );
}

export default BookCard;
