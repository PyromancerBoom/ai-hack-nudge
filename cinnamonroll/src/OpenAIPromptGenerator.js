import { useState } from "react";
import "./App.css";

// modify API_KEY accordingly
const API_KEY = "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"; // secure -> environment variable

function OpenAIPromptGenerator() {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState(""); // "Negative" or "Positive"

  /**
   * The function `callOpenAIAPI` makes a POST request to the OpenAI API to get an output of an input
   * prompt. It uses the `fetch` function to send the request and receives the response in JSON format.
   * The sentiment value is extracted from the response and stored in a variable called `sentiment`.
   */
  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");

    // For 0-10
    // What is the sentiment of this tweet with a value between 0 and 10 (10 being its very positive)?

    const APIBody = {
      model: "text-davinci-003",
      prompt: "What is the sentiment of this tweet? " + tweet, //input prompt here, other variables do not matter
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

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
        setSentiment(data.choices[0].text.trim()); // Extract first element in data.choices array
      });
  }

  console.log(tweet);
  return (
    <div className="App">
      <div>
        {/* Modify html textarea */}
        <textarea
          onChange={(e) => setTweet(e.target.value)}
          placeholder="Paste your tweet here!"
          cols={50}
          rows={10}
        />
      </div>
      <div>
        <button onClick={callOpenAIAPI}>
          Get The Tweet Sentiment From OpenAI API
        </button>
        {sentiment !== "" && <h3>This Tweet Is: {sentiment}</h3>}
      </div>
    </div>
  );
}

export default OpenAIPromptGenerator;
