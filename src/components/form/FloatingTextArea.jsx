import { TextArea } from "@progress/kendo-react-inputs";
import { Error, Hint, FloatingLabel } from "@progress/kendo-react-labels";
import { FieldWrapper } from "@progress/kendo-react-form";

export const FloatingTextArea = (fieldRenderProps) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    type,
    optional,
    max,
    value,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hindId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  return (
    <FieldWrapper>
      <FloatingLabel
        label={label}
        editorValue={value}
        editorValid={valid}
        editorId={id}
      >
        <div className={"k-form-field-wrap"}>
          <TextArea
            valid={valid}
            type={type}
            id={id}
            disabled={disabled}
            maxlength={max}
            rows={7}
            ariaDescribedBy={`${hindId} ${errorId}`}
            {...others}
          />
          {showHint && <Hint id={hindId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FloatingLabel>
    </FieldWrapper>
  );
};
