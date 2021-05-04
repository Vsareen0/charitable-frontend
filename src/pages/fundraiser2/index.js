import React, { useEffect, useState } from "react";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Loader } from "@progress/kendo-react-indicators";
import { Notification } from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
// import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Stepper } from "@progress/kendo-react-layout";
import { BasicDetails } from "./steppers/basic-details";
import { CauseDetails } from "./steppers/cause-details";
import { ElaborateCauseDetails } from "./steppers/elaborate-cause-details";
import { Preview } from "./steppers/preview";
import Done from "./steppers/done";
import { create } from "../../_services/events";

const stepPages = [BasicDetails, CauseDetails, ElaborateCauseDetails, Preview];
const Fundraiser = () => {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const [step, setStep] = React.useState(0);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [formState, setFormState] = React.useState({});

  const [steps, setSteps] = React.useState([
    { label: "Basic Details", isValid: undefined },
    { label: "Cause Details", isValid: undefined },
    { label: "Elaborate Cause Details", isValid: undefined },
    { label: "Preview", isValid: undefined },
  ]);

  const lastStepIndex = steps.length - 1;
  const isLastStep = lastStepIndex === step;
  const isPreviousStepsValid =
    steps
      .slice(0, step)
      .findIndex((currentStep) => currentStep.isValid === false) === -1;

  const onStepSubmit = React.useCallback(
    (event) => {
      const { isValid, values } = event;

      const currentSteps = steps.map((currentStep, index) => ({
        ...currentStep,
        isValid: index === step ? isValid : currentStep.isValid,
      }));

      setSteps(currentSteps);
      setStep(() => Math.min(step + 1, lastStepIndex));
      setFormState(values);

      if (isLastStep && isPreviousStepsValid && isValid) {
        setLoading(true);
        setVisibleDialog(false);
        create(values)
          .then((res) => {
            if (res.status === 200) {
              setLoading(false);
              setComplete(true);
            }
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
      }
    },
    [
      step,
      steps,
      setSteps,
      setStep,
      setFormState,
      isLastStep,
      isPreviousStepsValid,
    ]
  );

  const onPrevClick = React.useCallback(
    (event) => {
      event.preventDefault();
      setStep(() => Math.max(step - 1, 0));
    },
    [step, setStep]
  );

  return (
    <div className="mt-12 w-full container mx-auto sm:m-12 sm:mx-auto sm:w-1/2">
      {complete && <Done />}

      {!complete && (
        <>
          <Stepper value={step} items={steps} />

          {loading && (
            <div className="z-100 flex justify-center">
              <Loader size="large" type={"converging-spinner"} />
            </div>
          )}

          <Form
            initialValues={formState}
            onSubmitClick={onStepSubmit}
            render={(formRenderProps) => (
              <div>
                <FormElement>
                  {stepPages[step]}

                  <span
                    style={{ marginTop: "40px" }}
                    className={"k-form-separator"}
                  />
                  <div
                    style={{
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                    className={"k-form-buttons k-buttons-end"}
                  >
                    <span style={{ alignSelf: "center" }}>
                      Step {step + 1} of {steps.length}
                    </span>
                    <div>
                      {step !== 0 ? (
                        <Button
                          style={{ marginRight: "16px" }}
                          onClick={onPrevClick}
                        >
                          Previous
                          <span className="k-icon k-i-arrow-left"></span>
                        </Button>
                      ) : undefined}
                      <Button
                        primary={true}
                        disabled={isLastStep ? !isPreviousStepsValid : false}
                        onClick={formRenderProps.onSubmit}
                      >
                        {isLastStep ? "Submit" : "Next"}
                        {!isLastStep && (
                          <span className="k-icon k-i-arrow-right"></span>
                        )}
                      </Button>
                    </div>
                  </div>
                </FormElement>

                <Fade enter={true} exit={true}>
                  {error && (
                    <Notification
                      type={{ style: "error", icon: true }}
                      closable={true}
                      onClose={() => setError(false)}
                    >
                      <span>Oops! Something went wrong ...</span>
                    </Notification>
                  )}
                </Fade>
              </div>
            )}
          />
        </>
      )}
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
              onClick={formRenderProps.onSubmit}
            >
              Yes
            </button>
          </DialogActionsBar>
        </Dialog>
      )} */}
    </div>
  );
};

export default Fundraiser;
