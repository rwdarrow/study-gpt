const questionSwitch =
  "The front of the flashcard should be in the form of a question.";
const topicSwitch =
  "The front of the flashcard should be the answer to the statement on the back.";
const suggestionSwitch =
  'Generate some (no more than 1 in 5) flashcards related to the topic, but not directly from the provided text. These flashcards are marked with "suggested: true".';

const promptBase =
  "Given some unstructured text, create a JSON representations of flashcards based on information in that text. The number of flashcards generated should be sufficient to prepare for an exam on the content present in the text.";

const divider = "\n\n";

const jsonExample = (
  useSuggestions
) => `The JSON should follow the following format:

{
  "subject": "World Capitals",
  "set": [
    {
        ${useSuggestions && `"suggested": false,`}
        "front": "Paris",
        "back": "The capital of France"
    },
    {
        ${useSuggestions && `"suggested": true,`}
        "front": "London",
        "back": "The capital of the United Kingdom"
    }
  ]
}`;

const generatePrompt = (text, format, useSuggestions) =>
  `${promptBase} ${format === "question" ? questionSwitch : topicSwitch} ${
    useSuggestions && suggestionSwitch
  } ${jsonExample(useSuggestions)} ${divider} Text: ${text}`;

export default generatePrompt;
