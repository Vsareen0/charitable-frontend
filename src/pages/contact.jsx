import { Form, Field, FormElement } from "@progress/kendo-react-form";
import FloatingInput from "../components/form/FloatingInput";
import ContactImg from "../assets/contact_us.svg";
import { FloatingTextArea } from "../components/form/FloatingTextArea";

const Contact = () => {
  return (
    <>
      <h2 className="m-16 leading-6 text-2xl text-center font-semibold">
        Do you have a <ul className="inline text-charity">query</ul> ? We are
        all ears !
      </h2>
      <div className="container w-10/12 m-10 flex flex-col sm:flex-row">
        <div className="w-8/12">
          <img
            src={ContactImg}
            alt="Contact us Charitable"
            className="w-10/12 mt-10"
          />
        </div>
        <div className="w-4/12">
          <div className="m-5 sm:m-0">
            <Form
              onSubmit={(e) => console.log(e)}
              render={(formRenderProps) => (
                <FormElement>
                  <Field
                    id={"name"}
                    name={"name"}
                    label={"Name"}
                    component={FloatingInput}
                    type="name"
                    hint="Please enter your name"
                  />
                  <Field
                    id={"email"}
                    name={"email"}
                    label={"Email"}
                    component={FloatingInput}
                    type="email"
                    hint="Please enter your email address"
                  />
                  <Field
                    id={"message"}
                    name={"message"}
                    label={"Message"}
                    component={FloatingTextArea}
                    type="textbox"
                  />
                  <div className="k-form-buttons">
                    <button
                      type={"submit"}
                      className="k-button"
                      disabled={!formRenderProps.allowSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </FormElement>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
