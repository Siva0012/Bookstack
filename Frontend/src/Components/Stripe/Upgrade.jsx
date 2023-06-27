import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import "../../../src/App.css";
const stripePublishableKey = import.meta.env
  .VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY;

//member APIs
import { createPaymentIntent } from "../../Utils/MemberApis";
let rupees = new Intl.NumberFormat("en-In", {
  style: "currency",
  currency: "INR",
});

export default function Upgrade() {
  const stripePromise = loadStripe(stripePublishableKey);
  const [clientSecret, setClientSecret] = useState("");
  const membershipData = useSelector((state) => state.memberShipType.value);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent({ membershipType: membershipData })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex justify-between">
      <div className="w-full text-center p-3 text-gray-800">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl mb-1 text-[#04672c] tracking-wide font-bold ">
            Congratulations on your Decision!!
          </h1>
          <div className="max-w-[350px] mb-6">
            <p className="text-md text-start text-bg-user-to tracking-wider font-semibold ">
              You have chosen to upgrade your Student membership to{" "}
              <span className=" px-2 font-bold text-[#ffd52e] bg-user-to shadow-[0px_0px_10px_rgba(0,0,0,0.15)] rounded-xl ">Premium</span> membership
            </p>
          </div>
            <h5 className="text-lg font-semibold text-black">
              Payable amount :{" "}
              <span className="text-green-600 ">{rupees.format(400)}</span>
            </h5>
        </div>
      </div>
      <div className="App">
        {clientSecret && stripePromise && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
