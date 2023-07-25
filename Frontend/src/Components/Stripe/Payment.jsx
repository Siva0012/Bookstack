import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import CheckoutForm from "../Stripe/CheckoutForm";
import "../../../src/App.css";
const stripePublishableKey = import.meta.env
  .VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY;

//member APIs
import { createPaymentIntent } from "../../Utils/MemberApis";

export default function Payment() {
  const stripePromise = loadStripe(stripePublishableKey);
  const [clientSecret, setClientSecret] = useState("");
  const memberShipData = useSelector((state) => state.memberShipType.value);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent({ membershipType: memberShipData })
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
    <div className="flex justify-between">
      <div className="w-full text-center p-3 text-gray-800">
        <h1 className="text-xl mb-2 mt-5 font-semibold ">You have selected</h1>
        <div className="mt-10">
          {memberShipData === "student" ? (
            <h1 className="text-3xl tracking-wide font-bold inline shadow-lg">
              Students Plan
            </h1>
          ) : (
            <h1 className="text-3xl tracking-wide font-bold inline shadow-lg">
              Premium Plan
            </h1>
          )}

          {memberShipData === "student" ? (
            <h1 className="text-xl font-semibold text-black mt-2">
              Payable amount : <span className="text-green-600 ">999</span>
            </h1>
          ) : (
            <h1 className="text-xl font-semibold text-black mt-2">
              Payable amount : <span className="text-green-600 ">1399</span>
            </h1>
          )}
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
