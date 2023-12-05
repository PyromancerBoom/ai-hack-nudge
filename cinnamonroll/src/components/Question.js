import React, { useState } from "react";
import PromptGrader from "./PromptGrader";

const Question = ({
  originalText,
  question,
  index,
  handleButtonPress,
  isPressed,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col mt-8">
      <p className="text-3xl text-gray-300 font-bold">Question {question}</p>
      <PromptGrader OriginalText={originalText} Question={question} />
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
