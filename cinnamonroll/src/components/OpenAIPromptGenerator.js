import React, { useState } from "react";
import TextBoxInput from "./TextBoxInput";
import Question from "./Question";

// OpenAI API key
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // secure -> environment variable

// /**
//  * Renders the API response as a list of questions.
//  *
//  * @param {string} apiResponse - The response received from the API.
//  * @returns {JSX.Element|null} The rendered list of questions or null if the API response is empty.
//  */
// function renderAPIResponse(apiResponse) {
//   if (apiResponse === "") {
//     return null;
//   }

//   return (
//     <div className="flex flex-col">
//       <h3 className="text-lg text-gray-300 mt-4">
//         Okay we gotcha! Here are some questions:
//       </h3>
//       {apiResponse.split("\n").map((item, index) => (
//         <p key={index} className="text-base text-gray-300 mt-2">
//           {item}
//         </p>
//       ))}
//     </div>
//   );
// }

function createPrompt(userMessage) {
  return (
    "make sure you only include questions and that each question is complete (always include ?) with no numbering" +
    "Try to minimize the number of questions to cover the topic, if it needs more than 5 questions, limit it to 5 if not just provide how many needed" +
    " As a teacher to a student , Ask questions to test understanding about following input : " +
    userMessage
  );
}

/**
 * The `OpenAIPromptGenerator` component is a React component that renders a text box input and a submit button.
 * When the submit button is clicked, the `callOpenAIAPI` function is called to make a POST request to the OpenAI API.
 * The response from the API is then rendered as a list of questions.
 * @returns {JSX.Element} The rendered React component.
 *
 */
const OpenAIPromptGenerator = () => {
  const [userMessage, setUserMessage] = useState("");
  const [, setAIresponseString] = useState("");
  const [aiResponseArray, setAIresponseArray] = useState([]);
  const [humanTextArray, setHumanTextArray] = useState(
    new Array(aiResponseArray.length)
  );
  const [pressedQuestions, setPressedQuestions] = useState(
    new Array(aiResponseArray.length).fill(false)
  );
  const [pressedN, setPressedN] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonPress = (index) => {
    const updatedPressedQuestions = [...pressedQuestions];
    updatedPressedQuestions[index] = !updatedPressedQuestions[index];
    setPressedQuestions(updatedPressedQuestions);

    const updatedHumanTextArray = [...humanTextArray];
    updatedHumanTextArray[index] = aiResponseArray[index];
    setHumanTextArray(updatedHumanTextArray);

    if (updatedPressedQuestions[index]) {
      setPressedN(pressedN + 1);
    } else {
      setPressedN(pressedN - 1);
    }
  };

  /**
   * The function `callOpenAIAPI` makes a POST request to the OpenAI API to get an output of an input
   * prompt. It uses the `fetch` function to send the request and receives the response in JSON format.
   * The list of question is extracted from the response and stored in a variable called `aiResponse`.
   */
  async function callOpenAIAPI() {
    console.log(process.env);

    if (!userMessage || userMessage === "") {
      setErrorMessage("Cannot be empty!");
      return;
    }

    // console.log("Calling the OpenAI API");
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let returnedData = data.choices[0].text.trim(); // Extract first element in data.choices array
        console.log("this is the data", returnedData);
        let returnedDataArray = returnedData.split("\n");
        // returnedDataArray.pop();
        setAIresponseArray(returnedDataArray);
        console.log("returnedData " + aiResponseArray);
        setAIresponseString(returnedData);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  }
  return (
    <div className="">
      <div>
        <TextBoxInput setUserMessage={setUserMessage} />
        {errorMessage && <p className="text-base">{errorMessage}</p>}
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
        {aiResponseArray.map((question, index) => (
          <Question
            key={index}
            originalText={userMessage}
            question={question}
            index={index}
            handleButtonPress={handleButtonPress}
            isPressed={pressedQuestions[index]}
          />
        ))}
        {aiResponseArray.length !== 0 &&
          pressedN === aiResponseArray.length &&
          "You have satisfied all the questions!"}
        {/*allPressed && (
          <p className="text-base text-green-500 mt-4">
            All questions have been pressed!
          </p>
        )*/}
      </div>
    </div>
  );
};

export default OpenAIPromptGenerator;
