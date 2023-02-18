import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generate = async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "Open API key not configured",
      },
    });
    return;
  }

  const text = req.body.text || ``;
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter valid text",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occured during your request.",
        },
      });
    }
  }
};

const questionSwitch =
  "The front of the flashcard should be in the form of a question.";
const topicSwitch =
  "The front of the flashcard should be the answer to the statement on the back.";
const suggestionSwitch =
  "Generate some (no more than 1 in 5) flashcards related to the topic, but not directly from the provided text.";

const generatePrompt = (text, format, useSuggestions) => {
  return `Given some unstructured text, return JSON representations of flashcards
    based on information in that text. ${
      format === "question" ? questionSwitch : topicSwitch
    } ${useSuggestions && suggestionSwitch} These flashcards are marked
    with "suggested: true". The number of flashcards generated should be sufficient to prepare 
    for an exam on the content present in the text. The JSON should follow the following format:

    [
        {
            ${useSuggestions && `"suggested": false`}
            "front": "Paris"
            "back": "The capital of France"
        },
        {
            ${useSuggestions && `"suggested": true`}
            "front": "London"
            "back": "The capital of Britain"
        }
    ]


    Text: ${text}
    `;
};

export default generate;
