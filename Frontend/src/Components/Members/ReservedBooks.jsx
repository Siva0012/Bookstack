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
      <h1 className="text-2xl tracking-wide mb-3 uppercase font-semibold text-white">
        Your book reservations
      </h1>
      {reservedBooks.length > 0 ? (
        reservedBooks &&
        reservedBooks.map((book) => {
          return (
            <>
              <BookCardHorizontal
                bookData={book.book}
                reservedOn={book.reservedOn}
              />
            </>
          );
        })
      ) : (
        <h1 className="text-2xl tracking-wide mb-3 font-semibold text-white">
          You don't have any reservations !!
        </h1>
      )}
    </div>
  );
}

export default ReservedBooks;
