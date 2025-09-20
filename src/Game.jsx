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
              <Lin
