// New component for rating answers
import React, { useState, useEffect } from "react";
import AnswerInput from "./AnswerInput";
import get_linked_entities from "./LinkedEntities";

// OpenAI API key
const API_KEY = "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"; // secure -> environment variable

/**
 * Renders the API response as a feedback text.
 *
 * @param {string} feedback - The feedback received from the API.
 * @returns {JSX.Element|null} The rendered feedback text or null if the API response is empty.
 */
function renderFeedBack(input, linked_entities) {
  if (input === "") {
    return null;
  }

  // Extract the 'name' fields from the linked_entities objects into an array of phrases
  const phrases = linked_entities.map((entity) => entity.name);

  // Create a regular expression that matches the linked entities exactly
  const regex = new RegExp(phrases.join("|"), "g");

  return (
    <div className="flex flex-col">
      <h3 className="text-lg text-gray-300 mt-4">Here are your feedback:</h3>
      {input.split("\n").map((item, index) => {
        let new_item = item.replace(regex, (match) => {
          // Find the entity object that matches the matched phrase
          const entity = linked_entities.find(
            (entity) => entity.name === match
          );
          // If the entity is not undefined, return an anchor tag with the URL and the matched phrase
          if (entity) {
            return `<a href="${entity.url}" target="_blank"><u>${match}</u></a>`;
          } else {
            // If the entity is undefined, return the matched phrase
            return match;
          }
        });
        return (
          <p
            key={index}
            className="text-base text-gray-300 mt-2"
            dangerouslySetInnerHTML={{ __html: new_item }}
          />
        );
      })}
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
  const [linkedEntities, setLinkedEntities] = useState([]);

  useEffect(() => {
    if (feedback === "") {
      return;
    }
    const fetchData = async () => {
      const result = await get_linked_entities(feedback);
      setLinkedEntities(result);
    };

    fetchData();
  }, [feedback]);

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
        console.log(data);
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
        {renderFeedBack(feedback, linkedEntities)}
      </div>
    </div>
  );
};

export default PromptGrader;
