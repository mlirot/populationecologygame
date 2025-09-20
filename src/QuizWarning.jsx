import React from "react";
import "./Lesson.css"; // reuse the same style so it matches

export default function QuizWarning({ onReviewLesson, onStartQuiz, reviewedOnce }) {
  return (
    <div className="lesson-container">
      <div className="lesson-card">
        <h2>⚠️ Warning!</h2>
        <p>
          You are about to start your quiz. Would you like to revisit the lesson
          to refresh your memory on terms?
        </p>

        <div className="lesson-nav">
          {!reviewedOnce && (
            <button className="btn secondary" onClick={onReviewLesson}>
              Review Lesson 🔙
            </button>
          )}
          <button className="btn primary" onClick={onStartQuiz}>
            Start Quiz 📝
          </button>
        </div>
      </div>
    </div>
  );
}
