//member APIs
import { getActiveCheckouts } from "../../Utils/MemberApis";

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
      .catch((err) => console.log(err.response.data.error));
  }, []);

  return (
    <div className="flex py-2">
      <div className="min-w-[70%] p-2">
        {activeCheckouts && activeCheckouts.length ? (
          <>
            <h1 className="mb-4 text-center text-xl font-semibold tracking-wide mt-1">
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
          <h1 className="mb-4 text-center text-xl font-semibold tracking-wide mt-1">
            You don't have any Active checkouts !
          </h1>
        )}
      </div>
      <div className="w-[30%] flex flex-col p-2">
        {activeCheckouts && activeCheckouts.length > 0 && (
          <>
            <h1 className="text-center text-xl font-semibold tracking-wide mt-1">
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
  );
}

export default Fines;
