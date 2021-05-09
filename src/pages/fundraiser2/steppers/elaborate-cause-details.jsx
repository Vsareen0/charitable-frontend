import React from "react";
import { Field } from "@progress/kendo-react-form";
import FloatingInput from "../../../components/form/FloatingInput";
import { requiredValidator } from "../../../validators/index";
import { Upload } from "../../../components/form/Upload";
import { authenticationService } from "../../../_services/authentication.service";

const onBeforeUpload = (event) => {
  event.additionalData.description = "File upload";
  event.headers["Content-Type"] = "multipart/form-data";

  event.headers["user_name"] = authenticationService.currentUserValue.username;
  console.log("bu: ", event);
};

export const ElaborateCauseDetails = (
  <div className="container mx-auto">
    <div className="m-12">
      <Field
        id={"image"}
        name={"image"}
        label={""}
        component={Upload}
        withCredentials={false}
        onBeforeUpload={onBeforeUpload}
        autoUpload={true}
        saveUrl={`http://localhost:8000/api/v1/events/upload/images/`}
      />
      <Field
        id={"city"}
        name={"city"}
        label={"City"}
        component={FloatingInput}
        type="text"
        className="mr-1"
      />

      <Field
        id={"state"}
        name={"state"}
        label={"State"}
        component={FloatingInput}
        type="text"
      />

      <Field
        id={"country"}
        name={"country"}
        label={"Country"}
        component={FloatingInput}
        type="text"
      />

      <Field
        id={"postal_code"}
        name={"postal_code"}
        label={"Post Code"}
        component={FloatingInput}
        type="text"
      />
    </div>
  </div>
);
