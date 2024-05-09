import { useState } from "react";
import { loginFields } from "./formConstants";
import Input from "./input";
import FormSubmit from "./formSubmit";
import { login } from "../../../auth/handleAuth";
import { useRouter } from "next/router";
import { customTokenInit } from "@/pages/authentication/successpage";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Login = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    console.log("entered handle change");
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    alert("entered handle submit")
    e.preventDefault();
    handleLogin();
  };
  const handleLogin = async () => {
    console.log("entered handle login")
    const userEmail = loginState["email-address"];
    const userPassword = loginState["password"];
    console.log("userEmail", userEmail);
    console.log("password", userPassword);
    alert(`userEmail ${userEmail} \n password ${userPassword}`);
    try {
      const IdToken = await login(userEmail, userPassword);
      alert(`IdToken from login.js ${IdToken}`);
      console.log("got IdToken", IdToken);
      if (IdToken) {
        router.push("/authentication/successpage")
        // passes IdToken for initiating creating custom jwt token & appending to url
        customTokenInit(IdToken);
      }
    } catch (error) {
      console.log("login error \n", error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormSubmit handleSubmit={handleSubmit} text="Login" />
    </form>
  );
};

export default Login;
