import { Configuration, OpenAIApi } from "openai";
import generatePrompt from "./prompt";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "Open API key not configured",
      },
    });
    return;
  }

  const text = req.body.text || ``;
  const format = req.body.format || "question";
  const useSuggestions = req.body.useSuggestions || true;

  if (text.trim().length === 0) {
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
      prompt: generatePrompt(text, format, useSuggestions),
      temperature: 0.3,
      max_tokens: 2048,
    });
    console.log(completion.data.choices[0].text);
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
}
