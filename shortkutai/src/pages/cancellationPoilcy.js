import Header from "@/components/header";
import React from "react";

const CancellationPoilcy = () => {
  return (
    <div>
      <Header showOptions={false} />
      <div className="xl:w-4/6 sm:w-5/6 w-10/12 mx-auto sm:pt-14  ">
        <h1 className="font-semibold text-2xl my-10">
          Refunds and Cancellation Policy for Shorkut AI Chrome Extension
        </h1>
        <p className="font-semibold pb-3">Effective date: May 6, 2023</p>

        <div className="flex space-y-4 flex-col">
          <p>1. Refunds Policy</p>

          <ul>
            <li>
              a. Clearly state your policy regarding refunds for the services
              provided by POCOAI.
            </li>
            <li>
              b. Specify whether refunds are available for the KYC assistance
              service provided by POCOAI and under what circumstances.
            </li>
            <li>
              c. Define the process for requesting a refund, including any
              necessary documentation or information required from the user
            </li>
            <li>
              d.Outline any conditions or limitations on refunds, such as a time
              limit for refund requests or partial refund provisions.
            </li>
          </ul>
          <p>2. Cancellation Policy</p>
          <p>We use the information we collect to:</p>
          <ul>
            <li>
              a. Explain the procedure for canceling the POCOAI subscription or
              discontinuing the KYC assistance service
            </li>
            <li>
              b. State the users rights to cancel their subscription or
              terminate the service.
            </li>
            <li>
              c. Clarify any conditions or limitations on cancellations, such as
              notice periods or applicable fees.
            </li>
            <li>
              d.Specify the process for initiating a cancellation and any
              requirements, such as providing a written notice or submitting a
              cancellation request through the application.
            </li>
          </ul>
          <p>3. Non-Refundable Charges</p>
          <ul>
            <li>
              a. Clearly mention any charges or fees that are non-refundable,
              such as one-time setup fees or administrative charges.
            </li>
            <li>
              b. Provide transparency regarding any fees or charges that will
              not be refunded to users in case of cancellation or refund
              requests
            </li>
          </ul>
          <p>4.Termination</p>
          <ul>
            <li>
              a. Outline the conditions under which you may terminate the users
              access to POCOAI or the KYC assistance service, such as violation
              of terms, fraudulent activity, or non-compliance with KYC
              requirements.
            </li>
            <li>
              b. Describe the potential consequences of termination, including
              the forfeiture of any unused subscription or service fees
            </li>
          </ul>
          <p>5. Communication</p>
          <ul>
            <li>
              a.Provide instructions for users to contact your support team or
              customer service in case they have questions, concerns, or need
              assistance with refunds or cancellations.
            </li>
            <li>
              b.Specify the channels through which users can reach out for
              support, such as email, a support ticket system, or a dedicated
              customer support portal
            </li>
          </ul>
          <p>6. Dispute Resolution</p>
          <ul>
            <li>
              a.Specify the mechanisms for resolving any disputes that may arise
              regarding refunds, cancellations, or the terms and conditions of
              POCOAI.
            </li>
            <li>
              b.This may include mediation, arbitration, or other means of
              alternative dispute resolution.
            </li>
          </ul>
          <p>7.Amendments:</p>
          <ul>
            <li>
              a.State that you reserve the right to modify or update the refund
              and cancellation policy.
            </li>
            <li>
              b.Indicate that users will be notified of any changes to the
              policy through appropriate communication channels, such as email
              or notifications within the POCOAI application.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CancellationPoilcy;
