import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import FineCheckoutForm from "./FineCheckoutForm";
import "../../../src/App.css";
const stripePublishableKey = import.meta.env
  .VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY;

//member APIs
import { createFinePaymentIntent } from "../../Utils/MemberApis";
let rupees = new Intl.NumberFormat("en-In", {
  style: "currency",
  currency: "INR",
});

export default function FinePayment() {
  const stripePromise = loadStripe(stripePublishableKey);
  const [clientSecret, setClientSecret] = useState("");
  const membershipData = useSelector((state) => state.memberShipType.value);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createFinePaymentIntent()
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex justify-center">
      {/* <div className="w-full text-center p-3 text-gray-800">
        <div className="flex flex-col items-center justify-center h-full">
            <h5 className="text-lg font-semibold text-black">
              Payable amount :{" "}
              <span className="text-green-600 ">{rupees.format(400)}</span>
            </h5>
        </div>
      </div> */}
      <div className="App shadow-[0px_0px_15px_rgba(0,0,0,0.25)]">
        {clientSecret && stripePromise && (
          <Elements options={options} stripe={stripePromise}>
            <FineCheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
