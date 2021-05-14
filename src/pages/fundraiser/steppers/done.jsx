import { Link } from "react-router-dom";
import done from "../../../assets/done.svg";

const Done = () => {
  return (
    <>
      <div className="container mx-auto flex items-center flex-col">
        <img src={done} alt="Campaign Created" className="m-5 w-1/3" />
        <div className="m-16">
          <h1 className="leading-8 text-2xl font-semibold ">
            Great, You have successfully launched a campaign.
          </h1>
          <p className="text-base text-center mt-4">
            Let's head over to dashboard and view your campaigns.
          </p>
        </div>
        <Link to="/dashboard">
          <button type="button" className="k-button">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default Done;
