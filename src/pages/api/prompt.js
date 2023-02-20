const suggestionSwitch =
  "Generate exactly 2 flashcards related to the topic, but not directly from the provided text. These flashcards are marked 'true' in the 'suggested' column.";
const numToGenerate = "The number of flashcards to generate should be at least";
const promptBase =
  "Given some text, return a CSV representation of flashcards based on information in that text. Do not complete the text. Only return properly-formatted CSV.";

const divider = "\n\n";

const csvExample = (
  useSuggestions
) => `Here is an example based on World Geography:

subject: World Geography\\n
front,back${useSuggestions && ",suggested"}\\n
"What is the capital of France?","Paris"${useSuggestions && ",false"}\\n
"What is largest city in the United States?","New York City"${
  useSuggestions && ",false"
}\\n
"What country is known for its Sakura trees?","Japan"${
  useSuggestions && ",false"
}\\n
"What is capital of the United Kingdom?","London"${useSuggestions && ",true"}`;

const generatePrompt = (text, useSuggestions) =>
  `${promptBase} ${
    useSuggestions && suggestionSwitch
  } ${numToGenerate} ${Math.ceil(text.length * 0.003)}. ${csvExample(
    useSuggestions
  )} ${divider} Text: ${text}`;

export default generatePrompt;
