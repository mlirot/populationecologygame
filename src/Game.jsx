// src/Game.jsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Game = () => {
  const [population, setPopulation] = useState(5); // start with 5 birds
  const [step, setStep] = useState(0); // scenario tracker
  const [log, setLog] = useState([{ step: 0, pop: 5 }]);
  const [popup, setPopup] = useState(true);

  // Scenario text
  const scenarios = [
    {
      title: "Welcome to your forest!",
      text: "You have a starting population of 5 birds. You will run this population through a series of events to see how it is affected! Click Next when you are ready.",
      action: null,
    },
    {
      title: "Immigration 🐦",
      text: "Some new birds fly in and join your population. Click Run Scenario to see the effect.",
      action: () => setPopulation((p) => p + 5), // 5 → 10
    },
    {
      title: "Births 🐣",
      text: "Some birds reproduce, causing your population to grow. Click Run Scenario to continue.",
      action: () => setPopulation((p) => Math.min(p + 10, 20)), // 10 → 20
    },
    {
      title: "Predation 🦊",
      text: "A predator arrives, and the population decreases. This is density dependent, since the effect depends on how many birds are around.",
      action: () => setPopulation((p) => Math.max(p - 5, 0)), // 20 → 15
    },
    {
      title: "Forest Fire 🔥",
      text: "A forest fire sweeps through! This is density independent because it doesn’t matter how many birds there are—the fire destroys most of the population.",
      action: () => setPopulation(() => Math.floor(Math.random() * 3) + 3), // 3-5 left
    },
    {
      title: "Wrap-Up 🎉",
      text: "Great job! You’ve seen how populations can grow, shrink, and be affected by density-dependent and density-independent factors. Now look at your population graph to figure out the carrying capacity.",
      action: null,
    },
  ];

  const runScenario = () => {
    if (scenarios[step].action) {
      scenarios[step].action();
    }
    setLog((prev) => [...prev, { step: step + 1, pop: population }]);
    setPopup(false);
  };

  const nextScenario = () => {
    if (step < scenarios.length - 1) {
      setStep(step + 1);
      setPopup(true);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Popup Modal */}
      {popup && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            padding: "20px",
            border: "2px solid black",
            borderRadius: "12px",
            maxWidth: "500px",
            zIndex: 1000,
          }}
        >
          <h2>{scenarios[step].title}</h2>
          <p>{scenarios[step].text}</p>
          <div style={{ marginTop: "10px" }}>
            {scenarios[step].action ? (
              <button onClick={runScenario}>Run Scenario</button>
            ) : (
              <button onClick={nextScenario}>Next</button>
            )}
          </div>
        </div>
      )}

      {/* Game Area */}
      <div style={{ display: "flex", gap: "30px" }}>
        {/* Birds display */}
        <div style={{ flex: 1, border: "2px solid black", minHeight: "300px" }}>
          <h3>Birds (Population: {population})</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {Array.from({ length: population }).map((_, i) => (
              <span key={i}>🐦</span>
            ))}
          </div>
        </div>

        {/* Graph display */}
        <div style={{ flex: 1 }}>
          <h3>Population Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={log}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="step" label={{ value: "Scenario", position: "insideBottomRight", offset: -5 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pop" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Game;
