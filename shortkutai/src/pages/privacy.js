import Header from "@/components/header";
import React, { useState } from "react";

const PrivacyPolicy = () => {
  return (
    <div>
      <Header showOptions={false} />
      <div className="xl:w-4/6 sm:w-5/6 w-10/12 mx-auto sm:pt-14 ">
        <h1 className="font-semibold text-2xl my-10">
          Privacy Policy for Shorkut AI Chrome Extension
        </h1>
        <p className="font-semibold">Effective date: May 6, 2023</p>
        <p className="my-4">
          At Shorkut AI, we are committed to protecting the privacy and security
          of our users. This Privacy Policy outlines the types of information we
          collect from users of our Chrome extension {'("Extension")'}, how we
          use it, and how we protect it. By using our Extension, you agree to
          the terms of this Privacy Policy.
        </p>
        <div className="flex space-y-4 flex-col">
          <p>1. Information We Collect</p>
          <p>We collect the following types of information from users:</p>
          <ul>
            <li>
              a. Personal Information: We do not collect any personally
              identifiable information such as name, email address, or phone
              number from our users.
            </li>
            <li>
              b. Usage Information: We collect information about how our
              Extension is used, such as the frequency and duration of usage,
              the pages viewed, and the actions taken within the Extension.
            </li>
            <li>
              c. Technical Information: We may collect technical information
              such as your {"device's"} IP address, browser type, and operating
              system.
            </li>
          </ul>
          <p>2. How We Use Your Information</p>
          <p>We use the information we collect to:</p>
          <ul>
            <li>a. Improve and enhance our Extension.</li>
            <li>
              b. Analyze user behavior and preferences to improve our products
              and services.
            </li>
            <li>c. Diagnose technical issues and provide support.</li>
          </ul>
          <p>3. How We Protect Your Information</p>
          <p>
            We take the security of our users information very seriously. We use
            industry-standard security measures to protect against the
            unauthorized access, disclosure, or destruction of user data.
          </p>
          <p>4. Third-Party Services</p>
          <p>
            We may use third-party services to help us analyze and improve our
            Extension. These third-party services may collect usage and
            technical information from users. We do not share any personally
            identifiable information with these third-party services.
          </p>
          <p>5. Changes to this Privacy Policy</p>
          <p>
            We reserve the right to update or modify this Privacy Policy at any
            time. If we make any material changes, we will notify users via
            email or by posting a notice on our website.
          </p>
          <p>6. Contact Us</p>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at support@shorkutai.com.
          </p>
        </div>

        <h2 className="py-10 font-semibold">
          By using our Extension, you acknowledge that you have read and
          understood this Privacy Policy and that you agree to the collection,
          use, and disclosure of your information as described herein.
        </h2>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
