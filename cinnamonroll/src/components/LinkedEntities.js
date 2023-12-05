import {
  TextAnalysisClient,
  AzureKeyCredential,
} from "@azure/ai-language-text";

// Azure AI key
const key = process.env.REACT_APP_LINKED_ENTITIES_KEY;
const endpoint = process.env.REACT_APP_LINKED_ENTITIES_URL;

// Async version
const get_linked_entities = async (text_input) => {
  if (text_input === "") {
    return [];
  }

  console.log(text_input);

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));

  const results = await client.analyze("EntityLinking", [text_input]);

  let entities = results[0].entities;

  // let names = entities.map((entity) => entity.name);

  console.log(entities);

  return entities;
};

// Callback version
/*
    const get_linked_entities = (text_input, callback) => {
      console.log(text_input);
    
      const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));
    
      client
        .analyze("EntityLinking", [text_input])
        .then((results) => {
          console.log(results[0].entities);
          callback(results[0].entities);
        })
        .catch((err) => {
          console.error("Error:", err);
          callback(null);
        });
    };
    */

export default get_linked_entities;
