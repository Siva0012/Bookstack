import SingleBook from "../../Components/Members/SingleBook";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//member APIs
import { getSingleBook, addToBookBag , reserveBook } from "../../Utils/MemberApis";
import { toast } from "react-toastify";

function SingleBookPage() {
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

  const [bookData, setBookData] = useState({});
  const params = useParams();
  const bookId = params.bookId;
  useEffect(() => {
    getSingleBook(bookId).then((response) => {
      if (response.data.bookData) {
        setBookData(response.data.bookData);
      }
    });
  }, [bookId]);

  return (
    <div>
      <SingleBook bookData={bookData} handleAddtoBag={handleAddtoBag} handleBookReserve={handleBookReserve} />
    </div>
  );
}

export default SingleBookPage;
