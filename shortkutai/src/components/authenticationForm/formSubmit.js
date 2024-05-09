const FormSubmit = ({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
}) => {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className="group relative w-full flex justify-center text-white bg-black font-light py-2 px-4 border border-transparent text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mt-10"
          onSubmit={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FormSubmit;
