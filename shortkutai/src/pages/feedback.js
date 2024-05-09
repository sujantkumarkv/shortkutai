import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const Feedback = () => {
  return (
    <>
      <div className="w-full min-h-screen  flex flex-col">
        <Header showOptions={false} />
        <div className="flex items-center flex-col grow justify-center">
          <p className="text-2xl font-bold">Feedback</p>
          <form
            className="flex flex-col items-center space-y-6 md:w-[30rem] sm:w-[25rem] w-[18rem]"
            action="https://api.web3forms.com/submit"
            method="POST"
          >
            <input
              type="hidden"
              name="access_key"
              value="573b3602-c320-4b98-9e45-833eae9180f8
"
            />

            <input
              className="border rounded-md px-3 py-3 w-full border-greyLight"
              type="text"
              placeholder="Full Name"
              name="name"
              required
            />
            <input
              className="border rounded-md px-3 py-3 w-full border-greyLight"
              type="email"
              placeholder="Email Address"
              name="email"
              required
            />
            <textarea
              className="border rounded-md px-3 py-3 w-full border-greyLight"
              name="message"
              placeholder="Your Message"
              required
            ></textarea>
            <input
              type="hidden"
              name="redirect"
              value="https://web3forms.com/success"
            />

            <button
              className="w-full rounded-md text-white bg-black p-3 font-light"
              type="submit"
            >
              Submit Form
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Feedback;
