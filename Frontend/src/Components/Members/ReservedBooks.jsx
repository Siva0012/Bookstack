import { useState, useEffect } from "react";
import { getReservedBooks } from "../../Utils/MemberApis";
import BookCard from "../Cards/BookCard";

function ReservedBooks() {
  const [reservedBooks, setReservedBooks] = useState([]);
  useEffect(() => {
    getReservedBooks().then((response) => {
      if (response.data.reservedBooks) {
        console.log(response.data, "fasdjifpoasdfjiposdf");
        setReservedBooks(response.data.reservedBooks.reservedBooks);
      }
    });
  }, []);
  return (
    <div>
      <BookCard />
    </div>
  );
}

export default ReservedBooks;
