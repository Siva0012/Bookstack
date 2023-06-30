import { useEffect, useState } from "react";
import { getCheckouts } from "../../Utils/MemberApis";
import moment from "moment";

function Checkouts() {
  const [checkoutData, setCheckoutData] = useState([]);

  useEffect(() => {
    getCheckouts().then((response) => {
      if (response.data) {
        setCheckoutData(response.data.checkoutData);
      }
    });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-2">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Your checkouts
          </h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
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
                {checkoutData.map((checkout) => {
                  return (
                    <tr key={checkout._id}>
                      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex">
                          <div className="flex-shrink-0 w-16 h-16">
                            <img
                              className="w-full h-full rounded-full"
                              src={checkout.book.coverPhoto}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-black whitespace-no-wrap">
                              {checkout.book.title}
                            </p>
                            <p className="text-gray-500 whitespace-no-wrap">
                              {checkout.book.author}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {moment(checkout.checkoutDate).format("MMM Do YY")}
                        </p>
                      </td>
                      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {moment(checkout.dueDate).format("MMM Do YY")}
                        </p>
                      </td>
                      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {checkout.returnDate ? moment(checkout.returnDate).format("MMM Do YY"): 'Not returned'}
                        </p>
                      </td>

                      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          />
                          <span className="relative">{checkout.status}</span>
                        </span>
                      </td>
                      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className={`${checkout.fineAmount ? 'text-red-600 font-bold' : 'text-green-600 font-semibold'} whitespace-no-wrap`}>
                          {checkout.fineAmount ? checkout.fineAmount : 0}
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
      </div>
    </div>
  );
}

export default Checkouts;
