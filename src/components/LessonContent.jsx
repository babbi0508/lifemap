function LessonContent({ topic, onBack }) {
  const lessons = {
    "Computer Basics": {
      title: "Computer & Programming Basics",

      intro:
        "Before learning programming, understand how computers work and how programs give instructions to computers.",

      sections: [
        {
          title: "What is a Computer?",
          content:
            "A computer is an electronic machine that takes input, processes it according to instructions, and produces output.",
        },

        {
          title: "What is Programming?",
          content:
            "Programming means writing instructions that tell a computer what to do. These instructions are written using programming languages such as Python, JavaScript, Java and C++.",
        },

        {
          title: "What is a Programming Language?",
          content:
            "A programming language is a way for humans to write instructions that computers can understand and execute.",
        },

        {
          title: "How Does Code Work?",
          content:
            "You write code, the computer processes those instructions, and the program produces an output. Some languages are compiled while others are interpreted.",
        },

        {
          title: "Why Learn Python?",
          content:
            "Python has simple syntax and is widely used in software development, automation, data science, artificial intelligence and web development.",
        },
      ],

      practice: [
        "Write down three programming languages you know.",
        "Explain programming in your own words.",
        "Give one real-world example of a computer program.",
      ],

      quiz: [
        {
          question: "What is programming?",
          options: [
            "Writing instructions for a computer",
            "Buying a computer",
            "Using the internet",
            "Designing a keyboard",
          ],
          answer: 0,
        },

        {
          question: "Which one is a programming language?",
          options: [
            "Python",
            "Windows",
            "Google",
            "Chrome",
          ],
          answer: 0,
        },

        {
          question: "Why is Python popular for beginners?",
          options: [
            "It has simple syntax",
            "It cannot run programs",
            "It is only used for games",
            "It is a hardware device",
          ],
          answer: 0,
        },
      ],
    },
  };

  const lesson = lessons[topic];

  if (!lesson) {
    return (
      <div className="lesson-content-page">
        <button onClick={onBack}>
          ← Back
        </button>

        <h1>{topic}</h1>

        <p>
          This lesson is coming soon. We are preparing the complete
          beginner-to-advanced learning material for this topic.
        </p>
      </div>
    );
  }

  return (
    <section className="lesson-content-page">

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="lesson-title-area">

        <p className="small-label">
          LIFEMAP LESSON
        </p>

        <h1>
          {lesson.title}
        </h1>

        <p>
          {lesson.intro}
        </p>

      </div>

      {/* LEARN */}
      <div className="content-section">

        <div className="section-icon">
          📖
        </div>

        <h2>
          Learn the Concept
        </h2>

        {lesson.sections.map((section, index) => (
          <div className="concept" key={index}>

            <h3>
              {index + 1}. {section.title}
            </h3>

            <p>
              {section.content}
            </p>

          </div>
        ))}

      </div>

      {/* VIDEO */}
      <div className="content-section video-section">

        <div className="section-icon">
          🎥
        </div>

        <h2>
          Watch & Understand
        </h2>

        <p>
          The best teaching video for this topic will be placed here
          after we verify the quality and beginner-friendliness of the
          resource.
        </p>

        <button className="video-button">
          Watch Recommended Video →
        </button>

      </div>

      {/* PRACTICE */}
      <div className="content-section">

        <div className="section-icon">
          💻
        </div>

        <h2>
          Practice
        </h2>

        {lesson.practice.map((item, index) => (
          <div className="practice-item" key={index}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}

      </div>

      {/* QUIZ */}
      <div className="content-section">

        <div className="section-icon">
          🧠
        </div>

        <h2>
          Quick Quiz
        </h2>

        {lesson.quiz.map((question, index) => (

          <div className="quiz-card" key={index}>

            <h3>
              {index + 1}. {question.question}
            </h3>

            {question.options.map((option, optionIndex) => (

              <button
                className="quiz-option"
                key={optionIndex}
              >
                {option}
              </button>

            ))}

          </div>

        ))}

      </div>

      {/* COMPLETE */}
      <div className="complete-section">

        <h2>
          🎯 Ready for the next topic?
        </h2>

        <p>
          Make sure you understand the concept and complete the
          practice before moving forward.
        </p>

        <button className="complete-button">
          Mark Lesson Complete ✓
        </button>

      </div>

    </section>
  );
}

export default LessonContent;