import Payment from "../../Components/Stripe/Payment";

function PaymentPage() {
  return (
    <div
      id="outer-container"
      className=" max-w-[1240px] bg-gradient-to-r from-user-profile-from to-user-profile-to rounded-lg"
    >
      <Payment />
    </div>
  );
}

export default PaymentPage;
