import { Link } from "react-router-dom";
import CancelImg from "../assets/cancel.svg";
import AppreciationImg from "../assets/appreciation.svg";

const Checkout = ({ location }) => {
  const params = new URLSearchParams(location.search);

  const payment = (message, submessage, img) => (
    <div className="mt-8 container mx-auto flex items-center flex-col">
      <img src={img} alt="Not Found" className="m-5 w-1/3" />
      <h1 className="leading-8 text-2xl font-thin m-16 mb-6">{message}</h1>
      <p className="text-xl font-medium mb-8">{submessage}</p>
      <Link to="/dashboard/events" className="mb-16">
        <button type="button" className="k-button">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );

  return (
    <>
      {params.get("canceled")
        ? payment("Payment has been cancelled", "", CancelImg)
        : ""}
      {params.get("success")
        ? payment(
            "We cannot truly appreciate you in words for contributing to a someone's need.",
            "A huge thanks from Charitable and its team.",
            AppreciationImg
          )
        : ""}
    </>
  );
};

export default Checkout;
