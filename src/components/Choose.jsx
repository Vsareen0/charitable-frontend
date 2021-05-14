import * as React from "react";
import { authenticationService } from "../_services/authentication.service";

let locale = authenticationService.currentLocaleValue;

export const Chooser = (props) => (
  <div className="col-xs-12 col-sm-12 example-col">
    <label>
      {/* {props.label}: */}
      <select
        style={{ width: 100, marginLeft: 10 }}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option, key) => (
          <option
            key={key}
            value={option}
            selected={option.toLowerCase() === locale.toLowerCase()}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  </div>
);
