// src/Quiz.jsx
import React, { useState } from "react";
import "./Quiz.css";

const questions = [
  {
    {
    question: "What is population ecology?",
    options: [
      "The study of individual animals",
      "The study of groups of the same species and how they change over time",
      "The study of plants only",
      "The study of rocks and soil"
    ],
    answer: 1
  },
  {
    question: "Which factor increases population size?",
    options: ["Deaths", "Emigration", "Births", "Predation"],
    answer: 2
  },
  {
    question: "What does population density describe?",
    options: [
      "The weight of animals",
      "How individuals are spread out in an area",
      "How crowded a population is",
      "The number of species in an ecosystem"
    ],
    answer: 2
  },
  {
    question: "Which of the following is a density-dependent factor?",
    options: ["Fire", "Flood", "Predation", "Hurricane"],
    answer: 2
  },
  {
    question: "Which of the following is density-independent?",
    options: ["Disease", "Competition", "Predation", "Forest fire"],
    answer: 3
  },
  {
    question: "In the game, what was the initial population of birds?",
    options: ["2", "4", "5", "20"],
    answer: 2
  },
  {
    question: "What event increased the population by 5?",
    options: ["Births", "Immigration / Food increase", "Predation", "Fire"],
    answer: 1
  },
  {
    question: "After births, what was the approximate total population?",
    options: ["10", "15", "20", "5"],
    answer: 2
  },
  {
    question: "What factor reduced the population by 5?",
    options: ["Immigration", "Predation", "Births", "Forest fire"],
    answer: 1
  },
  {
    question: "What was the last event in the simulation?",
    options: ["Immigration", "Predation", "Forest fire", "Births"],
    answer: 2
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index) => {
    if (index === questions[current].answer) {
      setScore(score + 1);
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="quiz-container">
      {!finished ? (
        <div className="quiz-card">
          <h2>
            Question {current + 1} of {questions.length}
          </h2>
          <p>{questions[current].question}</p>
          <div className="options">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                className="btn option"
                onClick={() => handleAnswer(i)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-results">
          <h2>Quiz Complete 🎉</h2>
          <p>
            You scored <strong>{score}</strong> out of {questions.length}.
          </p>
          <p>
            📸 Take a screenshot of this screen and paste it into your Google
            Slides assignment.
          </p>
        </div>
      )}
    </div>
  );
}
