import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

//member APIs
import {
  checkoutBooks,
  getBookBag,
  removeFromBookBag,
} from "../../Utils/MemberApis";
import { toast } from "react-toastify";

function BookBag() {
  const [member, setMember] = useState({});
  const [update, setupdate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const response = await getBookBag();
        if (response) {
          setMember(response.data.memberData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [update]);

  const handleRemove = (bookId) => {
    removeFromBookBag(bookId)
      .then((response) => {
        if (response.data.message) {
          setupdate((prev) => !prev);
          toast.success(response.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const handleCheckout = () => {
    const isNotAvailable = member.bookBag.filter((data) => {
      return data.book.availableStock <= 0;
    });
    isNotAvailable.length
      ? toast.warning("Remove the book that is not available")
      : checkoutBooks()
          .then((response) => {
            if (response) {
              toast.success(response.data.message);
              setupdate((prev) => !prev);
            }
          })
          .catch((err) => {
            if (err.response.data.error) {
              toast.error(err.response.data.error);
            }
          });
  };

  return (
    <div className="p-2">
      {member && member.bookBag && member.bookBag.length > 0 ? (
        <h1 className="font-lg">Books</h1>
      ) : (
        <div className="text-center mt-6">
          <p className=" text-[#EAEFF2] text-2xl font-bold">
            OOPS{" "}
          </p>
          <h2 className="text-lg mt-2 font-semibold">
            There is nothing here :({" "}
          </h2>
          <div className="text-2xl tracking-wider font-extrabold text-[#3D550C] mt-4">
            Start
          </div>
        </div>
      )}
      <div>
        {member && member.bookBag && member.bookBag.length > 0
          ? member.bookBag.map((data) => {
              return (
                <>
                  <div className="w-full h-fit mt-2 flex">
                    <div className="w-3/10 h-full">
                      <div className="w-[150px] h-[190px]">
                        <img
                          className="w-[100%] h-[100%]"
                          src={
                            data.book.coverPhoto
                              ? data.book.coverPhoto
                              : "../../../public/public-images/image.jpg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="w-7/10 h-full ms-5">
                      <h1 className="text-lg">{data.book.title}</h1>
                      <h1 className="text-md mt-2">{data.book.author}</h1>
                      {data.book.availableStock <= 0 ? (
                        <h1 className="text-md mt-2">Not Available</h1>
                      ) : (
                        <h1 className="text-md mt-2">Available</h1>
                      )}
                      <h1
                        onClick={() => handleRemove(data.book._id)}
                        className={`${
                          data.book.availableStock <= 0
                            ? "text-red-600"
                            : "text-white"
                        } text-sm mt-2 hover:text-md hover:p-1 hover:text-white hover:shadow-md hover:cursor-pointer`}
                      >
                        Click here to remove the book
                      </h1>
                    </div>
                  </div>
                </>
              );
            })
          : null}
        {member && member.bookBag && member.bookBag.length > 0 ? (
          <button
            onClick={handleCheckout}
            className="bg-blue-500 mt-3 block mx-auto py-2 px-4 rounded-md font-semibold"
          >
            Checkout books
          </button>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="bg-[#EBEAE5] mt-2 block mx-auto py-2 px-4 rounded-md font-semibold"
          >
            Explore books here!
          </button>
        )}
      </div>
    </div>
  );
}

export default BookBag;
