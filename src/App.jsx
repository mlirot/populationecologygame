import React, { useState } from "react";
import TitleScreen from "./TitleScreen";
import Lesson from "./Lesson";
import Game from "./Game";
import Quiz from "./Quiz";
import QuizWarning from "./QuizWarning"; // new component

export default function App() {
  const [stage, setStage] = useState("title");
  const [reviewedOnce, setReviewedOnce] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {stage === "title" && <TitleScreen onStart={() => setStage("lesson")} />}

      {stage === "lesson" && (
        <Lesson onStartGame={() => setStage("game")} />
      )}

      {stage === "game" && (
        <Game onQuizStart={() => setStage("quiz-warning")} />
      )}

      {stage === "quiz-warning" && (
        <QuizWarning
          onReviewLesson={() => {
            if (!reviewedOnce) {
              setReviewedOnce(true);
              setStage("lesson");
            }
          }}
          onStartQuiz={() => setStage("quiz")}
          reviewedOnce={reviewedOnce}
        />
      )}

     {stage === "quiz" && (
  <Quiz onBackToLesson={() => setStage("lesson")} />
)}
