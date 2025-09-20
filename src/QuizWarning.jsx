// src/QuizWarning.jsx
import React from "react";
import "./Quiz.css"; 

export default function QuizWarning({ onReviewLesson, onStartQuiz, reviewedOnce }) {
  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>⚠️ Warning!</h2>
        <p>
          You are about to start your quiz. Would you like to revisit the lesson
          to refresh your memory on terms?
        </p>

        <div className="quiz-options">
          {!reviewedOnce && (
            <button onClick={onReviewLesson}>
              🔙 Review Lesson
            </button>
          )}
          <button onClick={onStartQuiz}>
            📝 Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
