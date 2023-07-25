//member APIs
import { getActiveCheckouts, getFineHistory } from "../../Utils/MemberApis";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

function Fines() {
  const navigate = useNavigate();
  const rupees = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const [activeCheckouts, setActiveCheckouts] = useState([]);
  const [fineHistory, setFineHistory] = useState([]);

  const handlePay = () => {
    navigate("/fine-payment");
  };

  useEffect(() => {
    getActiveCheckouts()
      .then((response) => {
        if (response.data.activeCheckouts) {
          setActiveCheckouts(response.data.activeCheckouts);
        }
      })
  }, []);

  useEffect(() => {
    getFineHistory().then((response) => {
      if (response.data.fineData) {
        setFineHistory(response.data.fineData);
      }
    });
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="min-w-[70%] p-2">
          {activeCheckouts && activeCheckouts.length ? (
            <>
              <h1 className="mb-4 text-xl uppercase text-white font-semibold tracking-wide mt-1">
                Your Active checkouts
              </h1>
              {activeCheckouts.map((checkout) => {
                return (
                  <div
                    key={checkout._id}
                    className="flex shadow-[0px_0px_10px_rgba(0,0,0,0.2)] "
                  >
                    <div
                      id="left-div"
                      className="w-[30%] p-2 flex flex-col justify-center items-center"
                    >
                      <div className="w-14 h-14 mb-3 ">
                        <img
                          className="rounded-full w-full h-full"
                          src={checkout.book.coverPhoto}
                          alt=""
                        />
                      </div>
                      <p>{checkout.book.title}</p>
                    </div>
                    <div id="right-div" className="w-[70%] py-2">
                      <div className="flex px-2 mb-2">
                        <p className="w-[40%]">Checkout date</p>
                        <p className="w-[60%] text-end">
                          {moment(checkout.checkoutDate).format("MMM Do YY")}
                        </p>
                      </div>
                      <div className="flex px-2 mb-2">
                        <p className="w-[40%]">Due date</p>
                        <p className="w-[60%] text-end">
                          {moment(checkout.dueDate).format("MMM Do YY")}
                        </p>
                      </div>
                      <div className="flex px-2">
                        <p className="w-[40%]">Fine amount</p>
                        <p className="w-[60%] text-end">
                          {rupees.format(checkout.fineAmount)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-[30%] flex flex-col p-2">
          {activeCheckouts && activeCheckouts.length > 0 && (
            <>
              <h1 className=" text-white text-lg text-center font-semibold tracking-wide mt-1">
                Total amount to pay
              </h1>
              <div className="mt-10">
                {
                  <h1 className="text-lg relative text-center text-red-800 font-bold">
                    {rupees.format(activeCheckouts[0].member.totalFineAmount)}
                  </h1>
                }
              </div>
              <button
                onClick={handlePay}
                className=" self-center mt-2 text-center text-white bg-blue-800 hover:text-blue-800 font-semibold hover:bg-white rounded-md w-fit px-2 py-1"
              >
                Pay now
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-4 p-2">
        {fineHistory.length > 0 ? (
          <>
            <h1 className="text-xl uppercase text-white font-semibold tracking-wide mt-1">
              Fine history
            </h1>
            <div className="py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Book
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Checkout Date
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Due date
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Return date
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Fine
                      </th>

                      {/* <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Action
                  </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {fineHistory.map((fineData) => {
                      return (
                        <tr key={fineData._id}>
                          <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex">
                              <div className="flex-shrink-0 w-16 h-16">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={fineData.book.coverPhoto}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-black whitespace-no-wrap">
                                  {fineData.book.title}
                                </p>
                                <p className="text-gray-500 whitespace-no-wrap">
                                  {fineData.book.author}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(fineData.checkoutDate).format(
                                "MMM Do YY"
                              )}
                            </p>
                          </td>
                          <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(fineData.dueDate).format("MMM Do YY")}
                            </p>
                          </td>
                          <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {fineData.returnDate
                                ? moment(fineData.returnDate).format(
                                    "MMM Do YY"
                                  )
                                : "Not returned"}
                            </p>
                          </td>

                          <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              />
                              <span className="relative">
                                {fineData.status}
                              </span>
                            </span>
                          </td>
                          <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                            <p
                              className={`${
                                !fineData.hasFinePaid
                                  ? "text-red-600 font-bold"
                                  : "text-green-600 font-semibold"
                              } whitespace-no-wrap`}
                            >
                              {fineData.fineAmount ? fineData.fineAmount : 0}
                            </p>
                          </td>
                          {/* {checkout.status === "Borrowed" ? (
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <span className="relative">Return</span>
                          </span>
                        </td>
                      ) : (
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <span className="relative">{}</span>
                          </span>
                        </td>
                      )} */}
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
            <h1 className="text-xl text-white font-semibold tracking-wide mt-1">
              No fine history available !!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Fines;
