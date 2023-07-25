import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBooksByCategory } from "../../Utils/MemberApis";
import { SiProgress } from "react-icons/si";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

//member APIs
import { addToBookBag , reserveBook } from "../../Utils/MemberApis";
import { toast } from "react-toastify";
import BookCard from "../Cards/BookCard";

function BooksShelf() {
  const [bookData, setBookdata] = useState([]);
  const [catData, setCatdata] = useState({});
  const { catId } = useParams();
  const navigate = useNavigate();

  const handleAddtoBag = (bookId) => {
    addToBookBag(bookId)
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const handleBookReserve = (bookId) => {
    reserveBook(bookId)
    .then((response) => {
      if(response.data.message) {
        toast.success(response.data.message)
      }
    })
    .catch((err) => {
      if(err.response.data.error) {
        toast.error(err.response.data.error)
      }
    })
  }

  useEffect(() => {
    getBooksByCategory(catId)
      .then((response) => {
        setBookdata(response.data.bookData);
      })
  }, [catId , handleAddtoBag , handleBookReserve]);

  return (
    <>
      <div
        id="shelf-container"
        className="flex flex-col items-center rounded-xl"
      >
        <div id="catogory-name" className="mb-4 text-white tracking-wider">
          {bookData[0] ? (
            bookData[0] && (
              <h1 className=" text-xl md:text-2xl lg:text-3xl mb-3 font-bold capitalize">
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
            bookData.map((bookData , i) => {
              return (
                <BookCard key={i} bookData={bookData} handleAddtoBag={handleAddtoBag} handleBookReserve={handleBookReserve} />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default BooksShelf;
