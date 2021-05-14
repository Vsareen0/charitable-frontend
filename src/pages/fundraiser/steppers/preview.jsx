import { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

// const { name, email, phone } = data.basic_details;
// const { name: cause_name, cause_type, description } = data.cause_details;
// const {
//   amount,
//   city,
//   state,
//   country,
//   postal_code,
// } = data.elaborate_cause_details;

// const [visibleDialog, setVisibleDialog] = useState(false);
export const Preview = (
  <>
    <div className="mt-12 sm:m-12">
      <div className="flex flex-col">
        <h2 className="leading-8 text-2xl font-bold mb-8">Basic Details</h2>
        <div className="mt-2">
          <span className="font-semibold text-lg">Created By - </span>
          <span className="text-sm">{"name"}</span>
        </div>
        <div className="mt-2">
          <span className="font-semibold text-lg">Email - </span>
          <span className="text-sm">{"email"}</span>
        </div>
        <div className="mt-2">
          <span className="font-semibold text-lg">Phone - </span>
          <span className="text-sm">{"phone"}</span>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <h2 className="leading-8 text-2xl font-bold my-8">Cause Details</h2>
        <div className="mt-2">
          <span className="font-semibold text-lg">Cause Name - </span>
          <span className="text-sm">{"cause_name"}</span>
        </div>
        <div className="mt-2">
          <span className="font-semibold text-lg">Cause type - </span>
          <span className="text-sm">{"cause_type"}</span>
        </div>
        <div className="mt-2">
          <span className="font-semibold text-lg">Cause Description - </span>
          <span className="text-sm">{"description"}</span>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <h2 className="leading-8 text-2xl font-bold my-8">More Details</h2>

        <div>
          <span className="font-semibold text-lg">Target Amount - </span>
          <span className="text-sm">{"amount"}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <span className="font-semibold text-lg">City - </span>
          <span className="text-sm">{"city"}</span>
        </div>
        <div>
          <span className="font-semibold text-lg">State - </span>
          <span className="text-sm">{"state"}</span>
        </div>
        <div>
          <span className="font-semibold text-lg">Country - </span>
          <span className="text-sm">{"country"}</span>
        </div>
        <div>
          <span className="font-semibold text-lg">Post Code - </span>
          <span className="text-sm">{"postal_code"}</span>
        </div>
      </div>
      {/* {visibleDialog && (
        <Dialog
          title={"Please confirm"}
          onClose={() => setVisibleDialog(false)}
        >
          <p style={{ margin: "25px", textAlign: "center" }}>
            Are you sure you want to continue?
          </p>
          <DialogActionsBar>
            <button
              className="p-2 rounded-md hover:bg-gray-200 bg-gray-100 text-black flex flex-1 justify-center"
              onClick={() => setVisibleDialog(false)}
            >
              No
            </button>
            <button
              className="p-2 rounded-md hover:bg-gray-200 bg-gray-100 text-black flex flex-1 justify-center"
              onClick={() => {
                setVisibleDialog(false);
                handlePreviewSubmit();
              }}
            >
              Yes
            </button>
          </DialogActionsBar>
        </Dialog>
      )} */}
    </div>
  </>
);
