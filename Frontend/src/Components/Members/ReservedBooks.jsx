import { useState, useEffect } from "react";
import { cancelReservation as cancelReservationApi, getReservedBooks } from "../../Utils/MemberApis";
import BookCard from "../Cards/BookCard";
import BookCardHorizontal from "../Cards/BookCardHorizontal";
import { toast } from "react-toastify";


function ReservedBooks() {
  const [reservedBooks, setReservedBooks] = useState([]);

  const cancelReservation = (reservationId) => {
    console.log("cancel reservation" , reservationId);
    cancelReservationApi(reservationId)
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
    getReservedBooks().then((response) => {
      if (response.data.reservedBooks) {
        console.log(response.data.reservedBooks);
        setReservedBooks(response.data.reservedBooks);
      }
    });
  }, []);
  return (
    <div className="">
      <h1 className="text-2xl tracking-wide mb-3 capitalize font-semibold text-white">
        book reservations
      </h1>
      {reservedBooks.length > 0 ? (
        reservedBooks &&
        reservedBooks.map((reservation) => {
          return (
              <BookCardHorizontal key={reservation._id}
                bookData={reservation.reservation.bookId}
                reservedOn={reservation.reservation.reservedOn}
                status ={reservation.reservation.status}
                reservationId = {reservation.reservation._id}
                cancelReservation = {cancelReservation}
              />
          );
        })
      ) : (
        <h1 className="text-lg text-center tracking-wide mt-20 font-semibold text-white">
          You don't have any reservations !!
        </h1>
      )}
    </div>
  );
}

export default ReservedBooks;
