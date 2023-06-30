//member APIs
import { getActiveCheckouts } from "../../Utils/MemberApis";

import { useState, useEffect } from "react";

function Fines() {
  const [activeCheckouts, setActiveCheckouts] = useState([]);

  useEffect(() => {
    getActiveCheckouts()
      .then((response) => {
        if (response.data.activeCheckouts) {
          console.log(response.data.activeCheckouts);
          setActiveCheckouts(response.data.activeCheckouts);
        }
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);

  return (
    <div className="flex">
      <div className="w-[75%] p-2">
        {activeCheckouts && activeCheckouts.length ? (
          <>
            <h1 className="mb-4 text-center text-xl font-semibold tracking-wide mt-1">
              Your Active checkouts
            </h1>
            {activeCheckouts.map((checkout) => {
              return (
                <div key={checkout._id} className="flex ">
                  <div id="left-div" className="w-[20%]">
                    <div className="w-14 h-14 mb-3">
                      <img
                        className="rounded-full w-full h-full"
                        src={checkout.book.coverPhoto}
                        alt=""
                      />
                    </div>
                    <p>{checkout.book.title}</p>
                  </div>
                  <div id="right-div" className="w-[80%]">
                    sdj;fjdso
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <h1 className="mb-4 text-center text-xl font-semibold tracking-wide mt-1">
            You don't have any Active checkouts
          </h1>
        )}
      </div>
      <div className="w-[25%]">
        <h1>Total amount to pay</h1>
      </div>
    </div>
  );
}

export default Fines;
