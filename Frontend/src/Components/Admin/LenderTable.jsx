import { useState, useEffect } from "react";
import moment from "moment";
import DropdownMenu from "./DropdownMenu";

//admin APIs
import { changeCheckoutStatus, getLenderHistory } from "../../Utils/AdminApis";
import { toast } from "react-toastify";

function LenderTable() {
  const [lenderData, setlenderData] = useState([]);

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    //     getLenderHistory().then((response) => {
    //       if (response.data.lenderData) {
    //         setlenderData(response.data.lenderData);
    //       }
    //     });
    fetchLenderData();
  }, []);

  const fetchLenderData = async () => {
    try {
      const response = await getLenderHistory();
      if (response) {
        setlenderData(response.data.lenderData);
      }
    } catch (err) {
      console.log(err);
    }
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

  return (
    <>
      <div className="text-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">
                Lender history
              </h2>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
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
                      lenderData.map((data) => {
                        return (
                          <tr key={data._id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex">
                                <div className="flex-shrink-0 w- h-10">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
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
                                {moment(data.checkoutDate).format("MMM Do YY")}
                              </p>
                              <p className="text-gray-600 whitespace-no-wrap">
                                Due in 6 days
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
                                {data.returnDate ? moment(data.returnDate).format('MMM Do YY') : 'Not returned'}
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
                              <p className={`${data.fineAmount ? 'text-red-600 font-bold' : 'text-green-700 font-semibold'} text-gray-900 whitespace-no-wrap`}>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default LenderTable;
