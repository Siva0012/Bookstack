import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

//toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//admin APIs
import { getBooks, listOrUnlist } from "../../Utils/AdminApis";
import EditModal from "../Modal/EditModal";

function BooksTable() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/add-book");
  };

  const fetchBookData = async () => {
    try{
      const response = await getBooks()
      if(response.data.books) {
        setBooks(response.data.books)
      }
    }catch(err) {
    }
  }

  const handleViewBook = (id) => {
    navigate(`/admin/view-book/${id}`);
  };

  const handleRemove = (id, data) => {
    listOrUnlist(id, data).then((response) => {
      if(response.data.message) {
        fetchBookData()
        toast.warn(response.data.message, { autoClose: 2000, theme: "dark" });
      }
    });
  };

  useEffect(() => {
    fetchBookData()
  }, []);

  return (
    <div className="flex-col">
      <div className="conatiner mx-auto">
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight text-white">
              Books
            </h2>
            <button
              onClick={handleClick}
              className="text-white bg-blue-600 rounded-md px-2 py-1"
            >
              Add new
            </button>
          </div>
          <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date added
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Edition
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Available Books
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" /> */}
                  </tr>
                </thead>
                <tbody>
                  {books &&
                    books.map((book) => {
                      return (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex">
                              <div className="flex-shrink-0 w-28 h-28">
                                <img
                                  className="w-full h-full"
                                  src={book.coverPhoto}
                                  alt=""
                                />
                              </div>
                              {/* <div className="ml-3 w-8">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(book.dateAdded).format("MMM Do YY")}
                            </p>
                          </div> */}
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {book.title}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {book.author}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {book.category.name}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(book.dateAdded).format("MMM Do YY")}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {book.edition}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {book.stock}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {book.availableStock}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span
                              onClick={() => handleBanner(book._id, book.list)}
                              className="relative inline-block px-3 py-1 font-semibold min-w-fit  text-green-900 leading-tight hover:cursor-pointer"
                            >
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-300 opacity-50 rounded-full"
                              />
                              {book.listed ? (
                                <span
                                  onClick={() =>
                                    handleRemove(book._id, book.listed)
                                  }
                                  className="relative min-w-[90px]  mx-auto text-center"
                                >
                                  unlist
                                </span>
                              ) : (
                                <span
                                  onClick={() =>
                                    handleRemove(book._id, book.listed)
                                  }
                                  className="relative min-w-[90px]  mx-auto text-center"
                                >
                                  list
                                </span>
                              )}
                            </span>
                            <span 
                            onClick={() => navigate(`/admin/edit-book/${book._id}`)}
                            className=" mt-3 relative inline-block px-3 py-1 font-semibold w-[60px] text-center text-blue-900 leading-tight hover:cursor-pointer">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-blue-600 opacity-50 rounded-full"
                              />
                              <span className="relative mx-auto text-center">
                                Edit
                              </span>
                            </span>
                          </td>
                          {/* Edit */}
                          {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          onClick={() =>
                            handleEditBanner(
                              book._id,
                              book.title,
                              book.description,
                              book.image
                            )
                          }
                          className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight hover:cursor-pointer"
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-blue-600 opacity-50 rounded-full"
                          />
                          <span className="relative">Edit</span>
                        </span>
                      </td> */}
                          {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                              <button
                                type="button"
                                className="inline-block text-gray-500 hover:text-gray-700"
                              >
                                <svg
                                  className="inline-block h-6 w-6 fill-current"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                </svg>
                              </button>
                            </td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksTable;
