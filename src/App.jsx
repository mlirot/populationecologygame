import React, { useState } from "react";
import TitleScreen from "./TitleScreen";
import Lesson from "./Lesson";
import Game from "./Game";
import Quiz from "./Quiz";

export default function App() {
  const [screen, setScreen] = useState("title");
  const [debugLog, setDebugLog] = useState(["App started on TITLE"]);

  const goTo = (nextScreen) => {
    setScreen(nextScreen);
    setDebugLog((prev) => [...prev, `Switched to ${nextScreen.toUpperCase()}`]);
  };

  return (
    <div>
      {screen === "title" && <TitleScreen onStart={() => goTo("lesson")} />}
      {screen === "lesson" && <Lesson onNext={() => goTo("game")} />}
      {screen === "game" && <Game onFinish={() => goTo("quiz")} />}
      {screen === "quiz" && <Quiz />}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "rgba(0,0,0,0.85)",
          color: "lime",
          fontSize: "14px",
          padding: "6px",
          maxHeight: "150px",
          overflowY: "auto",
          fontFamily: "monospace",
          zIndex: 9999,
        }}
      >
        <strong>Debug Log:</strong>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          {debugLog.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}