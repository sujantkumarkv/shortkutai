// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { NextApiRequest, NextApiResponse } from "next";
import { authAdmin } from "../../../server/firebaseAdmin";

export default async function getCustomToken(req, res) {
  console.log("getCustomToken called with headers: ", req.headers);

  const jwtToken = req.headers.authorization;
  // console.log("jwtToken: ", jwtToken);

  // authAdmin.verifyIdToken(jwtToken)
  // .then((decodedToken) => {
  //   const uid = decodedToken.uid;
  //   console.log("uid: ", uid);
  // })
  try {
    
    const userInfoDecodedToken = await authAdmin.verifyIdToken(jwtToken);
    console.log("userInfoDecodedToken: ", userInfoDecodedToken)
    const uid = userInfoDecodedToken.uid;
    if (!uid) {
      console.log("uid doesn't exist");
      return res.status(400).json({ error: "Invalid token" });
    }

    const customToken = await authAdmin.createCustomToken(uid);
    console.log("customToken: ", customToken);
    res.status(200).json({
      data: {
        userInfoDecodedToken: userInfoDecodedToken,
        customToken: customToken,
      },
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(400).json({ error: "Invalid token" });
  }

  /**
   * console.log("res's customToken from data:", res.data.customToken)
   * tried this but its wrong, why? because,
   * Accessing res.data.customToken: In your server-side function, 
   * res is a server response object, and it doesn't have a property named data. 
   * The data property is part of the response body, which is sent to the client 
   * when you call res.json(). In other words, the data property is not directly 
   * accessible on the res object on the server side. 
   * That's why res.data.customToken is undefined.
   */
  /**
   * "The message API handler should not return a value, received object."
   * in your console is coming from the Next.js server-side code. In Next.js, 
   * the handler function for an API route should not return a value. It should 
   * instead use the res object to send a response. So, you should remove the 
   * line return res; from your server-side code, as it's not needed and it's 
   * causing this error to appear in your console.
   */
  // return res;
}
