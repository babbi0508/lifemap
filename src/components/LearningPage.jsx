import { useState } from "react";
import LessonContent from "./LessonContent";

function LearningPage({ stage, goal, onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = {
    Foundation: [
      "Computer Basics",
      "How Programming Works",
      "Problem Solving",
      "Introduction to Algorithms",
      "Git & GitHub Basics",
    ],

    Programming: [
      "Variables & Data Types",
      "Conditions",
      "Loops",
      "Functions",
      "Lists & Arrays",
      "Strings",
      "Dictionaries",
      "Object Oriented Programming",
      "Error Handling",
    ],

    "Problem Solving & DSA": [
      "Arrays",
      "Strings",
      "Linked Lists",
      "Stack",
      "Queue",
      "Hashing",
      "Trees",
      "Graphs",
      "Sorting",
      "Searching",
    ],

    Development: [
      "HTML Basics",
      "CSS Basics",
      "JavaScript Basics",
      "Frontend Development",
      "Backend Development",
      "Databases",
      "APIs",
    ],

    Projects: [
      "Beginner Project",
      "Intermediate Project",
      "Advanced Project",
      "Portfolio Project",
    ],

    "Career Preparation": [
      "Build GitHub Profile",
      "Create Resume",
      "Technical Interview Preparation",
      "Coding Interview Practice",
      "Mock Interviews",
    ],
  };

  const currentTopics = topics[stage] || topics.Foundation;

  if (selectedTopic) {
    return (
      <LessonContent
        topic={selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <section className="learning-page">

      <button className="back-button" onClick={onBack}>
        ← Back to My Journey
      </button>

      <div className="learning-header">

        <p className="small-label">
          YOUR LEARNING PATH
        </p>

        <h1>
          Learn <span>{stage}</span>
        </h1>

        <p>
          Goal: <strong>{goal}</strong>
        </p>

      </div>

      <div className="topic-heading">

        <p>
          STEP BY STEP
        </p>

        <h2>
          What you'll learn
        </h2>

        <span>
          Complete each topic before moving to the next one.
        </span>

      </div>

      <div className="topic-list">

        {currentTopics.map((topic, index) => (

          <div className="topic-card" key={topic}>

            <div className="topic-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="topic-info">

              <span>
                TOPIC {index + 1}
              </span>

              <h3>
                {topic}
              </h3>

              <p>
                Learn this concept from the basics, watch,
                practice and test your understanding.
              </p>

            </div>

            <button
              className="topic-button"
              onClick={() => setSelectedTopic(topic)}
            >
              Start →
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default LearningPage;