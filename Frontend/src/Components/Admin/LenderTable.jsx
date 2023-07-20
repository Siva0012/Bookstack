import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";

//admin APIs
import { changeCheckoutStatus, getLenderHistory } from "../../Utils/AdminApis";
import { toast } from "react-toastify";

function LenderTable() {
  const limit = 5;
  const [lenderData, setlenderData] = useState([]);
  const [lenderCount, setLenderCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [page, seTpage] = useState(1);

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };

  const fetchLenderData = async () => {
    try {
      const response = await getLenderHistory(activePage, limit);
      if (response.data.lenderData) {
        setLenderCount(response.data.lenderCount);
        setlenderData(response.data.lenderData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const countTotalPages = (total, limit) => {
    const pages = [];
    for (let x = 1; x <= parseInt(Math.ceil(total/limit)); x++) {
      pages.push(x);
    }
    return pages;
  };

  const updateStatus = async (lenderId, status) => {
    try {
      const udpateResponse = await changeCheckoutStatus(lenderId, status);
      if (udpateResponse) {
        toast.success(udpateResponse.data.message);
      }
      fetchLenderData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLenderData();
  }, []);

  const handlePagination = (pageNo) => {
    setActivePage(pageNo);
    fetchLenderData();
  };

  return (
    <>
      <div className="text-white">
        <div className="container mx-auto px-4 ">
          <div className="py-8">
            {lenderData.length > 0 ? (
              <>
                <div>
                  <h2 className="text-2xl font-semibold leading-tight">
                    Lender history
                  </h2>
                </div>
                <div className="mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <nav
                      className="flex items-center justify-between mb-3 pt-4"
                      aria-label="Table navigation"
                    >
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing{" "}
                        <span className="font-semibold dark:text-white">
                          {activePage}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold dark:text-white">
                          {lenderCount}
                        </span>
                      </span>
                      <ul className="inline-flex items-center -space-x-px">
                        <li>
                          {activePage !== 1 && (
                            <span
                            onClick={() => handlePagination(activePage - 1)}
                             className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
                            </span>
                          )}
                        </li>
                        {lenderCount &&
                          limit &&
                          countTotalPages(lenderCount, limit).map((pageNo) => {
                            return (
                              <li
                                key={pageNo}
                                onClick={() => handlePagination(pageNo)}
                              >
                                <span
                                  className={`px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer ${
                                    activePage === pageNo
                                      ? `text-blue-600 font-semibold`
                                      : `text-gray-500`
                                  }`}
                                >
                                  {pageNo}
                                </span>
                              </li>
                            );
                          })}
                        <li>
                          {activePage !== Math.ceil(lenderCount/limit) && (
                            <span
                            onClick={() => handlePagination(activePage + 1)}
                             className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
                            </span>
                          )}
                        </li>
                      </ul>
                    </nav>
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            No
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Member
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Book
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Checkout date
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Due date
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Return date
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Fine
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {lenderData &&
                          lenderData.map((data, i) => {
                            return (
                              data.member &&
                              <tr key={data._id}>
                                <td className="px-5 py-5 border-b text-black border-gray-200 bg-white text-sm">
                                  <span>{i + 1}</span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex">
                                    <div className="flex-shrink-0 w- h-10">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src={
                                          data.member?.profilePicture
                                            ? data.member?.profilePicture
                                            : "../../../public/public-images/image.jpg"
                                        }
                                        // src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap font-semibold">
                                        {data.member.name}
                                      </p>
                                      <p className="text-gray-600 whitespace-no-wrap">
                                        {data.member.membershipId}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {data.book.title}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap">
                                    {data.book.author}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {moment(data.checkoutDate).format(
                                      "MMM Do YY hh:mm:ss"
                                    )}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap">
                                    {data.status === "Pending" ? (
                                      <div>
                                        <span>Expires in</span>
                                        {moment(data.expiresIn).format(
                                          "MMM Do YY hh:mm:ss"
                                        )}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {moment(data.dueDate).format("MMM Do YY")}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap"></p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {data.returnDate
                                      ? moment(data.returnDate).format(
                                          "MMM Do YY"
                                        )
                                      : "Not returned"}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap"></p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <DropdownMenu
                                    status={data.status}
                                    lenderId={data._id}
                                    updateStatus={updateStatus}
                                  />
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p
                                    className={`${
                                      !data.hasFinePaid
                                        ? "text-red-600 font-bold"
                                        : "text-green-700 font-semibold"
                                    } text-gray-900 whitespace-no-wrap`}
                                  >
                                    {data.fineAmount}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap"></p>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold leading-tight">
                  No lender history
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LenderTable;
