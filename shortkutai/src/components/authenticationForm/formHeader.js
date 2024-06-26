import { Link } from "next/link";

const FormHeader = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-center"></div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {"heading"}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-5">
        {" paragraph"}
        <Link href="#">
          <a className="font-medium text-purple-600 hover:text-purple-500">
            {"linkName"}
          </a>
        </Link>
      </p>
    </div>
  );
};

export default FormHeader;
