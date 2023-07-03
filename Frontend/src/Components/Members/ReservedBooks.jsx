import { useState, useEffect } from "react";
import { getReservedBooks } from "../../Utils/MemberApis";
import BookCard from "../Cards/BookCard";
import BookCardHorizontal from "../Cards/BookCardHorizontal";

function ReservedBooks() {
  const [reservedBooks, setReservedBooks] = useState([]);
  useEffect(() => {
    getReservedBooks().then((response) => {
      if (response.data.reservedBooks) {
        setReservedBooks(response.data.reservedBooks.reservedBooks);
      }
    });
  }, []);
  return (
    <div className="">
      <h1 className="text-2xl tracking-wide mb-3 uppercase font-semibold text-white">Your reserved books</h1>
      {reservedBooks &&
        reservedBooks.map((book) => {
          return (
              <BookCardHorizontal
                bookData={book.book}
                reservedOn={book.reservedOn}
              />
          )
        })}
    </div>
  );
}

export default ReservedBooks;
