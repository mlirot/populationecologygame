import React from "react";

export default function TitleScreen({ onStart }) {
  const handleClick = () => {
    alert("Debug: Start Lesson button clicked!");
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-600 text-white p-6 text-center">
      <h1 className="text-5xl font-bold mb-4">🌿 Ecosystem Adventure Challenge 🌍</h1>
      <p className="text-xl mb-8">A fun way to learn about Population Ecology!</p>
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl shadow-lg font-semibold transition"
      >
        Start Lesson
      </button>
    </div>
  );
}