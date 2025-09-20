// src/Lesson.jsx
import React, { useState } from "react";

const lessonSlides = [
  {
    title: "What is Population Ecology? 🌎",
    content: (
      <>
        <p>
          Population ecology is a branch of science that studies how and why the
          size, density, and distribution of populations change over time. Think
          of a population as a group of the same species living in the same
          area. For example, all the penguins in Antarctica or all the squirrels
          in a park are considered populations.
        </p>
        <p>
          <strong>Population Size:</strong> This is simply the total number of
          individuals in a population. It's like counting how many students are
          in your class.
        </p>
        <p>
          <strong>Population Density:</strong> This measures how crowded a
          population is. It's the number of individuals per unit of area or
          volume. Imagine you have a small playground with 10 kids and a big
          park with 10 kids. The playground has a higher density of kids!
        </p>
        <p>
          <strong>Population Distribution:</strong> This describes how
          individuals are spread out in an area. There are three main types:
        </p>
        <ul>
          <li>
            <strong>Uniform:</strong> Individuals are evenly spaced out, like
            trees in an orchard.
          </li>
          <li>
            <strong>Random:</strong> Individuals are scattered without any
            pattern, like dandelions in a field.
          </li>
          <li>
            <strong>Clumped:</strong> Individuals are grouped together in
            clusters, like a herd of elephants or a school of fish.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How Populations Change 📈",
    content: (
      <>
        <p>
          Populations aren't static; they are always changing. The size of a
          population can increase or decrease based on four main factors:
        </p>
        <ul>
          <li>
            <strong>Births (Natality):</strong> When new individuals are born,
            the population increases.
          </li>
          <li>
            <strong>Deaths (Mortality):</strong> When individuals die, the
            population decreases.
          </li>
          <li>
            <strong>Immigration:</strong> When individuals move into a
            population from another area, the population increases. Think of it
            as people immigrating to a new country.
          </li>
          <li>
            <strong>Emigration:</strong> When individuals move out of a
            population to another area, the population decreases. Think of it as
            people exiting or emigrating from a country.
          </li>
        </ul>
        <p>
          <em>
            Formula for Population Change = (Births + Immigration) - (Deaths +
            Emigration)
          </em>
        </p>
      </>
    ),
  },
  {
    title: "Limiting Factors 🚫",
    content: (
      <>
        <p>
          A population can't grow forever. Something has to limit it! Limiting
          factors are things in the environment that keep a population from
          getting too big.
        </p>
        <p>
          <strong>Density-Dependent Factors:</strong> These factors have a
          bigger impact as the population density increases. For example, if
          there are too many deer in an area, there might not be enough food for
          all of them. Other examples include predation (more prey means more
          predators), and disease (disease spreads faster in crowded
          populations).
        </p>
        <p>
          <strong>Density-Independent Factors:</strong> These factors affect a
          population regardless of its density. A natural disaster like a fire,
          flood, or drought can wipe out a population no matter how big or small
          it is.
        </p>
      </>
    ),
  },
];

export default function Lesson({ onStartGame }) {
  const [index, setIndex] = useState(0);
  const slide = lessonSlides[index];

  return (
    <div className="lesson-screen">
      <div className="lesson-content">
        <h2 className="lesson-title">{slide.title}</h2>
        <div className="lesson-card">{slide.content}</div>

        <div className="lesson-nav">
          <button
            className="btn"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            ◀ Back
          </button>

          {index < lessonSlides.length - 1 ? (
            <button className="btn primary" onClick={() => setIndex(index + 1)}>
              Next ▶
            </button>
          ) : (
            <button className="btn primary" onClick={onStartGame}>
              Start Game 🎮
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
