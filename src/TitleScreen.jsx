// src/TitleScreen.jsx
import React from "react";

export default function TitleScreen({ onStart }) {
  return (
    <div style={styles.container}>
      <img
        src={`${import.meta.env.BASE_URL}forest.png`}
        alt="Forest background"
        style={styles.background}
      />
      <div style={styles.overlay}>
        <h1 style={styles.title}>Ecology Adventure Challenge</h1>
        <h2 style={styles.subtitle}>A Population Ecology Game</h2>
        <button style={styles.button} onClick={onStart}>
          Start Lesson ▶
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  background: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.7)",
  },
  overlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: "3em",
    marginBottom: "0.2em",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)",
  },
  subtitle: {
    fontSize: "1.5em",
    marginBottom: "1em",
    textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
  },
  button: {
    background: "orange",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1.2em",
  },
};
