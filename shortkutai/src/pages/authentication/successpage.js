import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

// helper functions
async function getCustomTokenFromServer(IdToken) {
  const requestHeaders = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Authorization", IdToken);
  try {
    let serverSideResponse = (
      await fetch("/api/getCustomToken", {
        method: "GET",
        headers: requestHeaders,
      })
    )
    let serverSideResponseJson = await serverSideResponse.json(); // both are async, so can't directly use .json() in one line
    console.log("serverSideResponseJson", serverSideResponseJson);
    const userInfoToken = serverSideResponseJson.data.userInfoDecodedToken; 
    const customJwtToken = serverSideResponseJson.data.customToken; // JWT token
    console.log("userInfoToken in getCustomTokenFromServer: ", userInfoToken);
    return {
      userInfoToken: userInfoToken,
      customJwtToken: customJwtToken,
    }
  } catch (error) {
    alert("Error getting custom token from server", error)
    throw new Error(error);
  }
  
}

function setCustomTokenInURL(userInfoToken, customJwtToken) {
  const urlParams = new URLSearchParams(window.location.search);

  // if (userInfoToken.name && userInfoToken.picture) {
  //   urlParams.set("name", userInfoToken.name);
  //   urlParams.set("picture", userInfoToken.picture);
  // }
  urlParams.set("email", userInfoToken.email);
  urlParams.set("uid", userInfoToken.uid);

  urlParams.set("custom_token", customJwtToken);

  window.location.search = urlParams.toString();
}

// const token = getCustomTokenFromQS();
export async function customTokenInit(IdToken) {
  // get custom jwt token from server
  const { userInfoToken, customJwtToken } = await getCustomTokenFromServer(IdToken);
  // add it to the query string params
  setCustomTokenInURL(userInfoToken, customJwtToken);
}

// customTokenInit();

// ui component
const SuccessPage = () => {
  return (
    <>
      <div className="w-full min-h-screen  flex flex-col">
        <Header showOptions={false} />
        <div className="flex items-center flex-col grow justify-center">
          <p className="text-2xl font-bold">Authentication success !!!</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SuccessPage;
