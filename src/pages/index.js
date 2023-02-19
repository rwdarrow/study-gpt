import { useState } from "react";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();
  const [currentTokens, setCurrentTokens] = useState(0);
  const placeholder = "Generating...";

  async function onSubmit(event) {
    event.preventDefault();
    setResult(placeholder);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(JSON.parse(data.result.match(/(?={).*/s)[0]));
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <form method="post" onSubmit={onSubmit}>
        <textarea
          type="text"
          name="textinput"
          rows="20"
          cols="80"
          maxLength={2048}
          placeholder="Enter text to generate flashcards from"
          value={textInput}
          onChange={(e) => {
            setCurrentTokens(e.target.value.length);
            setTextInput(e.target.value);
          }}
        />
        <button type="submit">Generate Flashcards</button>
      </form>
      <div>{currentTokens}/2048</div>
      <div>
        {result && result != placeholder
          ? JSON.stringify(result, null, 2)
          : result}
      </div>
    </div>
  );
}
