/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="text-[14px]  py-10  ">
        <div className="xl:w-[50%] md:w-[70%] sm:w-[80%] mx-auto px-8 max-sm:flex-col max-sm:space-y-1 flex items-center flex-wrap justify-between">
          <a
            href="mailto:founders@shortkut.ai"
            className="font-base text-light hover:text-grey no-underline"
          >
            Email
          </a>
          <a
            href="#about"
            className="font-medium text-light hover:text-grey no-underline"
          >
            About
          </a>
          <a
            href="#faq"
            className="font-medium text-light hover:text-grey no-underline"
          >
            FAQ
          </a>
          {/* <a className="font-medium text-light hover:text-grey no-underline">
            Contact
          </a>
          <a className="font-medium text-light hover:text-grey no-underline flex items-center">
            Help
          </a> */}
          <div className="font-medium text-light hover:text-grey no-underline flex items-center">
            <Link href="/privacy">Privacy policy</Link>
          </div>
          <div className="font-medium text-light hover:text-grey no-underline flex items-center">
            <Link href="/feedback">Feedback</Link>
          </div>
          <div className="font-medium text-light hover:text-grey no-underline flex items-center">
            <Link href="/terms-conditions">Terms and Conditions</Link>
          </div>
          <div className="font-medium text-light hover:text-grey no-underline flex items-center">
            <Link href="/cancellationPoilcy">Cancellation Policy</Link>
          </div>
        </div>
        <div className="xl:w-[50%] pt-10 md:w-[70%] sm:w-[80%] mx-auto px-8 max-sm:flex-col max-sm:space-y-1 flex items-center flex-wrap justify-between">
          <div className="w-[60%] font-medium text-black hover:text-grey no-underline flex items-center">
            WeWork Berger Delhi One Address: Floor 19, C-001/A2, Sector 16B,
            Noida, Uttar Pradesh 201301
          </div>
          <div className="w-[40%] font-medium text-black hover:text-grey no-underline flex items-center justify-end">
            Email: saurav@shortkut.ai
            <br />
            Mobile: +19017299371
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
