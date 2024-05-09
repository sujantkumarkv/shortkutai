import Header from "@/components/header";
import React from "react";
import Footer from "../../components/footer";
import Login from "@/components/authenticationForm/login";
import FormHeader from "@/components/authenticationForm/formHeader";
import Signup from "@/components/authenticationForm/signup";
import { googleLogin } from "../../../auth/handleAuth";
import { customTokenInit } from "./successpage";
import { useRouter } from "next/router";

const GetStarted = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const token = await googleLogin();
      alert(`token from signup.js ${token}`);
      if (token) {
        router.push("/authentication/successpage");
        // passes IdToken for initiating creating custom jwt token & appending to url
        customTokenInit(token);
      }
    } catch (error) {
      console.log("signup error\n", error);
      alert(error)
    }
  };

  return (
    <>
      <Header showOptions={false} />

      <div className="flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8">
        <div className="my-8 text-center">
          ------- Login to your account -------
        </div>

        <div className="w-full space-y-8 flex flex-col items-center">
          <Login />
        </div>

        <div className="my-8 text-center">
          ------- OR, Create an account to get started !!! -------
        </div>
        <div className="my-8 text-center">
          <button onClick={handleGoogleLogin}> Continue with google</button>
        </div>

        <div className="w-full space-y-8 flex flex-col items-center">
          <Signup />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GetStarted;
