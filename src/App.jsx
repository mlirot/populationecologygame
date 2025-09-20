import React, { useState } from "react";
import TitleScreen from "./TitleScreen";
import Lesson from "./Lesson";
import Game from "./Game";
import Quiz from "./Quiz";

export default function App() {
  const [stage, setStage] = useState("title");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {stage === "title" && <TitleScreen onStart={() => setStage("lesson")} />}

      {stage === "lesson" && <Lesson onStartGame={() => setStage("game")} />}

      {stage === "game" && <Game onFinish={() => setStage("quiz")} />}

      {stage === "quiz" && <Quiz />}
    </div>
  );
}
