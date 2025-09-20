// src/Game.jsx
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const scenarios = [
  {
    title: "Initial Population",
    description:
      "Welcome to your forest! You have a starting population of 5 birds. Click 'Run Scenario' to begin!",
    effect: (pop) => 5,
  },
  {
    title: "Immigration",
    description: "Some new birds arrive in your forest! (+5 birds)",
    effect: (pop) => pop + 5,
  },
  {
    title: "Births",
    description: "It’s breeding season! The population increases. (+10 birds)",
    effect: (pop) => pop + 10,
  },
  {
    title: "Predation",
    description:
      "A predator moves into the forest. Some birds are eaten. (-5 birds)",
    effect: (pop) => pop - 5,
  },
  {
    title: "Forest Fire",
    description:
      "A wildfire sweeps through the forest! Only a few survive. (~3–5 birds)",
    effect: () => Math.floor(Math.random() * 3) + 3, // random 3–5
  },
];

export default function Game({ onFinish }) {
  const [step, setStep] = useState(0);
  const [population, setPopulation] = useState(0);
  const [history, setHistory] = useState([]);

  const runScenario = () => {
    const newPop = scenarios[step].effect(population);
    setPopulation(newPop);
    setHistory([...history, { step: scenarios[step].title, population: newPop }]);
  };

  const nextScenario = () => {
    if (step < scenarios.length - 1) {
      setStep(step + 1);
    } else {
      onFinish(); // move to quiz
    }
  };

  return (
    <div className="game-screen">
      <h2>{scenarios[step].title}</h2>
      <p>{scenarios[step].description}</p>

      <div className="game-layout">
        {/* Left: Forest + Birds */}
        <div className="forest-box">
          {[...Array(Math.min(population, 20))].map((_, i) => (
            <span key={i} className="bird">🐦</span>
          ))}
        </div>

        {/* Right: Population Graph */}
        <div className="graph-box">
          <LineChart width={400} height={300} data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="population" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>

      <div className="controls">
        <button className="btn" onClick={runScenario}>
          Run Scenario ▶
        </button>
        <button className="btn primary" onClick={nextScenario}>
          Next
        </button>
      </div>
    </div>
  );
}
