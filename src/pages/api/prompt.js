const promptBase =
  "Given some text, return a CSV representation of flashcards based on information in that text. The number of flashcards to generate should be at least";

const divider = "\n\n";

const csvExample = `Here is an example based on World Geography:

subject: World Geography
front,back
"What is the capital of France?","Paris"
"What is largest city in the United States?","New York City"
"What country is known for its Sakura trees?","Japan"
"What is capital of the United Kingdom?","London"`;

const generatePrompt = (text) =>
  `${promptBase} ${Math.ceil(
    text.length * 0.003
  )}. ${csvExample} ${divider}Text: ${text}`;

export default generatePrompt;
