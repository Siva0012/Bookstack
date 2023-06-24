import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBooksByCategory } from "../../Utils/MemberApis";
import { SiProgress } from "react-icons/si";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

//member APIs
import {addToBookBag} from '../../Utils/MemberApis'
import { toast } from "react-toastify";

function BooksShelf() {
  const [bookData, setBookdata] = useState([]);
  const [catData, setCatdata] = useState({});
  const { catId } = useParams();
  const navigate = useNavigate()

  const handleAddtoBag = (bookId) => {
    addToBookBag(bookId)
    .then((response) => {
      if(response.data.message) {
        toast.success(response.data.message)
      }
    })
    .catch((err) => {
      toast.error(err.response.data.error)
    })
  }

  useEffect(() => {
    getBooksByCategory(catId)
      .then((response) => {
        setBookdata(response.data.bookData);
      })
      .catch((err) => console.log(err));
  }, [catId]);

  return (
    <>
      <div
        id="shelf-container"
        className="flex flex-col items-center rounded-xl"
      >
        <div id="catogory-name" className="mb-4 text-white tracking-wider">
          {bookData[0] ? (
            bookData[0] && (
              <h1 className="text-3xl mb-3 font-bold">
                {bookData[0].category.name}
              </h1>
            )
          ) : (
            <div className="flex items-baseline">
              <h1 className="text-2xl font-bold me-2">
                Will be Updated soon...{" "}
              </h1>{" "}
              <SiProgress size={24} />
            </div>
          )}
        </div>
        <div
          id="grid-contianer"
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10 gap-x-12 h-auto"
        >
          {bookData &&
            bookData.map((bookData) => {
              return (
                <>
                  <div
                    id="card"
                    key={bookData._id}
                    className="p-4 bg-white drop-shadow-[0_0px_8px_rgba(0,0,0,0.2)] lg:w-[300px] md:[200px] rounded-xl"
                  >
                    <div className="mb-3 drop-shadow-[0_0px_3px_rgba(0,255,0,0.8)]">
                      {bookData.availableStock <= 0 ? (
                        <h2 className="drop-shadow-[0_0px_3px_rgba(255,0,0,0.8)]">Not available</h2>
                      ) : (
                        <div className=" ms-auto py-1 px-3 rounded-full text-sm bg-white w-fit flex items-center">
                          <span className="text-green-600 tracking-wide font-medium">
                            Available
                          </span>
                          <span className="text-green-500 ms-2">
                            <TiTick />
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      id="image"
                      className="mb-3 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] cursor-pointer hover:-translate-y-2 hover:drop-shadow-[-5px_10px_5px_rgba(0,0,0,0.5)] duration-500"
                    >
                      <img
                        className="mx-auto h-[150px] sm:w-[50px] sm:h-[100px] md:w-[110px] md:h-[145px] lg:w-[160px] lg:h-[230px]"
                        src={bookData.coverPhoto}
                        alt=""
                      />
                    </div>
                    <div
                      id="contents"
                      className=" p-3 rounded-lg bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.14)]"
                    >
                      <div className="">
                        <div id="hover-div" className="hover:text-user-to cursor-pointer">
                          <h1 className="font-bold">
                            {bookData.author}
                          </h1>
                          <h1 className="text-lg">
                            {bookData.title}
                          </h1>
                        </div>
                        <div id="rating" className="my-auto">
                          <AiFillStar size={21} color="#FF9529" />
                        </div>
                        <span></span>
                      </div>
                    </div>
                    <div className="mt-4">
                      
                      {
                        bookData.availableStock > 0 ? 
                        (
                          <button
                          onClick={() => handleAddtoBag(bookData._id)}
                           className="bg-button-green text-white font-bold w-full py-2 rounded-md hover:text-orange-600 hover:bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)]">
                        Add to book-bag
                      </button>
                        ) : (
                          <button className="bg-red-500  text-white font-bold w-full py-2 rounded-md">
                        Reserve
                      </button>
                        )
                      }
                      
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default BooksShelf;
