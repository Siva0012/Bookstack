import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

//toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//admin APIs
import { getBooks, listOrUnlist } from "../../Utils/AdminApis";

function BooksTable() {
  const [books, setBooks] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/add-book");
  };

  const booksData = async () => {
    getBooks().then((response) => {
      if (response.data.books) {
        setBooks(response.data.books);
      }
    });
  };

  const handleViewBook = (id) => {
    navigate(`/admin/view-book/${id}`);
  };

  const handleRemove = (id, data) => {
    listOrUnlist(id, data).then((response) => {
      toast.warn(response.data.message, { autoClose: 2000, theme: "dark" });
      setUpdateTable(!updateTable);
    });
  };

  useEffect(() => {
    booksData();
  }, [updateTable]);

  return (
    <div className="flex-col">
      <div className="flex items-end mb-4">
        <button
          onClick={handleClick}
          className="text-white px-5 py-1 rounded-sm bg-blue-500  me-auto "
        >
          Add book
        </button>
      </div>
      <div className="relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Date added
              </th>
              <th scope="col" className="px-6 py-3">
                Edition
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books &&
              books.map((book) => {
                return (
                  <>
                    <tr
                      key={book._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {book.title}
                      </th>
                      <td className="px-6 py-4">{book.author}</td>
                      <td className="px-6 py-4">{book.category.name}</td>
                      <td className="px-6 py-4">
                        {moment(book.dateAdded).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </td>
                      <td className="px-6 py-4">{book.edition}</td>
                      <td className="px-6 py-4">{book.stock}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleViewBook(book._id)}
                            className="bg-indigo-600 w-[75px] text-white px-2 py-1 rounded-md hover:text-indigo-600 hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]  hover:bg-white"
                          >
                            View
                          </button>
                          {book.listed ? (
                            <button
                              onClick={() =>
                                handleRemove(book._id, book.listed)
                              }
                              className="bg-yellow-500 w-[75px] ms-8 text-white px-2 py-1 rounded-md hover:text-yellow-500 hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]  hover:bg-white"
                            >
                              unlist
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleRemove(book._id, book.listed)
                              }
                              className="bg-yellow-500 w-[75px] ms-8 text-white px-2 py-1 rounded-md hover:text-yellow-500 hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]  hover:bg-white"
                            >
                              list
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <Link
                href="#"
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </Link>
            </li>
            <li>
              <Link
                href="#"
                aria-current="page"
                className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                ...
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                100
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BooksTable;
