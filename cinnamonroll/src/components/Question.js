import React, { useState } from "react";
import PromptGrader from "./PromptGrader";

const Question = ({ question, index, handleButtonPress, isPressed }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col mt-4">
      <h3 className="text-lg text-gray-300">Question {question}</h3>
      <PromptGrader />
      <button
        onClick={() => handleButtonPress(index)}
        className={`rounded-lg px-3 py-0.5 border-1 border-gray-300 text-white ${
          isPressed ? "bg-green-500" : "bg-gray-900"
        } hover:bg-gray-700 hover:text-white duration-300`}
      >
        {isPressed ? "Done!" : "Satisfied?"}
      </button>
    </div>
  );
};

export default Question;
