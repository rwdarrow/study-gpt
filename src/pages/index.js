import { useState } from "react";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [csvResult, setCsvResult] = useState();
  const [subject, setSubject] = useState();
  const [currentLength, setCurrentLength] = useState(0);
  const placeholder = "Generating...";

  async function onSubmit(event) {
    event.preventDefault();
    setCsvResult(placeholder);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textInput.trim().replace(/(\r\n|\n|\r)/gm, " "),
        }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const subject = data.result.match(
        /(?<=subject:\s)(.*?)(?=\sfront,back)/
      )[0];
      setSubject(subject);

      const csv = data.result.match(/(?=front,back).*/s)[0];
      setCsvResult(csv);
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
          maxLength={8192}
          placeholder="Enter text to generate flashcards from"
          value={textInput}
          onChange={(e) => {
            setCurrentLength(e.target.value.length);
            setTextInput(e.target.value);
          }}
        />
        <button type="submit">Generate Flashcards</button>
      </form>
      <div>{currentLength}/8192</div>
      <br />
      <div>{subject}</div>
      <br />
      <div>{csvResult}</div>
    </div>
  );
}
