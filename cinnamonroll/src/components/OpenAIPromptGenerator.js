require("dotenv").config();
import React, { useState } from "react";
import TextBoxInput from "./TextBoxInput";

// Bing Search V7 subscription key and endpoint
// gets both from .env file
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const endpoint = process.env.ENDPOINT;

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
        Okay we gotcha! Here are some recommendations:
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
    "Give me some specific recommendations to learn the following with free resources online:  " +
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

  async function callBingWebSearchAPI() {
    const query = createPrompt(userMessage);
    const mkt = "en-US";
    const params = { q: query, mkt: mkt };
    const headers = { "Ocp-Apim-Subscription-Key": subscriptionKey };

    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${endpoint}?${queryString}`;

      await fetch(url, { headers: headers })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setAIresponse(JSON.stringify(data)); // Update the AI response state with the received data
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  // console.log(userMessage);
  return (
    <div className="">
      <div>
        <TextBoxInput setUserMessage={setUserMessage} />
      </div>
      <div>
        <div className="py-4">
          <button
            onClick={callBingWebSearchAPI}
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
