import React, { useEffect, useState } from "react";
import help from "../assets/help.jpg";
import charity from "../assets/charity-box.png";
import { Ripple } from "@progress/kendo-react-ripple";
import { Link } from "react-router-dom";
import { homeData } from "../_services";
import { formatCash } from "../_helpers/currency";

import { loadMessages } from "@progress/kendo-react-intl";
import { MessageComponent } from "../components/MessageComponent";

import {
  headers,
  titleKey,
  subtitleKey,
  descriptionKey,
  homeButtonKey,
  fundraisersKey,
  raisedKey,
  donationKey,
} from "../_helpers/localization";

loadMessages(headers["in"], "in");
loadMessages(headers["us"], "us");

const defaultHeaders = {
  [titleKey]: "Charitable",
  [subtitleKey]: "Croudfunding",
  [descriptionKey]: "Raise Funds Online for personal, public causes",
  [homeButtonKey]: "Start a fundraiser - Its' free",
  [fundraisersKey]: "Fundraisers",
  [raisedKey]: "Raised",
  [donationKey]: "Donation",
};

const IntroSection = () => {
  return <IntroBody />;
};

const IntroBody = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    homeData().then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, []);
  return (
    <>
      <div className="container font-sans bg-white">
        <div className=" flex xs:flex flex-col-reverse sm:flex-row">
          <div className="flex-1">
            <div className="m-8 sm:m-12">
              <span className="text-xl sm:text-2xl md:text-2xl lg:text-4xl ">
                <MessageComponent
                  messageKey={titleKey}
                  defaultMessage={defaultHeaders[titleKey]}
                />{" "}
                <span className="text-sm text-charity sm:text-sm md:text-base lg:text-xl">
                  <MessageComponent
                    messageKey={subtitleKey}
                    defaultMessage={defaultHeaders[subtitleKey]}
                  />
                </span>
              </span>
              <br />
              <span className="text-xs mt-5 block sm:text-lg">
                <MessageComponent
                  messageKey={descriptionKey}
                  defaultMessage={defaultHeaders[descriptionKey]}
                />
              </span>
              <br />
              <Ripple>
                <Link to="/create-fundraiser">
                  <button className="k-button text-base font-semibold px-6 py-2 rounded-lg">
                    <img
                      src={charity}
                      width="24"
                      height="24"
                      alt="fundraiser"
                    />
                    <MessageComponent
                      messageKey={homeButtonKey}
                      defaultMessage={defaultHeaders[homeButtonKey]}
                    />
                  </button>
                </Link>
              </Ripple>
              <br />
              <div className="flex mt-10 text-center">
                {Object.keys(data).length > 0 && (
                  <>
                    <div className="border-r-2 border-gray-200 flex-grow sm:w-40 sm:flex-none">
                      <span className="font-medium text-3xl sm:text-4xl">
                        {data.fundraisers}
                      </span>
                      <br />

                      <span>
                        <MessageComponent
                          messageKey={fundraisersKey}
                          defaultMessage={defaultHeaders[fundraisersKey]}
                        />
                      </span>
                    </div>
                    <div className="border-r-2 border-gray-200 flex-grow sm:w-40 sm:flex-none">
                      <span className="font-medium text-3xl sm:text-4xl">
                        {formatCash(data.raised[0].total_amount)}
                      </span>
                      <br />

                      <span>
                        <MessageComponent
                          messageKey={raisedKey}
                          defaultMessage={defaultHeaders[raisedKey]}
                        />
                      </span>
                    </div>
                    <div className="flex-grow sm:w-40 sm:flex-none">
                      <span className="font-medium text-3xl sm:text-4xl">
                        {data.donations}
                      </span>
                      <br />

                      <span>
                        <MessageComponent
                          messageKey={donationKey}
                          defaultMessage={defaultHeaders[donationKey]}
                        />
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img src={help} width="550" height="400" alt="charitable help" />
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroSection;
