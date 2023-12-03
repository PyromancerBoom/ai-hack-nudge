import React from "react";

const TextBoxInput = () => {
  return (
    <div className="w-full max-w-[80vw] mx-auto">
      <div className="flex items-center space-x-4">
        <label
          className="text-gray-300 text-3xl font-bold leading-none"
          htmlFor="textarea"
        >
          Textarea title
        </label>
        <span className="px-2 py-1 rounded text-gray-300 text-sm font-medium leading-none bg-orange-600">
          Required
        </span>
      </div>
      <div className="mt-4">
        <div className="w-full">
          <textarea
            className="w-full h-48 rounded bg-gray-300 p-4 text-lg font-medium resize-y"
            name="textarea"
            id="textarea"
            placeholder="Enter message"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default TextBoxInput;
