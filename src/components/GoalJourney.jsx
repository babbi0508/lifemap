function GoalJourney({ goal, steps, onStartLearning }) {
  const journey = [
    {
      title: "Foundation",
      description: "Build the basic knowledge you need to get started.",
      icon: "🌱",
    },
    {
      title: "Programming",
      description: "Learn programming concepts and write your first programs.",
      icon: "💻",
    },
    {
      title: "Problem Solving & DSA",
      description: "Develop logical thinking and learn important data structures.",
      icon: "🧠",
    },
    {
      title: "Development",
      description: "Learn how real-world applications are built.",
      icon: "⚙️",
    },
    {
      title: "Projects",
      description: "Build practical projects and create your portfolio.",
      icon: "🛠️",
    },
    {
      title: "Career Preparation",
      description: "Prepare your resume, GitHub and technical interviews.",
      icon: "🚀",
    },
  ];

  return (
    <section className="journey-section">

      <div className="journey-heading">
        <p>YOUR JOURNEY</p>

        <h2>
          From Beginner to
          <span> Goal Achiever.</span>
        </h2>

        <p className="journey-description">
          {goal
            ? `Your path to becoming a ${goal.replace(/^I want to /i, "")}.`
            : "Follow a clear step-by-step path to reach your goal."}
        </p>
      </div>

      <div className="journey-list">

        {journey.map((item, index) => (
          <div className="journey-item" key={index}>

            <div className="journey-number">
              {index + 1}
            </div>

            <div className="journey-icon">
              {item.icon}
            </div>

            <div className="journey-content">

              <span>STAGE {index + 1}</span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <button
                onClick={() =>
                  onStartLearning(
                    item.title,
                    steps?.[index] || item.description
                  )
                }
              >
                Start Learning →
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default GoalJourney;