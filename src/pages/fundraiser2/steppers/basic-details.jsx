import React from "react";
import { Field } from "@progress/kendo-react-form";
import FloatingInput from "../../../components/form/FloatingInput";
import {
  emailValidator,
  nameValidator,
  phoneValidator,
} from "../../../validators";

export const BasicDetails = (
  <>
    <div className="container mx-auto ">
      <div className="m-12">
        <Field
          id={"name"}
          name={"name"}
          label={"Your Name"}
          type="text"
          component={FloatingInput}
          validator={nameValidator}
        />
        <Field
          id={"email"}
          name={"email"}
          label={"Email"}
          type="email"
          component={FloatingInput}
          validator={emailValidator}
        />
        <Field
          id={"phone"}
          name={"phone"}
          label={"Phone"}
          type="phone"
          component={FloatingInput}
          validator={phoneValidator}
        />
      </div>
    </div>
    <style>
      {` 
            .k-button {
                background-color: #fa5052;
            } 
           .k-button:focus {
                background-color: #ff6454;
           }
           .k-button.k-state-active {
                background-color: #ff1404;
           }
          `}
    </style>
  </>
);
