// src/TitleScreen.jsx
import React from "react";

export default function TitleScreen({ onStart }) {
  return (
    <div className="title-screen" role="main" aria-label="Title screen">
      <div className="title-inner">
        <div className="title-row" aria-hidden="false">
          <span className="emoji-left" aria-hidden="true">🍃</span>

          <h1 className="title-text">Ecosystem Adventure Challenge</h1>

          <span className="emoji-right" aria-hidden="true">🌍</span>
        </div>

        <p className="subtitle">A fun way to learn about Population Ecology!</p>

        <button
          className="btn primary"
          onClick={() => {
            // small safety: ensure onStart exists
            if (typeof onStart === "function") onStart();
          }}
        >
          Start Lesson
        </button>
      </div>
    </div>
  );
}
