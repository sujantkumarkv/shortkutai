import Header from "@/components/header";
import React from "react";

const RefundPolicy = () => {
  return (
    <div>
      <Header showOptions={false} />
      <div className="xl:w-4/6 sm:w-5/6 w-10/12 mx-auto sm:pt-14  ">
        <h1 className="font-semibold text-2xl my-10">
          Terms & Conditions for Shorkut AI Chrome Extension
        </h1>
        <p className="font-semibold pb-3">Effective date: May 6, 2023</p>

        <div className="flex space-y-4 flex-col">
          <p>
            1. Acceptance of Terms: Clearly state that by using your SaaS
            product, users agree to be bound by the terms and conditions
            outlined.
          </p>
          <p>
            2. Payment Gateway Verification: Describe the purpose of the payment
            gateway verification process within your SaaS product, explaining
            that it is necessary to ensure secure and reliable payment
            transactions.
          </p>
          <p>
            3. User Responsibilities: Specify the responsibilities of users in
            providing accurate and valid information during the payment gateway
            verification process. Highlight that any fraudulent or misleading
            information may lead to account suspension or termination.
          </p>
          <p>
            4.Data Protection and Privacy: Explain how user data will be handled
            during the payment gateway verification process, ensuring compliance
            with relevant data protection and privacy laws. Describe the
            measures in place to protect user data and outline your data
            retention policies.
          </p>
          <p>
            5.Limitations of Liability: Limit your liability for any damages or
            losses incurred by users during the KYC process. Clarify that POCOAI
            is not responsible for any errors, inaccuracies, or discrepancies in
            the KYC verification process conducted by Razorpay.
          </p>
          <p>
            6.Intellectual Property: Specify ownership of intellectual property
            rights associated with the POCOAI application. Users should
            understand that they do not acquire any ownership rights to the
            application .
          </p>
          <p>
            7.Termination: Explain the conditions under which you may terminate
            or suspend a user s access to the POCOAI application, such as
            violation of terms, fraudulent activity, or non-compliance with KYC
            requirements. Outline the potential consequences of termination or
            suspension.
          </p>
          <p>
            8.Disclaimer: Include a disclaimer stating that POCOAI does not
            guarantee the successful completion of the KYC process or acceptance
            of the users KYC information by Razorpay. Clarify that POCOAI is an
            assisting tool and that the final decision lies with Razorpay.
          </p>
          <p>
            9. Governing Law and Jurisdiction: Specify the governing law and
            jurisdiction that will apply to any disputes arising from the use of
            the POCOAI application and the KYC process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
