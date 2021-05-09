import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardActions,
  CardImage,
} from "@progress/kendo-react-layout";
import { Badge } from "@progress/kendo-react-indicators";
import { Input } from "@progress/kendo-react-inputs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { loadStripe } from "@stripe/stripe-js";
import ArcGaugeComponent from "./ArcGauge";
import { checkout } from "../_services/events";
import { useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51IiCLhSCMiRl8J6iMpJatcL2HQAEetwuQn0zlXvsnfAJNAo1gBCCFYeFeetmYkbMtD9WRzktl3L4uVgsAUe7kbdC00RDqc4DYY"
);
dayjs.extend(relativeTime);

const EventCard = ({ dataItem, totals }) => {
  const [allow_payment, setAllowPayment] = useState(false);
  const [amount, setAmount] = useState(0);
  const [raised, setRaised] = useState(0);
  const [complete, setComplete] = useState(false);

  const handleClick = () => {
    setAllowPayment(!allow_payment);
  };

  const handleCheckout = async (data) => {
    const stripe = await stripePromise;

    data.amount = amount;
    checkout(data).then(async (res) => {
      console.log(res);

      if (res.status === 200) {
        const session = res.data;

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        }
      }
    });
  };

  const {
    image,
    cause_name: title,
    creator,
    createdAt,
    cause_type,
    _id,
    target_price,
  } = dataItem;

  useEffect(() => {
    totals.forEach((total) =>
      total._id === _id ? setRaised(total.raised) : ""
    );
    setComplete(true);
  }, []);

  return (
    <>
      <Card className="w-auto shadow-md mt-1 my-5 mx-2">
        <CardHeader className="k-hbox bg-transparent" style={{ padding: "0" }}>
          <CardImage
            src={image}
            className="h-32 sm:h-44 min-w-full max-w-full"
          />
          <div className="absolute top-4 right-14">
            <Badge
              size="large"
              fill="solid"
              shape="rounded"
              themeColor="inverse"
            >
              Started {dayjs(createdAt).fromNow(true)} ago
            </Badge>
          </div>
          <div className="absolute bottom-4 right-12">
            <Badge
              size="large"
              fill="solid"
              shape="rounded"
              themeColor="secondary"
            >
              {cause_type === "others"
                ? "A good"
                : cause_type.charAt(0).toUpperCase() + cause_type.slice(1)}{" "}
              cause
            </Badge>
          </div>
        </CardHeader>

        <CardBody>
          <div className="w-full">
            <span className="text-base sm:text-xl font-bold">
              {title &&
                (title.length > 10 ? title.substring(0, 22) + " ..." : title)}
            </span>
            <div className="mt-8 w-full flex">
              <div className="w-3/6">
                {complete && (
                  <ArcGaugeComponent
                    raised={raised}
                    target_price={target_price}
                  />
                )}
                <br />
                <span className="text-sm sm:text-base font-semibold text-blueGray-900">
                  ₹{raised}
                </span>
                <br />
                <span className="text-xs sm:text-sm font-normal">Raised</span>
              </div>
              <div className="w-3/6 text-left">
                <span className="ml-4 text-xs sm:text-sm">Created By</span>
                <br />
                <span className="ml-4 text-sm sm:text-base">
                  {creator.name}
                </span>
                <div>
                  <CardActions>
                    <button
                      className="k-button k-flat"
                      onClick={() => handleClick(dataItem)}
                    >
                      <img
                        alt=""
                        src="https://img.icons8.com/dusk/64/26e07f/donate.png"
                        className="w-8 sm:w-10"
                      />
                    </button>
                    <button className="k-button k-flat">
                      <img
                        alt=""
                        src="https://img.icons8.com/android/24/000000/more.png"
                        className="w-4 sm:w-6"
                      />
                    </button>
                  </CardActions>
                </div>
              </div>
            </div>

            {allow_payment ? (
              <div className="flex justify-center items-center">
                <Input
                  placeholder="Donation amount"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className="donation-button text-white p-1 rounded-sm m-1"
                  onClick={() => handleCheckout(dataItem)}
                >
                  Proceed
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </CardBody>
      </Card>
      <style>{`
        .donation-button {
          background: #ff545a;
        }
      `}</style>
    </>
  );
};

export default EventCard;
