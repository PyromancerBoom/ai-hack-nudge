import createPrompt from "./createPrompt";
const subscriptionKey = process.env.REACT_APP_BING_SEARCH_KEY;
const endpoint = process.env.REACT_APP_BING_SEARCH_URL;

// Async version
const get_Bing_Search = async (text_input) => {
  if (text_input === "") {
    return [];
  }
  const createBingPrompt = (text_input) => {
    const promptMessage =
      "Give me some specific recommendations to learn the following with free resources online:  ";
    return createPrompt(promptMessage, text_input);
  };

  console.log(text_input);

  console.log("Calling the Bing Web Search API endpoint...");
  const query = createBingPrompt(text_input);
  const mkt = "en-US";
  const params = { q: query, mkt: mkt };
  const headers = { "Ocp-Apim-Subscription-Key": subscriptionKey };

  let websites = [];

  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${endpoint}?${queryString}`;

    console.log(url);

    await fetch(url, { headers: headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        websites = data.webPages.value;
        console.log(websites);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    throw error;
  } finally {
    return websites;
  }
};

export default get_Bing_Search;
