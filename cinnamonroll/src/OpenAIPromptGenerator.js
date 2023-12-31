import React, { useState } from "react";
import TextBoxInput from "./TextBoxInput";

// OpenAI API key
const API_KEY = "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"; // secure -> environment variable

/**
 * Renders the API response as a list of recommendations.
 *
 * @param {string} apiResponse - The response received from the API.
 * @returns {JSX.Element|null} The rendered list of recommendations or null if the API response is empty.
 */
function renderAPIResponse(apiResponse) {
  if (apiResponse === "") {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-lg text-gray-300 mt-4">
        Okay we gotcha! Here are some questions:
      </h3>
      {apiResponse.split("\n").map((item, index) => (
        <p key={index} className="text-base text-gray-300 mt-2">
          {item}
        </p>
      ))}
    </div>
  );
}

function createPrompt(userMessage) {
  return (
    "make sure you only include questions and that each question is complete (always include ?) with no numbering" + 
    "Try to minimize the number of questions to cover the topic, if it needs more than 10 questions, limit it to 10 if not just provide how many needed" +
    " As a teacher to a student , Ask many questions as possible to test understanding about follwing input : " +
    userMessage 
  );
}

/**
 * The `OpenAIPromptGenerator` component is a React component that renders a text box input and a submit button.
 * When the submit button is clicked, the `callOpenAIAPI` function is called to make a POST request to the OpenAI API.
 * The response from the API is then rendered as a list of recommendations.
 * @returns {JSX.Element} The rendered React component.
 *
 */
const OpenAIPromptGenerator = () => {
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAIresponse] = useState("");

  /**
   * The function `callOpenAIAPI` makes a POST request to the OpenAI API to get an output of an input
   * prompt. It uses the `fetch` function to send the request and receives the response in JSON format.
   * The sentiment value is extracted from the response and stored in a variable called `sentiment`.
   */
  async function callOpenAIAPI() {
    // console.log("Calling the OpenAI API");
    // might need to remove max token or else the last questions are cut
    const APIBody = {
      model: "text-davinci-003",
      prompt: createPrompt(userMessage),
      temperature: 0,
      max_tokens: 1000,
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
        setAIresponse(data.choices[0].text.trim()); // Extract first element in data.choices array
      });
  }
  return (
    <div className="">
      <div>
        <TextBoxInput setUserMessage={setUserMessage} />
      </div>
      <div>
        <div className="py-4">
          <button
            onClick={callOpenAIAPI}
            className="rounded-lg px-3 py-0.5 border-1 border-gray-300 text-white bg-gray-900 hover:bg-gray-700 hover:text-white duration-300"
          >
            Submit 🚀
          </button>
        </div>
        {renderAPIResponse(aiResponse)}
      </div>
    </div>
  );
};


export default OpenAIPromptGenerator;
