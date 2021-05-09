import React from "react";
import { Field } from "@progress/kendo-react-form";
import FloatingInput from "../../../components/form/FloatingInput";
import { Editor } from "../../../components/form/Editor";
import { RadioGroup } from "../../../components/form/RadioGroup";
import { nameValidator, requiredValidator } from "../../../validators";

const data = [
  { label: "Medical", value: "medical" },
  { label: "Education", value: "education" },
  { label: "Memorial", value: "memorial" },
  { label: "Others", value: "others" },
];

export const CauseDetails = (
  <div className="container mx-auto">
    <div className="m-12">
      <Field
        id={"cause_name"}
        name={"cause_name"}
        label={"Cause Name"}
        component={FloatingInput}
        type="text"
        validator={requiredValidator}
      />
      <Field
        id={"cause_type"}
        name={"cause_type"}
        label={"What is the cause ?"}
        data={data}
        layout={"horizontal"}
        component={RadioGroup}
        validator={requiredValidator}
      />
      <Field
        id={"target_price"}
        name={"target_price"}
        label={"What is the targeted amount ?"}
        type="number"
        component={FloatingInput}
        validator={requiredValidator}
      />
      <Field
        id={"description"}
        name={"description"}
        type="text"
        component={Editor}
        validator={requiredValidator}
      />
    </div>
  </div>
);
