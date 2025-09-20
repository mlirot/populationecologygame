import React, { useState } from "react";

const lessonSlides = [
  { term: "What is Population Ecology? 🌎", definition: "Population ecology is the study of how populations change over time and interact with the environment." },
  { term: "Population Size", definition: "The total number of individuals in a population." },
  { term: "Population Density", definition: "The number of individuals per unit area or volume." },
  { term: "Population Distribution", definition: "How individuals are spread out: uniform, random, or clumped." },
  { term: "How Populations Change 📈", definition: "Populations change through Births, Deaths, Immigration, and Emigration." },
  { term: "Limiting Factors 🚫", definition: "Density-Dependent (competition, predation) and Density-Independent (fires, floods)." },
];

export default function Lesson({ onNext }) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < lessonSlides.length - 1) {
      setCurrent(current + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-6 text-center">
      <h1 className="text-4xl font-bold text-white mb-6">{lessonSlides[current].term}</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl text-lg mb-6">
        {lessonSlides[current].definition}
      </div>
      <button
        onClick={handleNext}
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg font-semibold transition"
      >
        {current < lessonSlides.length - 1 ? "Next" : "Start Game"}
      </button>
      <p className="text-sm text-white mt-4">Debug: Showing slide {current + 1} of {lessonSlides.length}</p>
    </div>
  );
}