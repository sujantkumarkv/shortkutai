import { useState } from "react";
import { signupFields } from "./formConstants";
import FormSubmit from "./formSubmit";
import Input from "./input";
import { signup, authStateObserver } from "../../../auth/handleAuth";
import { useRouter } from "next/router";
import { customTokenInit } from "@/pages/authentication/successpage";

const fields = signupFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));


const Signup = () => {
  const router = useRouter();
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
    // console.log("signupstate", signupState)
  };

  // handle Signup API Integration here
  const createAccount = async () => {
    const userEmail = signupState["email-address"];
    const userPassword = signupState["password"];
    try {
      const IdToken = await signup(userEmail, userPassword);
      alert(`IdToken from signup.js ${IdToken}`)
      if(IdToken) {
        router.push("/authentication/successpage")
        // passes IdToken for initiating creating custom jwt token & appending to url
        customTokenInit(IdToken); 
      }
    } catch (error) {
      console.log("signup error\n", error);
      // alert(error)   
    }

  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormSubmit handleSubmit={handleSubmit} text="Create account" />
      </div>
    </form>
  );
};

export default Signup;


