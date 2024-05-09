/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { BsTwitter } from "react-icons/bs";

const Header = ({ showOptions = true }) => {
  return (
    <div className={"w-full " + (showOptions ? "py-6" : "pt-6 pb-0")}>
      <div className="lg:absolute lg:top-3 right-3  max-lg:flex items-center justify-center max-lg:mb-6">
        <a
          href="https://www.producthunt.com/posts/shortkut-for-chrome?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-shortkut&#0045;for&#0045;chrome"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=397327&theme=light"
            alt="Shortkut&#0032;for&#0032;Chrome - Create&#0032;AI&#0032;powered&#0032;snippets&#0032;and&#0032;invoke&#0032;them&#0032;on&#0032;any&#0032;input&#0032;box&#0046; | Product Hunt"
            // style="width: 250px; height: 54px;"
            width="250"
            height="54"
          />
        </a>
      </div>
      <a
        href="/"
        className={
          "flex items-center  space-x-2 mx-auto w-max max-sm:py-0  " +
          (showOptions ? "md:hidden sm:pb-6 " : "block")
        }
      >
        <img src={"/icons/logo.png"} alt="" className="h-10" />
        <p className="text-black font-semibold text-[20px] capitalize">
          shortkut AI
        </p>
      </a>
      <div
        className={
          "text-[18px]   " + (showOptions ? "max-sm:hidden" : "hidden")
        }
      >
        <div className="xl:w-[35%] md:w-[50%] sm:w-[80%] mx-auto flex items-center justify-between relative">
          <a
            href="/"
            className="flex items-center max-md:hidden absolute left-0 space-x-2 -translate-x-full xl:pr-20 md:px-16 sm:px-12"
          >
            <img src={"/icons/logo.png"} alt="" className="h-10" />
            <p className="text-black font-semibold text-[20px]  capitalize">
              shortkut AI
            </p>
          </a>
          <a
            href="#features"
            className="font-medium text-gray-500 hover:text-gray-900 no-underline"
          >
            Features
          </a>
          <a
            href="#about"
            className="font-medium text-gray-500 hover:text-gray-900 no-underline"
          >
            About
          </a>
          <a
            href="#faq"
            className="font-medium text-gray-500 hover:text-gray-900 no-underline"
          >
            FAQ
          </a>
          <Link
            href={`https://www.notion.so/metametamate/Getting-Started-with-ShortkutAI-in-3-steps-96bb3362e0b3474d9cf6c618745a8ace`}
            rel="noreferrer"
            target={"_blank"}
            className="font-medium text-gray-500 hover:text-gray-900 no-underline"
          >
            Manual
          </Link>
          <a
            onClick={() => toast("Coming soon")}
            className="font-medium text-gray-500 hover:text-gray-900 no-underline flex items-center"
          >
            Enterprise Plans
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
