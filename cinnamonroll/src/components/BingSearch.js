const subscriptionKey = "73a6c82bd16b4c13b1de8c3bd24ae86f";
const endpoint = "https://api.bing.microsoft.com/v7.0/search";

// Async version
const get_Bing_Search = async (text_input) => {
  if (text_input === "") {
    return [];
  }
  const createPrompt = (text_input) => {
    return (
      "Give me some specific recommendations to learn the following with free resources online:  " +
      text_input
    );
  };

  console.log(text_input);

  console.log("Calling the Bing Web Search API endpoint...");
  const query = createPrompt(text_input);
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