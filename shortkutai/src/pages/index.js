/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer";
import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import { BsBookmark, BsDownload } from "react-icons/bs";
import { MdFingerprint } from "react-icons/md";
import { HiOutlineDocument } from "react-icons/hi";
import { AiOutlineTeam } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

const HomePage = () => {
  const [vercelFix, setvercelFix] = useState(true);
  const mainText = "text-[20px] font-[400] text-gray-500";

  async function downloadFile() {
    const element = document.createElement("a");
    element.href = URL.createObjectURL("/build.crx");
    element.download = "build.crx";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setvercelFix(false);
    }
  }, []);

  return (
    !vercelFix && (
      <>
        <Header />
        <Toaster />
        <div className="sm:pt-14  ">
          <div className="text-[35px] text-center leading-8 sm:text-[55px] text-black font-[900]  px-4 sm:leading-tight sm:pb-4">
            Discover a <span className="text-yel-500">Faster</span> Way to Work
          </div>
          <div className={`py-3 ${mainText} text-center`}>
            <div className="w-full text-light  max-sm:px-3 text-lg sm:w-[60%] mx-auto sm:pb-8 sm:pt-5">
              Create AI powered snippets and invoke them on any input box on the
              internet.
            </div>
          </div>
          <div className="flex flex-col space-y-3 items-center justify-center">
            <div className="py-6 sm:flex items-center justify-center  text-center max-sm:px-3 ">
              <a
                href={
                  "https://chrome.google.com/webstore/detail/shortkut/kgmbdgafeheljngobiflcjfmhpmklncg?hl=en&authuser=0"
                }
                target="_blank"
                // onClick={downloadFile}
                rel="noreferrer"
                className="bg-yel-100 hover:bg-yel-500 text-white  text-#2C3439 items-center justify-center max-sm:w-full px-10 py-4 rounded-md flex  text-[20px]"
              >
                <BsDownload className="pr-2 text-[26px] font-[500]" />{" "}
                <span className="underline underline-offset-2 font-[500] text-center items-center justify-center ">
                  Install on Chrome
                </span>
              </a>
              <button
                onClick={() => toast("Coming soon")}
                className="flex-none space-y-8 bg-white text-black px-10 py-4 rounded-md   items-center text-[18px]"
              >
                <span className="  underline underline-offset-2  hover:text-yel-100 text-light font-[500] items-center ">
                  Other Browsers
                </span>
              </button>
            </div>
            {/* <a
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
            </a> */}
          </div>
          <div className="py-5 xl:pb-32 lg:pb-28 md:pb-24 pb-20  text-grey max-sm:px-3 text-[18px] text-center">
            Free while in beta,{" "}
            <span className="underline underline-offset-2 text-yel-500">
              paid subscription
            </span>{" "}
            after v1.0
          </div>
          <div className="max-sm:px-3 py-6 md:py-14 bg-gradient-to-br from-yel-50 to-yel-100 text-grey overflow-hidden text-[22px] font-[500] sm:pb-2">
            <div className="w-full text-lg lg:pt-2 sm:w-[60%] mx-auto text-center">
              As a support engineer I cut my workload in half. Dont get left
              behind - join the shortcut revolution with Shortkut.ai.
              <br></br>
              <span className="text-black underline underline-offset-2">
                @John Doe, Acm
              </span>
            </div>
          </div>
          <div
            id="features"
            className="flex-col  md:items-center max-sm:px-3 px-14 sm:flex lg:flex-row  xl:py-32 lg:py-28 md:py-24 py-20 lg:mx-20 justify-center items-center "
          >
            <div className="flex flex-col  sm:w-[50%] md:w-[50%] justify-center mx-6 ">
              <div className="text-[26px] text-3xl font-[600]">
                Productivity Compounder
              </div>
              <div className={`pt-4 pb-4 text-lg ${mainText}`}>
                Templatize emails, posts & promotional texts to work 30x faster.
              </div>
              <div className="py-4 flex flex-col space-y-8">
                {/* <div className="flex">
                  <button className="px-5 h-14 rounded-md bg-orange-400 flex items-center justify-center">
                    <BsBookmark className="text-white font-[700]" />
                  </button>
                  <div className="pl-4">
                    <div className="text-[20px] text-lg font-[500]">
                      And no more hopping around bookmarks
                    </div>
                    <div className={`pt-2 text-light text-base ${mainText}`}>
                      Use shortkuts to store all important links
                    </div>
                  </div>
                </div> */}
                <div className="flex">
                  <button className="px-5 h-14 rounded-md bg-orange-400 flex items-center justify-center">
                    <MdFingerprint className="text-white font-[700]" />
                  </button>
                  <div className="pl-4">
                    <div className="text-[20px] text-lg font-[500]">
                      Power of GPT at your fingertips
                    </div>
                    <div className={`pt-2 text-light text-base ${mainText}`}>
                      Invoke LLM powered shortkuts on any input box on the
                      internet.
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <button className="px-5 h-14 rounded-md bg-orange-400 flex items-center justify-center">
                    <HiOutlineDocument className="text-white font-[700]" />
                  </button>
                  <div className="pl-4">
                    <div className="text-[20px] text-lg font-[500]">
                      Create templates for frequent messages using snippets
                    </div>
                    <div className={`pt-2 text-light text-base ${mainText}`}>
                      Create, manage and share shortkuts
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <button className="px-5 h-14 rounded-md bg-orange-400 flex items-center justify-center">
                    <AiOutlineTeam className="text-white font-[700]" />
                  </button>
                  <div className="pl-4">
                    <div className="text-[20px] text-lg font-[500]">
                      Invite your team
                    </div>
                    <div className={`pt-2 text-light text-base ${mainText}`}>
                      Create and share shortkuts private to your team. Coming
                      soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex md:ml-8 relative mx-6   lg:w-[50%] lg:h-[35%] md:max-w-[75%] lg: max-sm:mt-5  sm:min-w-screen sm:min-h-min ">
              <img
                className="rounded-xl"
                src={"/icons/image02.gif"}
                alt="loading..."
              />
            </div>
          </div>

          <div id="about" className="bg-yellow text-grey  w-full">
            <div className="md:mx-2  sm:mx-40 mx-3 md:flex-row flex-col  sm:flex items-center text-lg font-[500]">
              <div className=" w-[100%] md:w-[50%] text-lg  md:border-r md:border-b-0 border-b p-8 border-grey  lg:py-20 lg:px-20">
                <p>
                  Shortkut is a game-changer! As a content creator, its become
                  my go-to tool for managing links and templates. I no longer
                  need multiple AI tools, Shortkut does it all. Thanks to
                  Shortkut, my life is a lot more simple!
                </p>
                <p className="text-sm mt-2 text-[rgb(229 231 235)]">
                  - John Jones
                </p>
              </div>
              <div className="w-[100%] md:w-[50%] text-lg  lg:py-20 lg:px-20 p-8">
                <p>
                  I dont know how I managed without Shortkut.ai. With just a few
                  clicks, I can access all the resources I need and respond to
                  customer queries in no time.
                </p>
                <p className="text-sm mt-2 text-[rgb(229 231 235)]">
                  - Alex Bell
                </p>
              </div>
            </div>
          </div>

          <div
            id="faq"
            className="p-2 md:px-32 text-lg sm:mx-4 mx-3 xl:py-32 lg:py-28 md:py-24 py-20"
          >
            <div className="text-[26px]  font-[500]  text-center ">
              Frequently asked questions
            </div>
            <div className="flex md:flex-row flex-col  justify-between pt-10 px-3">
              <div className="md:w-1/3 w-auto  ">
                <div className="text-[22px]  text-xl text-black font-[500]">
                  User Manual
                </div>
                <div className={`${mainText} text-base text-light pb-3 pt-2`}>
                  Creating shortkuts is easy, you can follow along the steps in
                  the manual to become a power shorkut user in no time. Link to
                  manual
                </div>
              </div>
              <div className="md:w-1/3 w-auto  ">
                <div className="text-[22px]  text-xl text-black font-[500]">
                  What browsers are supported?
                </div>
                <div className={`${mainText} text-light pt-2 pb-3 text-base`}>
                  Currently only Chrome is supported. Support for more browser
                  is coming soon.
                </div>
              </div>
              <div className="md:w-1/3 w-auto ">
                <div className="text-[22px]  text-xl text-black font-[500]">
                  Is it free?
                </div>
                <div className={`${mainText} pt-2 pb-3 text-light text-base`}>
                  Yes. All the current features of Shortkut are free. Paid
                  version and Enterprise plans coming soo
                </div>
              </div>
            </div>
          </div>
          <div className="  md:px-32  mx-3 sm:mx-4">
            <div className="text-[26px]  font-[500]  text-center ">
              Example Shortkuts
            </div>
            <img
              src={"/icons/example.jpeg"}
              alt=""
              className="xl:h-80 lg:h-64 md:h-56 sm:h-52  mx-auto"
            />
          </div>
          <div className=" px-8 flex-row md:items-center md:justify-center py-4 md:py-14 bg-gradient-to-tr from-yel-50 to-yel-100 text-gray-800 overflow-hidden text-[22px] font-[600]">
            <div className="flex md:flex-row flex-col items-center justify-center">
              <div className=" text-3xl  md:mr-10 font-[600] text-center md:text-left ">
                Ready to upgrade your Workspace?<br></br>
                <span className="font-[800]">Get Shortkut today.</span>
              </div>
              <div className=" flex flex-col md:flex-row mt-5 md:mt-0 items-center  justify-center sm:justify-start text-center  ">
                <Link
                  href={
                    "https://chrome.google.com/webstore/detail/shortkut/kgmbdgafeheljngobiflcjfmhpmklncg?hl=en&authuser=0"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="max-sm:w-full p-3 px-8 justify-center bg-yel-100 hover:bg-yel-500 text-white sm:px-6 max-sm:my-1  rounded-md flex items-center text-[20px]"
                >
                  <BsDownload className="md:text-[18px] text-[20px]  font-[700]" />{" "}
                  <span className="items-center justify-center text-[18px] ml-2 underline underline-offset-2 font-[400]">
                    Install on Chrome
                  </span>
                </Link>
                <button
                  onClick={() => toast("Coming soon")}
                  className="justify-center max-sm:w-full sm:ml-3   px-10 py-2 rounded-md flex items-center text-[16px]"
                >
                  <p className="flex-none items-center  justify-center text-grey hover:text-black underline underline-offset-2  font-[500]">
                    Other Browsers
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default HomePage;
