import React from "react";

const AnswerInput = ({ setInputAnswer }) => {
  return (
    <div className="w-full max-w-[80vw] mx-auto">
      {/* <div className="flex items-center space-x-4">
        <label
          className="text-gray-200 text-3xl font-bold leading-none"
          htmlFor="textarea"
        >
          <p className="my-4 text-1xl">
            Enter your answer below to test your understanding{" "}
            <br />{" "}
          </p>
        </label>
        <span className="px-1 py-1 rounded text-gray-800 text-sm font-medium leading-none bg-orange-600">
          Required
        </span>
      </div> */}
      <div className="mt-4">
        <div className="w-full">
          <textarea
            className="w-full h-32 rounded bg-gray-300 p-4 text-lg font-medium resize-y text-gray-800 leading-none focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-100"
            name="textarea"
            id="textarea"
            placeholder="Enter Your Answer"
            onChange={(e) => setInputAnswer(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AnswerInput;
