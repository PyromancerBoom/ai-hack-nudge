// New component for rating answers
import React, { useState } from "react";
import AnswerInput from "./AnswerInput"

// OpenAI API key
const API_KEY = "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"; // secure -> environment variable

/**
 * Renders the API response as a feedback text.
 *
 * @param {string} feedback - The feedback received from the API.
 * @returns {JSX.Element|null} The rendered feedback text or null if the API response is empty.
 */
function renderFeedBack(input) {
  if (input === "") {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-lg text-gray-300 mt-4">
        Here are your feedback:
      </h3>
      {input.split("\n").map((item, index) => (
        <p key={index} className="text-base text-gray-300 mt-2">
          {item}
        </p>
      ))}
    </div>
  );
}

function createFeedBack(InputAnswer) {
  return ( 
    " As a supportive and kind teacher, identify any misconceptions and clarify those mistakes from the following answer : " +
    InputAnswer 
  );
}

/**
 * The `PromptGrader` component is a React component that renders a text box input and a submit button.
 * When the submit button is clicked, the `RetrieveAnswer` function is called to make a POST request to the OpenAI API.
 * The response from the API is then rendered as a feedback text to the given answer.
 * @returns {JSX.Element} The rendered React component.
 *
 */
const PromptGrader = () => {
  const [InputAnswer, setInputAnswer] = useState("");
  const [feedback, setFeedBack] = useState("");

  /**
   * The function `RetrieveAnswer` makes a POST request to the OpenAI API to get an output of an input
   * prompt. It uses the `fetch` function to send the request and receives the response in JSON format.
   * The feedback is extracted from the response and stored in a variable called `feedback`.
   */
  async function RetrieveAnswer() {
    // console.log("Calling the OpenAI API");
    // might need to remove max token or else the last questions are cut
    const APIBody = {
      model: "text-davinci-003",
      prompt: createFeedBack(InputAnswer),
      max_tokens: 1000,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    // API call
    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data)
        setFeedBack(data.choices[0].text.trim()); // Extract first element in data.choices array
      });
  }
  return (
    <div className="">
      <div>
        <AnswerInput setInputAnswer={setInputAnswer} />
      </div>
      <div>
        <div className="py-4">
          <button
            onClick={RetrieveAnswer}
            className="rounded-lg px-3 py-0.5 border-1 border-gray-300 text-white bg-gray-900 hover:bg-gray-700 hover:text-white duration-300"
          >
            Test my Understanding ✅
          </button>
        </div>
        {renderFeedBack(feedback)}
      </div>
    </div>
  );
};





export default PromptGrader;
