import React from "react";

export default function Game({ onFinish }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">🌳 Game Screen</h1>
      <p className="text-lg mb-6">This is where the ecosystem game will go.</p>
      <button
        onClick={onFinish}
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl shadow-lg font-semibold transition"
      >
        Finish Game → Quiz
      </button>
    </div>
  );
}