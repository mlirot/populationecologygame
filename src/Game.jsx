// src/Game.jsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./Game.css";

const scenarios = [
  {
    title: "Initial Population",
    description:
      "Welcome to your forest! 🌲 You have a starting population of 4 birds. You will run this population through a series of events to see how it is affected. Click Run Scenario when ready.",
    change: 4,
  },
  {
    title: "Immigration / Food Increase",
    description:
      "Some new birds arrive and there’s more food available. The population increases by 5.",
    change: 5,
  },
  {
    title: "Births",
    description:
      "The population reproduces successfully. The population increases by 10.",
    change: 10,
  },
  {
    title: "Predation",
    description:
      "Predators have arrived! This density-dependent factor reduces the population by 5.",
    change: -5,
  },
  {
    title: "Forest Fire",
    description:
      "A forest fire occurs 🔥 — this is a density-independent factor. The population is drastically reduced to only 3–5 survivors.",
    change: (prev) => -(prev - Math.floor(Math.random() * 3 + 3)),
    fire: true,
  },
];

// ✅ NEW: Helper to place birds in rows instead of random
const getBirdPositions = (count) => {
  const rows = Math.ceil(count / 5); // 5 birds per row
  const positions = [];
  let birdIndex = 0;

  for (let row = 0; row < rows; row++) {
    const birdsInRow = Math.min(5, count - birdIndex);
    for (let col = 0; col < birdsInRow; col++) {
      positions.push({
        left: `${15 + col * 15}%`,
        top: `${20 + row * 15}%`,
      });
      birdIndex++;
    }
  }
  return positions;
};

export default function Game({ onFinish }) {
  const [step, setStep] = useState(0);
  const [population, setPopulation] = useState(0);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const scenario = scenarios[step];

  const runScenario = () => {
    let change =
      typeof scenario.change === "function"
        ? scenario.change(population)
        : scenario.change;

    const newPop = Math.max(0, population + change);

    setPopulation(newPop);
    setHistory((prev) => [
      ...prev,
      { name: scenario.title, population: newPop },
    ]);

    setShowModal(false);
  };

  const nextScenario = () => {
    if (step < scenarios.length - 1) {
      setStep(step + 1);
      setShowModal(true);
    }
  };

  const startQuiz = step === scenarios.length - 1 && !showModal;

  return (
    // ✅ Make forest + graph sit side-by-side
    <div className="game-container">
      <div className="content-row">
        {/* Forest with birds */}
        <div className="forest-container">
          {getBirdPositions(population).map((pos, i) => (
            <img
              key={i}
              src="/bird.png"
              alt="bird"
              className="bird"
              style={{
                top: pos.top,
                left: pos.left,
              }}
            />
          ))}

          {/* Fire overlay for last scenario */}
          {scenario.fire && !showModal && <div className="fire"></div>}
        </div>

        {/* Graph */}
        <div className="graph-container">
          <ResponsiveContainer>
            <LineChart data={history}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="population" stroke="#ff5722" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scenario modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{scenario.title}</h2>
            <p>{scenario.description}</p>
            <button className="btn primary" onClick={runScenario}>
              Run Scenario ▶
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      {!showModal && !startQuiz && (
        <button className="btn primary" onClick={nextScenario}>
          Next Scenario ▶
        </button>
      )}

      {startQuiz && (
       <button
  className="lesson-button next"
  onClick={() => setStage("quiz")}
>
  🚀 Start Quiz
</button>
      )}
    </div>
  );
}
