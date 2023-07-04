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
      {/* <div className="flex items-end mb-4">
        <button
          onClick={handleClick}
          className="text-white px-5 py-1 rounded-sm bg-blue-500  me-auto "
        >
          Add book
        </button>
      </div> */}
      <div className="conatiner mx-auto">
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight text-white">Books</h2>
            <button
            onClick={handleClick}
             className="text-white bg-blue-600 rounded-md px-2 py-1">
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
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          />
                          {book.listed ? (
                            <span
                            onClick={() => handleRemove(book._id , book.listed)}
                             className="relative min-w-[90px]  mx-auto text-center">
                              unlist
                            </span>
                          ) : (
                            <span
                            onClick={() => handleRemove(book._id , book.listed)}
                             className="relative min-w-[90px]  mx-auto text-center">
                              list
                            </span>
                          )}
                        </span>
                      </td>
                      {/*Edit */}
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
      
      {/* <div className="relative shadow-md sm:rounded-lg">
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
                Available books
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
                      <td className="px-6 py-4">{book.availableStock}</td>
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
      </div> */}
    </div>
  );
}

export default BooksTable;
