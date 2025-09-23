// src/Game.jsx
import React, { useState, useEffect } from "react";
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
    change: 5,
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
    jCurve: true, // mark this scenario for J-curve explanation
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

// Helper: calculate population history up to a given step
const calculateHistory = (step) => {
  let pop = 0;
  const newHistory = [];

  for (let i = 0; i <= step; i++) {
    const sc = scenarios[i];
    let change =
      typeof sc.change === "function" ? sc.change(pop) : sc.change;

    pop = Math.max(0, pop + change);
    newHistory.push({ name: sc.title, population: pop });
  }

  return newHistory;
};

const getBirdPositions = (count) => {
  const rows = Math.ceil(count / 5);
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

export default function Game({ onQuizStart }) {
  const [step, setStep] = useState(0);
  const [population, setPopulation] = useState(0);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [showJCurve, setShowJCurve] = useState(false);

  const scenario = scenarios[step];

  // Recalculate history + population whenever step or modal changes
  useEffect(() => {
    if (step >= 0) {
      const newHistory = calculateHistory(step - (showModal ? 1 : 0));
      setHistory(newHistory);
      setPopulation(
        newHistory.length
          ? newHistory[newHistory.length - 1].population
          : 0
      );
    }
  }, [step, showModal]);

  const runScenario = () => {
    setShowModal(false);
    if (scenario.jCurve) {
      setShowJCurve(true);
    }
  };

  const nextScenario = () => {
    if (step < scenarios.length - 1) {
      setStep(step + 1);
      setShowModal(true);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setShowModal(true);
    }
  };

  const finishedGame = step === scenarios.length - 1 && !showModal;

  return (
    <div className="game-container">
      <div className="content-row">
        <div className="forest-container">
          {getBirdPositions(population).map((pos, i) => (
            <img
              key={i}
              src={`${import.meta.env.BASE_URL}bird.png`}
              alt="bird"
              className="bird"
              style={{ top: pos.top, left: pos.left }}
            />
          ))}
          {scenario.fire && !showModal && (
            <img
              src={`${import.meta.env.BASE_URL}fire.png`}
              alt="fire"
              className="fire"
            />
          )}
        </div>

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

      {/* J-Curve modal */}
      {showJCurve && (
        <div className="modal">
          <div className="modal-content">
            <span
              style={{ float: "right", cursor: "pointer" }}
              onClick={() => setShowJCurve(false)}
            >
              &times;
            </span>
            <h3>J-Curve / Exponential Growth</h3>
            <p>
              This scenario shows a J-curve (exponential growth). The population
              grows rapidly with no immediate limit. This demonstrates how
              populations can increase quickly under ideal conditions.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ marginTop: "10px" }}>
        {!showModal && step > 0 && (
          <button
            className="btn primary"
            onClick={goBack}
            style={{ marginRight: "10px" }}
          >
            ◀ Back
          </button>
        )}

        {!showModal && step < scenarios.length - 1 && (
          <button className="btn primary" onClick={nextScenario}>
            Next Scenario ▶
          </button>
        )}
      </div>

      {/* Quiz starts only after ALL scenarios */}
      {finishedGame && (
        <button className="btn primary" onClick={onQuizStart}>
          Start Quiz 📝
        </button>
      )}
    </div>
  );
}
