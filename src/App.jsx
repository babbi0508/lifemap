import { useEffect, useState } from "react";
import "./App.css";
import videoData from "./videoData";

/* =========================================================
   ROADMAP DATA
========================================================= */

const roadmapTemplates = {
  web: {
    name: "Web Developer",
    icon: "💻",
    color: "blue",
    stages: [
      {
        title: "Web Foundations",
        lessons: [
          ["HTML Fundamentals", "Learn the structure and elements used to build web pages."],
          ["CSS Fundamentals", "Learn how to style, layout and design web pages."],
          ["Web Accessibility", "Learn how to make websites usable for different users."],
        ],
      },
      {
        title: "JavaScript",
        lessons: [
          ["JavaScript Fundamentals", "Learn variables, data types, functions and control flow."],
          ["DOM Manipulation", "Learn how JavaScript interacts with HTML elements."],
          ["Async JavaScript", "Learn promises, async/await and asynchronous programming."],
        ],
      },
      {
        title: "Frontend Development",
        lessons: [
          ["React Fundamentals", "Learn components, JSX, props and state."],
          ["React Hooks", "Learn useState, useEffect and other important hooks."],
          ["Frontend Project", "Build a responsive frontend application."],
        ],
      },
      {
        title: "Backend Development",
        lessons: [
          ["Backend Fundamentals", "Understand servers, requests, responses and APIs."],
          ["REST APIs", "Learn how frontend and backend communicate."],
          ["Database Fundamentals", "Learn how applications store and retrieve information."],
        ],
      },
      {
        title: "Projects",
        lessons: [
          ["Portfolio Website", "Build a professional personal portfolio."],
          ["Full Stack Application", "Connect frontend, backend and database."],
          ["Deploy Your Application", "Learn how to make your project available online."],
        ],
      },
    ],
  },

  ai: {
    name: "AI Specialist",
    icon: "🤖",
    color: "purple",
    stages: [
      {
        title: "AI Foundations",
        lessons: [
          ["Python for AI", "Learn Python fundamentals required for AI development."],
          ["Mathematics for AI", "Learn the mathematical concepts used in AI."],
          ["Statistics and Probability", "Learn probability and statistics for AI."],
        ],
      },
      {
        title: "Machine Learning",
        lessons: [
          ["Machine Learning Fundamentals", "Understand how machine learning works."],
          ["Supervised Learning", "Learn regression and classification algorithms."],
          ["Unsupervised Learning", "Learn clustering and dimensionality reduction."],
        ],
      },
      {
        title: "Deep Learning",
        lessons: [
          ["Neural Networks", "Understand how artificial neural networks work."],
          ["Deep Learning Fundamentals", "Learn the foundations of deep learning."],
          ["Computer Vision", "Learn how AI systems process images and visual data."],
        ],
      },
      {
        title: "Generative AI",
        lessons: [
          ["Generative AI Fundamentals", "Understand how generative AI systems work."],
          ["Large Language Models", "Learn the basics of modern language models."],
          ["Prompt Engineering", "Learn how to create effective prompts."],
        ],
      },
      {
        title: "AI Projects",
        lessons: [
          ["Machine Learning Project", "Build a practical machine learning application."],
          ["Generative AI Project", "Build an application using generative AI."],
          ["AI Portfolio", "Organize your AI projects into a strong portfolio."],
        ],
      },
    ],
  },

  data: {
    name: "Data Scientist",
    icon: "📊",
    color: "green",
    stages: [
      {
        title: "Data Science Foundations",
        lessons: [
          ["Python for Data Science", "Learn Python for working with data."],
          ["Statistics", "Learn descriptive and inferential statistics."],
          ["Data Science Workflow", "Understand the complete data science process."],
        ],
      },
      {
        title: "Data Analysis",
        lessons: [
          ["NumPy", "Learn numerical computing using NumPy."],
          ["Pandas", "Learn data cleaning and manipulation with Pandas."],
          ["Data Visualization", "Learn charts and visual storytelling."],
        ],
      },
      {
        title: "Machine Learning",
        lessons: [
          ["Machine Learning Fundamentals", "Understand machine learning concepts."],
          ["Regression", "Learn regression models for prediction."],
          ["Classification", "Learn classification algorithms."],
        ],
      },
      {
        title: "Advanced Data Science",
        lessons: [
          ["Feature Engineering", "Learn how to prepare useful features for models."],
          ["Model Evaluation", "Learn how to evaluate machine learning models."],
          ["Model Improvement", "Learn techniques for improving model performance."],
        ],
      },
      {
        title: "Data Science Projects",
        lessons: [
          ["Data Analysis Project", "Analyze a real-world dataset."],
          ["Machine Learning Project", "Build and evaluate a predictive model."],
          ["Data Science Portfolio", "Prepare your projects for presentation."],
        ],
      },
    ],
  },

  chef: {
    name: "Chef",
    icon: "👨‍🍳",
    color: "orange",
    stages: [
      {
        title: "Kitchen Foundations",
        lessons: [
          ["Kitchen Basics", "Understand kitchen equipment, organization and workflow."],
          ["Food Safety", "Learn safe food handling and hygiene practices."],
          ["Knife Skills", "Learn essential cutting and knife-handling techniques."],
        ],
      },
      {
        title: "Cooking Fundamentals",
        lessons: [
          ["Cooking Methods", "Learn boiling, steaming, roasting, grilling and frying."],
          ["Seasoning and Flavour", "Understand salt, spices, herbs and flavour balance."],
          ["Stocks and Sauces", "Learn the foundations of stocks and basic sauces."],
        ],
      },
      {
        title: "Recipe Development",
        lessons: [
          ["Recipe Reading", "Learn how to understand and follow recipes."],
          ["Ingredient Selection", "Learn how to choose and prepare ingredients."],
          ["Recipe Creation", "Learn how to develop your own dishes."],
        ],
      },
      {
        title: "Professional Kitchen",
        lessons: [
          ["Kitchen Organization", "Learn professional kitchen workflow."],
          ["Time Management", "Learn how to coordinate multiple cooking tasks."],
          ["Plating and Presentation", "Learn basic food presentation techniques."],
        ],
      },
      {
        title: "Chef Projects",
        lessons: [
          ["Create a Signature Dish", "Develop and prepare your own signature dish."],
          ["Menu Planning", "Create a balanced menu."],
          ["Chef Portfolio", "Document your dishes and culinary skills."],
        ],
      },
    ],
  },

  director: {
    name: "Film Director",
    icon: "🎬",
    color: "red",
    stages: [
      {
        title: "Directing Foundations",
        lessons: [
          ["Introduction to Film Direction", "Understand the role of a director and how a film moves from idea to screen."],
          ["Story and Script Analysis", "Learn how directors break down stories, characters, scenes and emotional beats."],
          ["Visual Storytelling", "Learn how composition, camera choices, blocking and visual language communicate meaning."],
        ],
      },
      {
        title: "Pre-Production",
        lessons: [
          ["Script Breakdown", "Turn a screenplay into practical requirements for scenes, locations, cast and crew."],
          ["Shot Planning and Storyboards", "Plan shots, camera movement, coverage and visual continuity before filming."],
          ["Working with Actors", "Learn rehearsal, direction, communication and performance-focused collaboration."],
        ],
      },
      {
        title: "Cinematography and Production",
        lessons: [
          ["Camera and Lens Basics", "Understand camera framing, lenses, focal length, depth and movement from a director's perspective."],
          ["Lighting and Mood", "Learn how lighting choices influence atmosphere, attention and storytelling."],
          ["Directing a Scene", "Coordinate actors, camera and crew to execute a scene clearly and efficiently."],
        ],
      },
      {
        title: "Post-Production",
        lessons: [
          ["Editing for Story", "Understand pacing, continuity, cuts and how editing shapes the audience experience."],
          ["Sound and Music", "Learn how dialogue, ambience, effects and music support the story."],
          ["Color and Final Look", "Understand basic color decisions and how the final visual tone supports the film."],
        ],
      },
      {
        title: "Director Projects",
        lessons: [
          ["Direct a Short Scene", "Plan and direct a short scripted scene from preparation through filming."],
          ["Create a Short Film", "Develop, shoot and complete a short film using a clear directorial vision."],
          ["Director Portfolio", "Prepare a showreel, selected work and project notes to present your directing skills."],
        ],
      },
      {
        title: "Professional Director",
        lessons: [
          ["Film Crew Leadership", "Learn how to communicate decisions and collaborate with department heads."],
          ["Creative Problem Solving", "Handle production changes while protecting the story and directorial intent."],
          ["Industry and Pitching", "Learn how directors present ideas, pitch projects and build professional opportunities."],
        ],
      },
    ],
  },

  designer: {
    name: "Designer",
    icon: "🎨",
    color: "pink",
    stages: [
      {
        title: "Design Foundations",
        lessons: [
          ["Design Principles", "Learn balance, contrast, hierarchy and alignment."],
          ["Colour Theory", "Learn how colours work together in visual design."],
          ["Typography", "Learn how to choose and use fonts effectively."],
        ],
      },
      {
        title: "Design Tools",
        lessons: [
          ["Design Software Basics", "Learn the fundamentals of professional design tools."],
          ["Layout Design", "Learn how to arrange visual elements effectively."],
          ["Design Components", "Learn reusable visual components and systems."],
        ],
      },
      {
        title: "UI and UX",
        lessons: [
          ["User Interface Design", "Learn how to design clear digital interfaces."],
          ["User Experience", "Understand how users interact with products."],
          ["Wireframing", "Learn how to plan interfaces before designing them."],
        ],
      },
      {
        title: "Advanced Design",
        lessons: [
          ["Design Systems", "Learn how to create consistent design systems."],
          ["Responsive Design", "Design experiences for different screen sizes."],
          ["Usability Testing", "Learn how to test and improve designs."],
        ],
      },
      {
        title: "Design Portfolio",
        lessons: [
          ["Design Project", "Create a complete design project."],
          ["Case Study", "Document your design process and decisions."],
          ["Portfolio Presentation", "Present your best work professionally."],
        ],
      },
    ],
  },

  marketing: {
    name: "Digital Marketer",
    icon: "📣",
    color: "yellow",
    stages: [
      {
        title: "Marketing Foundations",
        lessons: [
          ["Marketing Fundamentals", "Understand the basic principles of marketing."],
          ["Target Audience", "Learn how to identify and understand an audience."],
          ["Brand Fundamentals", "Learn the basics of building a brand."],
        ],
      },
      {
        title: "Content Marketing",
        lessons: [
          ["Content Strategy", "Learn how to plan useful content."],
          ["Copywriting", "Learn how to write persuasive marketing content."],
          ["Social Media Content", "Learn how to create content for social platforms."],
        ],
      },
      {
        title: "Digital Marketing",
        lessons: [
          ["SEO Fundamentals", "Learn how search engines and SEO work."],
          ["Email Marketing", "Learn how to create effective email campaigns."],
          ["Social Media Marketing", "Learn how businesses use social media."],
        ],
      },
      {
        title: "Analytics",
        lessons: [
          ["Marketing Analytics", "Learn how to measure marketing performance."],
          ["Conversion Optimization", "Learn how to improve conversions."],
          ["Campaign Analysis", "Learn how to analyze campaign results."],
        ],
      },
      {
        title: "Marketing Projects",
        lessons: [
          ["Marketing Campaign", "Create a complete marketing campaign."],
          ["Content Strategy Project", "Build a practical content strategy."],
          ["Marketing Portfolio", "Document your marketing work."],
        ],
      },
    ],
  },
};

const genericRoadmap = {
  stages: [
    {
      title: "Foundation",
      lessons: [
        ["Introduction and Basics", "Understand the fundamentals of your chosen goal."],
        ["Essential Concepts", "Learn the important concepts needed to get started."],
        ["Required Skills", "Identify and develop the core skills required."],
      ],
    },
    {
      title: "Core Skills",
      lessons: [
        ["Core Concepts", "Learn the main concepts related to your goal."],
        ["Tools and Techniques", "Learn the important tools and techniques used in the field."],
        ["Problem Solving", "Learn how to solve common problems."],
      ],
    },
    {
      title: "Practice",
      lessons: [
        ["Beginner Practice", "Apply your knowledge through simple exercises."],
        ["Intermediate Practice", "Work on more challenging practical tasks."],
        ["Real World Practice", "Solve problems based on real-world situations."],
      ],
    },
    {
      title: "Projects",
      lessons: [
        ["Beginner Project", "Build your first practical project."],
        ["Intermediate Project", "Create a larger project using your skills."],
        ["Advanced Project", "Build a strong project that demonstrates your ability."],
      ],
    },
    {
      title: "Advanced Skills",
      lessons: [
        ["Advanced Concepts", "Learn advanced concepts related to your goal."],
        ["Professional Skills", "Understand professional workflows and practices."],
        ["Best Practices", "Learn how experts improve quality and performance."],
      ],
    },
    {
      title: "Goal Ready",
      lessons: [
        ["Portfolio and Presentation", "Organize and present your work professionally."],
        ["Final Assessment", "Review your knowledge and identify remaining gaps."],
        ["Goal Ready Plan", "Create a plan to continue improving."],
      ],
    },
  ],
};

/* =========================================================
   HELPERS
========================================================= */

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    const parsed = JSON.parse(saved);

    return parsed ?? fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors.
  }
}

function detectRoadmap(goal) {
  const text = goal.toLowerCase();

  if (
    text.includes("web developer") ||
    text.includes("frontend") ||
    text.includes("front end") ||
    text.includes("full stack") ||
    text.includes("website developer")
  ) {
    return roadmapTemplates.web;
  }

  if (
    text.includes("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("machine learning") ||
    text.includes("ml engineer")
  ) {
    return roadmapTemplates.ai;
  }

  if (
    text.includes("data scientist") ||
    text.includes("data science")
  ) {
    return roadmapTemplates.data;
  }

  if (
    text.includes("director") ||
    text.includes("film director") ||
    text.includes("movie director") ||
    text.includes("cinema director") ||
    text.includes("filmmaker") ||
    text.includes("film making") ||
    text.includes("filmmaking")
  ) {
    return roadmapTemplates.director;
  }

  if (
    text.includes("chef") ||
    text.includes("cooking") ||
    text.includes("cook")
  ) {
    return roadmapTemplates.chef;
  }

  if (
    text.includes("designer") ||
    text.includes("design") ||
    text.includes("ui ux") ||
    text.includes("ui/ux")
  ) {
    return roadmapTemplates.designer;
  }

  if (
    text.includes("marketing") ||
    text.includes("digital marketer") ||
    text.includes("seo")
  ) {
    return roadmapTemplates.marketing;
  }

  return {
    name: goal,
    icon: "🎯",
    color: "blue",
    stages: genericRoadmap.stages,
  };
}

function createVideoUrl(goal, lessonTitle) {
  const goalText = goal.toLowerCase().trim();
  const lessonText = lessonTitle.toLowerCase().trim();

  let category = "";

  if (
    goalText.includes("web developer") ||
    goalText.includes("frontend") ||
    goalText.includes("front end") ||
    goalText.includes("full stack") ||
    goalText.includes("website developer")
  ) {
    category = "web developer";
  } else if (
    goalText.includes("data scientist") ||
    goalText.includes("data science")
  ) {
    category = "data scientist";
  } else if (
    goalText.includes("ai") ||
    goalText.includes("artificial intelligence") ||
    goalText.includes("machine learning") ||
    goalText.includes("ml engineer")
  ) {
    category = "ai specialist";
  } else if (
    goalText.includes("director") ||
    goalText.includes("filmmaker") ||
    goalText.includes("filmmaking") ||
    goalText.includes("film making")
  ) {
    category = "director";
  } else if (
    goalText.includes("chef") ||
    goalText.includes("cooking") ||
    goalText.includes("cook")
  ) {
    category = "chef";
  }

  const videos = videoData[category];

  if (videos) {
    if (lessonText.includes("html") && videos["HTML Basics"]) {
      return videos["HTML Basics"];
    }

    if (lessonText.includes("css") && videos["CSS Basics"]) {
      return videos["CSS Basics"];
    }

    if (
      (lessonText.includes("javascript") ||
        lessonText.includes("dom") ||
        lessonText.includes("async")) &&
      videos["JavaScript Basics"]
    ) {
      return videos["JavaScript Basics"];
    }

    if (lessonText.includes("react") && videos["React Basics"]) {
      return videos["React Basics"];
    }

    if (lessonText.includes("python") && videos["Python Basics"]) {
      return videos["Python Basics"];
    }

    if (lessonText.includes("statistics") && videos["Statistics"]) {
      return videos["Statistics"];
    }

    if (lessonText.includes("pandas") && videos["Pandas"]) {
      return videos["Pandas"];
    }

    if (
      lessonText.includes("machine learning") &&
      videos["Machine Learning"]
    ) {
      return videos["Machine Learning"];
    }

    if (lessonText.includes("deep learning") && videos["Deep Learning"]) {
      return videos["Deep Learning"];
    }

    if (
      lessonText.includes("generative ai") &&
      videos["Generative AI"]
    ) {
      return videos["Generative AI"];
    }

    if (lessonText.includes("kitchen") && videos["Kitchen Basics"]) {
      return videos["Kitchen Basics"];
    }

    if (lessonText.includes("knife") && videos["Knife Skills"]) {
      return videos["Knife Skills"];
    }

    if (lessonText.includes("cooking") && videos["Cooking Methods"]) {
      return videos["Cooking Methods"];
    }
  }

  const query = `${goal} ${lessonTitle} tutorial`;

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;
}

const quizBanks = {
  "HTML Fundamentals": [
    { question: "Which HTML element is most appropriate for the main heading of a page?", options: ["<h1>", "<title>", "<header>", "<strong>"], answer: 0 },
    { question: "A page needs a navigation menu containing links to other pages. Which semantic element is the best starting point?", options: ["<nav>", "<section>", "<aside>", "<footer>"], answer: 0 },
    { question: "Why is the alt attribute important on an informative image?", options: ["It provides a text alternative when the image cannot be perceived", "It changes the image resolution", "It makes the image load faster", "It automatically creates a caption"], answer: 0 },
    { question: "Which element is designed to represent a standalone item such as a blog post or news article?", options: ["<article>", "<span>", "<label>", "<br>"], answer: 0 },
    { question: "A form asks for an email address. Which input type gives the browser useful built-in email validation?", options: ["email", "text", "mailbox", "validate-email"], answer: 0 },
  ],
  "CSS Fundamentals": [
    { question: "An element has width: 200px, padding: 20px on both sides, and border: 5px on both sides. With the default content-box model, what is its total rendered width?", options: ["250px", "220px", "240px", "200px"], answer: 0 },
    { question: "Which selector targets every <p> element inside an element with class card, at any nesting level?", options: [".card p", ".card + p", ".card > p", "p.card"], answer: 0 },
    { question: "Two rules target the same element. One is .card { color: blue; } and the other is #main .card { color: red; }. Which color wins when both otherwise apply?", options: ["Red, because the ID selector gives the rule higher specificity", "Blue, because class selectors always override IDs", "Whichever rule appears first", "The browser randomly chooses"], answer: 0 },
    { question: "You need three cards to share one row, with equal flexible widths and consistent gaps. Which layout is most directly suited to this requirement?", options: ["CSS Grid or Flexbox", "Only float:left", "Only position:absolute", "Only inline styles"], answer: 0 },
    { question: "What does margin primarily control?", options: ["Space outside an element's border", "Space between text characters", "The element's font size", "The element's background image"], answer: 0 },
  ],
  "JavaScript Fundamentals": [
    { question: "What is the value of x after this code runs: let x = 5; x += 3;", options: ["8", "2", "15", "53"], answer: 0 },
    { question: "Which declaration creates a block-scoped variable that can be reassigned?", options: ["let", "const", "varOnly", "static"], answer: 0 },
    { question: "What does a function return when it reaches a return statement with a value?", options: ["That value is sent back to the caller", "The program always terminates", "The value is printed automatically", "The function becomes asynchronous"], answer: 0 },
    { question: "Which comparison checks both value and type without coercion?", options: ["===", "==", "=", "!==="], answer: 0 },
    { question: "What is logged by console.log(2 + '3') in JavaScript?", options: ["23", "5", "NaN", "Error"], answer: 0 },
  ],
  "React Fundamentals": [
    { question: "What is the main purpose of a React component?", options: ["Encapsulate reusable UI and behavior", "Replace the browser", "Store SQL tables", "Compile CSS into Java"], answer: 0 },
    { question: "Which syntax is commonly used to embed JavaScript expressions inside JSX?", options: ["Curly braces { }", "Square brackets [ ]", "Double brackets [[ ]]", "Angle brackets < > only"], answer: 0 },
    { question: "If a parent component passes name={\"Sam\"} to a child component, how does the child normally access it?", options: ["Through props", "Through CSS", "Through the DOM id only", "Through localStorage automatically"], answer: 0 },
    { question: "Why should a list rendered with map usually provide a stable key for each item?", options: ["It helps React identify items across renders", "It makes JavaScript execute faster in every case", "It encrypts the list", "It prevents all re-renders"], answer: 0 },
    { question: "Which React hook is commonly used to store component state?", options: ["useState", "useHTML", "useStyle", "useDOMOnly"], answer: 0 },
  ],
  "Python for AI": [
    { question: "Which Python structure is best suited for an ordered collection that can contain repeated values?", options: ["list", "set", "dictionary key", "boolean"], answer: 0 },
    { question: "What does len([10, 20, 30]) return?", options: ["3", "2", "30", "60"], answer: 0 },
    { question: "Which library is commonly used for numerical array operations in Python-based AI workflows?", options: ["NumPy", "Flask", "BeautifulSoup", "Tkinter"], answer: 0 },
    { question: "Why are functions useful in an AI project?", options: ["They package reusable logic into callable units", "They automatically train every model", "They replace datasets", "They remove the need for variables"], answer: 0 },
    { question: "What does a Python if statement primarily control?", options: ["Conditional execution", "Database storage", "Image resolution", "Package installation"], answer: 0 },
  ],
  "Machine Learning Fundamentals": [
    { question: "A model learns from examples containing input features and known target labels. What learning setting is this?", options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning only", "Random search"], answer: 0 },
    { question: "Why should a dataset usually be split into training and test data?", options: ["To evaluate how well the model generalizes to unseen data", "To make every model perfect", "To remove all features", "To guarantee zero error"], answer: 0 },
    { question: "A model performs extremely well on training data but poorly on unseen data. What issue does this suggest?", options: ["Overfitting", "Underflow", "Compilation", "Tokenization"], answer: 0 },
    { question: "Which task is a classification problem?", options: ["Predict whether an email is spam or not spam", "Predict tomorrow's temperature as 31.4°C", "Predict house price as ₹50 lakh", "Estimate continuous rainfall amount"], answer: 0 },
    { question: "Why is feature scaling often useful for distance-based algorithms?", options: ["It prevents features with larger numeric ranges from dominating distance calculations", "It removes the target variable", "It guarantees linear relationships", "It creates labels automatically"], answer: 0 },
  ],
  "Statistics": [
    { question: "For the values 2, 4, 6, 8, what is the arithmetic mean?", options: ["5", "4", "6", "20"], answer: 0 },
    { question: "Which measure is generally more resistant to a single extreme outlier?", options: ["Median", "Mean", "Variance", "Range"], answer: 0 },
    { question: "What does standard deviation primarily describe?", options: ["How spread out observations are around the mean", "The number of rows in a dataset", "The largest observation only", "The data type of a column"], answer: 0 },
    { question: "If two events cannot occur together, they are described as what?", options: ["Mutually exclusive", "Identical", "Continuous", "Dependent by definition"], answer: 0 },
    { question: "A correlation close to +1 indicates what kind of linear relationship?", options: ["Strong positive linear association", "Strong negative linear association", "No linear association", "Guaranteed causation"], answer: 0 },
  ],
  "Pandas": [
    { question: "What is a pandas DataFrame?", options: ["A two-dimensional labeled data structure", "A Python web server", "A machine-learning algorithm", "A visualization image file"], answer: 0 },
    { question: "Which pandas method is commonly used to inspect the first few rows?", options: ["head()", "start()", "firstRows()", "peekTable()"], answer: 0 },
    { question: "What does dropna() commonly help with?", options: ["Handling rows or columns containing missing values", "Sorting every column alphabetically", "Training a neural network", "Creating a database server"], answer: 0 },
    { question: "Why is groupby() useful?", options: ["It lets you split data into groups and apply calculations", "It permanently deletes duplicate rows", "It converts every column to text", "It downloads datasets from the internet"], answer: 0 },
    { question: "If df['age'] > 18 is used as a boolean filter, what does it identify?", options: ["Rows whose age value is greater than 18", "Columns named 18", "The DataFrame index only", "All missing values"], answer: 0 },
  ],
  "Introduction to Film Direction": [
    { question: "Which responsibility is most central to a film director?", options: ["Shaping the creative interpretation of the story and coordinating its execution", "Managing only the film's accounting", "Operating every camera personally", "Writing every line of dialogue alone"], answer: 0 },
    { question: "Why does a director study a script before production?", options: ["To understand story beats, characters, scenes and directorial choices", "To decide the cinema ticket price", "To replace the editor", "To avoid communicating with the crew"], answer: 0 },
    { question: "Which choice is an example of visual storytelling?", options: ["Using framing and camera placement to communicate a character's isolation", "Changing the file name of the script", "Choosing the production company's email address", "Printing extra copies of the call sheet"], answer: 0 },
    { question: "What is blocking in filmmaking mainly concerned with?", options: ["Where actors and other elements are positioned and move within a scene", "Compressing the final video file", "Writing database queries", "Choosing a film's distribution platform"], answer: 0 },
    { question: "A director wants a scene to feel tense. Which combination is most relevant to the directorial decision?", options: ["Performance, framing, pacing, sound and visual choices", "Only the poster font", "Only the ticket price", "Only the camera brand"], answer: 0 },
  ],
  "Script Breakdown": [
    { question: "What is the main purpose of a script breakdown?", options: ["Identify practical production elements needed for each scene", "Rewrite every scene automatically", "Choose the cinema seating layout", "Replace the shooting schedule"], answer: 0 },
    { question: "Which item would normally be identified during a scene breakdown?", options: ["Characters, props, locations and special requirements", "Only the film title", "Only the director's biography", "Only audience reviews"], answer: 0 },
    { question: "Why is scene-by-scene breakdown useful before filming?", options: ["It helps production teams prepare resources and plan the shoot", "It guarantees the final film needs no editing", "It removes the need for actors", "It determines the audience's final rating"], answer: 0 },
    { question: "If a scene requires rain, why should that be identified during planning?", options: ["It affects equipment, scheduling, location and production coordination", "It changes the screenplay's author", "It eliminates cinematography", "It makes rehearsals unnecessary"], answer: 0 },
    { question: "A strong breakdown should connect the script to what kind of information?", options: ["Practical requirements for production", "Only social-media comments", "Only poster design", "Only box-office estimates"], answer: 0 },
  ],
  "Directing a Scene": [
    { question: "Before shooting a scene, what should a director communicate clearly to the team?", options: ["The scene's intention, performance direction and required visual coverage", "Only the lunch menu", "Only the final poster design", "Only the film's release date"], answer: 0 },
    { question: "Why is rehearsal useful for a director?", options: ["It helps refine performance, blocking and practical choices before the take", "It permanently replaces filming", "It removes the need for a script", "It guarantees every take will be identical"], answer: 0 },
    { question: "If an actor's performance does not match the scene's intention, what should the director do?", options: ["Give clear, constructive direction connected to the character and scene objective", "Ignore the issue", "Change the film title", "Delete the scene immediately"], answer: 0 },
    { question: "What does coverage refer to in a filmed scene?", options: ["The set of shots needed to effectively capture the action and edit the scene", "The number of cinema seats", "The size of the poster", "The film's social-media followers"], answer: 0 },
    { question: "What is a good reason to plan camera movement before a take?", options: ["It ensures the movement supports the scene rather than becoming distracting", "It makes actors unnecessary", "It automatically edits the film", "It determines the film's budget by itself"], answer: 0 },
  ],
  "Kitchen Basics": [
    { question: "Why is mise en place useful in a professional kitchen?", options: ["It prepares ingredients and tools before cooking", "It means serving food without preparation", "It replaces food safety procedures", "It refers only to cleaning floors"], answer: 0 },
    { question: "Which practice reduces the chance of cross-contamination?", options: ["Using separate clean tools or boards for different raw foods when appropriate", "Using the same dirty knife for everything", "Leaving raw food uncovered beside ready-to-eat food", "Skipping handwashing"], answer: 0 },
    { question: "Why should a chef organize ingredients before starting a recipe?", options: ["It reduces interruptions and helps maintain a consistent workflow", "It makes cooking unnecessary", "It guarantees every dish has the same taste", "It removes the need to measure ingredients"], answer: 0 },
    { question: "Which item is a measuring tool commonly used in cooking?", options: ["Measuring cup", "Cutting board", "Tongs", "Whisk"], answer: 0 },
    { question: "What should you generally do before handling ready-to-eat food after handling raw ingredients?", options: ["Wash hands and clean or change contaminated equipment as appropriate", "Continue without cleaning", "Only wipe hands on an apron", "Add more seasoning"], answer: 0 },
  ],
  "Knife Skills": [
    { question: "What is the main purpose of using a stable cutting board?", options: ["To reduce slipping while cutting", "To sharpen the knife automatically", "To cook ingredients", "To replace a knife guard"], answer: 0 },
    { question: "When making repeated cuts, why is a consistent cutting size useful?", options: ["Pieces cook more evenly", "It guarantees faster cooking for every food", "It removes the need for heat", "It changes the food's nutritional value"], answer: 0 },
    { question: "What should you do if a knife becomes difficult to control because it is dull?", options: ["Stop and safely sharpen or replace it using proper technique", "Press harder and cut faster", "Hold the blade directly", "Ignore the problem"], answer: 0 },
    { question: "Why is the guiding hand commonly kept in a protected position while cutting?", options: ["To keep fingertips away from the cutting path", "To make the knife heavier", "To increase the food temperature", "To make the board softer"], answer: 0 },
    { question: "Which cut produces long, thin strips?", options: ["Julienne", "Dice", "Chop", "Mince"], answer: 0 },
  ],
  "Cooking Methods": [
    { question: "Which cooking method uses hot water below or around its boiling point to cook food?", options: ["Simmering", "Broiling", "Roasting", "Grilling"], answer: 0 },
    { question: "What is the main heat-transfer environment in roasting?", options: ["Hot dry air in an oven", "Cold water", "Ice only", "Unheated steam"], answer: 0 },
    { question: "Which method generally uses direct heat from below or above to brown food quickly?", options: ["Grilling or broiling", "Poaching", "Steaming", "Cold soaking"], answer: 0 },
    { question: "Why can steaming help preserve the shape and moisture of delicate foods?", options: ["Food cooks through gentle moist heat", "Food is always exposed to direct flame", "It removes all water from food", "It requires freezing first"], answer: 0 },
    { question: "When pan-frying, what should be controlled to avoid burning the outside before the inside cooks?", options: ["Heat level and cooking time", "Only the plate color", "The dining room lighting", "The recipe title"], answer: 0 },
  ],
  "Design Principles": [
    { question: "What does visual hierarchy help a viewer understand?", options: ["Which information should receive attention first", "Which file format is largest", "How fast a computer runs", "How to write database queries"], answer: 0 },
    { question: "Why is alignment important in a layout?", options: ["It creates visual relationships and makes content easier to scan", "It automatically improves image resolution", "It guarantees accessibility", "It replaces typography"], answer: 0 },
    { question: "What does contrast help create?", options: ["Differences that make important elements stand out", "Identical visual weight everywhere", "Automatic animation", "Database relationships"], answer: 0 },
    { question: "Why can excessive decoration hurt a design?", options: ["It can compete with the content and reduce clarity", "It always increases accessibility", "It guarantees faster loading", "It makes every element equally important"], answer: 0 },
    { question: "A design repeats the same spacing and visual patterns across screens. Which principle is being reinforced?", options: ["Consistency", "Randomness", "Ambiguity", "Compression"], answer: 0 },
  ],
  "Marketing Fundamentals": [
    { question: "What is the purpose of identifying a target audience?", options: ["To understand who the marketing message is intended to serve", "To guarantee every person will buy", "To remove the need for research", "To choose a programming language"], answer: 0 },
    { question: "Why is a clear value proposition useful?", options: ["It communicates why an offering is relevant to the intended audience", "It replaces all customer research", "It guarantees viral growth", "It is only used for accounting"], answer: 0 },
    { question: "A campaign gets many clicks but very few sign-ups. What should a marketer investigate next?", options: ["The conversion path and landing-page experience", "Only the logo color", "The keyboard layout", "The office location"], answer: 0 },
    { question: "What is market segmentation?", options: ["Dividing a broad market into meaningful groups", "Deleting customers from a database", "Writing one message for every possible audience", "Changing a product's programming language"], answer: 0 },
    { question: "Why should marketing claims be supported by evidence?", options: ["To make communication accurate and credible", "To make every campaign identical", "To avoid measuring results", "To eliminate customer feedback"], answer: 0 },
  ],
};

function genericQuizForLesson(title, description) {
  const clean = title.replace(/\s+/g, " ").trim();
  return [
    {
      question: `You are learning ${clean}. Which approach is most useful for building real understanding?`,
      options: ["Study the concept, apply it, and review mistakes", "Memorize the title only", "Skip practice completely", "Avoid examples"],
      answer: 0,
    },
    {
      question: `A learner can explain the definition of ${clean} but cannot use it in a practical task. What is the main gap?`,
      options: ["Application and practice", "The lesson title", "The browser theme", "The page background"],
      answer: 0,
    },
    {
      question: `Which activity best checks whether you can actually use ${clean}?`,
      options: ["Solve a new problem or complete a relevant task", "Read the heading once", "Copy the lesson title", "Skip all examples"],
      answer: 0,
    },
    {
      question: `If your first attempt at a ${clean} task fails, what is the most useful next step?`,
      options: ["Inspect the mistake, revise the approach, and try again", "Delete all notes", "Stop practicing", "Change the topic immediately"],
      answer: 0,
    },
    {
      question: `Which learning sequence best supports mastery of ${clean}?`,
      options: ["Understand → practice → get feedback → improve", "Guess → skip → forget", "Memorize → never apply", "Watch → stop → never review"],
      answer: 0,
    },
  ];
}

function getQuizForLesson(title, description) {
  if (quizBanks[title]) {
    return quizBanks[title].map((question) => ({ ...question, options: [...question.options] }));
  }

  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("html") || text.includes("accessibility")) return quizBanks["HTML Fundamentals"];
  if (text.includes("css") || text.includes("responsive design")) return quizBanks["CSS Fundamentals"];
  if (text.includes("javascript") || text.includes("dom") || text.includes("async")) return quizBanks["JavaScript Fundamentals"];
  if (text.includes("react") || text.includes("hooks")) return quizBanks["React Fundamentals"];
  if (text.includes("python")) return quizBanks["Python for AI"];
  if (text.includes("machine learning") || text.includes("regression") || text.includes("classification") || text.includes("model evaluation")) return quizBanks["Machine Learning Fundamentals"];
  if (text.includes("director") || text.includes("film") || text.includes("filmmaking") || text.includes("cinematography") || text.includes("script") || text.includes("storyboard") || text.includes("actor")) {
    if (text.includes("script breakdown")) return quizBanks["Script Breakdown"];
    if (text.includes("directing a scene")) return quizBanks["Directing a Scene"];
    return quizBanks["Introduction to Film Direction"];
  }
  if (text.includes("statistics") || text.includes("probability")) return quizBanks["Statistics"];
  if (text.includes("pandas") || text.includes("numpy") || text.includes("data visualization")) return quizBanks["Pandas"];
  if (text.includes("kitchen") || text.includes("food safety")) return quizBanks["Kitchen Basics"];
  if (text.includes("knife")) return quizBanks["Knife Skills"];
  if (text.includes("cooking") || text.includes("sauce") || text.includes("seasoning")) return quizBanks["Cooking Methods"];
  if (text.includes("design") || text.includes("typography") || text.includes("colour") || text.includes("wireframe")) return quizBanks["Design Principles"];
  if (text.includes("marketing") || text.includes("audience") || text.includes("brand") || text.includes("seo") || text.includes("campaign")) return quizBanks["Marketing Fundamentals"];

  return genericQuizForLesson(title, description);
}

function normalizeSmartRoadmap(goal, data) {
  const safeGoal = goal.trim();
  const stages = Array.isArray(data?.stages) ? data.stages : [];

  if (!stages.length) throw new Error("The AI returned an empty roadmap.");

  return {
    title: data.title || `${safeGoal} Roadmap`,
    name: data.name || safeGoal,
    icon: data.icon || "🎯",
    color: data.color || "blue",
    stages: stages.map((stage, stageIndex) => ({
      title: stage.title || `Stage ${stageIndex + 1}`,
      lessons: (Array.isArray(stage.lessons) ? stage.lessons : []).map((lesson, lessonIndex) => ({
        title: lesson.title || `Lesson ${lessonIndex + 1}`,
        description: lesson.description || `Learn the key skills required for ${safeGoal}.`,
        video: createVideoUrl(safeGoal, lesson.title || safeGoal),
        practice: Array.isArray(lesson.practice) && lesson.practice.length
          ? lesson.practice.slice(0, 3)
          : [
              `Study ${lesson.title || "this topic"} carefully.`,
              `Apply ${lesson.title || "this topic"} in a small practical task.`,
              `Write down the important points you learned.`,
            ],
        quiz: [],
      })),
    })),
  };
}

async function buildRoadmap(goal) {
  const response = await fetch("https://lifemap-8a58.onrender.com/api/generate-roadmap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Could not generate the roadmap.");
  return normalizeSmartRoadmap(goal, data);
}

/* =========================================================
   APP
========================================================= */


const lifeMapQuotes = [
  'You don’t need to have everything figured out. Just take the next step.',
  'Small progress is still progress.',
  'Your future is built by what you choose to learn today.',
  'Every skill you have today once felt difficult.',
  'Take your time. Learn it well.',
  'A clear goal turns effort into direction.',
  'Keep learning. Your future self will thank you.',
  'There is no perfect path. There is only the next step.',
  'Start where you are. Build from there.',
  'One lesson today can open a door tomorrow.',
  'Difficult does not mean impossible. It means there is something new to learn.',
  'You are closer than you think. Keep moving.',
  'Learning takes time. Give yourself room to grow.',
  'Progress may feel slow, but it is still progress.',
  'Your goal may be far away, but every step counts.',
  'Curiosity is often the first step toward mastery.',
  'Keep going. The version of you you are building is worth it.',
  'Great things are built one small step at a time.',
  'Do not rush the journey. Build the foundation well.',
  'Every expert started with a first step.',
  'A little progress today can change tomorrow.',
  'Your next step matters more than your last mistake.',
  'Learn it. Practice it. Build it. Repeat.',
  'You do not have to be perfect to make progress.',
  'The best time to start learning was yesterday. The next best time is now.',
  'Your effort today becomes your confidence tomorrow.',
  'Keep showing up. Skills grow with consistency.',
  'A goal becomes real when you start working toward it.',
  'One step at a time is still moving forward.',
  'Do not compare your beginning with someone else’s middle.',
  'You are learning something your future self will need.',
  'Stay curious. Keep building.',
  'Good things take time. Great skills take practice.',
  'The journey gets easier when you know your next step.',
  'Learning is not about knowing everything. It is about understanding more each day.',
  'You can start small and still dream big.',
  'Every challenge is a chance to learn something new.',
  'Keep your goal in sight and take the next step.',
  'Your progress does not need to be loud to be real.',
  'Believe in the process, even when the results take time.',
  'A slow step forward is better than standing still.',
  'The road becomes clearer once you start walking.',
  'Build skills today. Create opportunities tomorrow.',
  'Your goals deserve consistent effort.',
  'Keep learning. Keep improving. Keep going.',
  'You are not behind. You are building your own path.',
  'Focus on progress, not perfection.',
  'One good habit can change the direction of your journey.',
  'Your journey is yours. Keep moving at your pace.',
  'A strong future starts with small decisions today.',
  'Do something today that your future self will appreciate.',
  'Every attempt teaches you something.',
  'The first version does not have to be perfect.',
  'Start with what you know. Learn what you do not.',
  'Confidence grows when you keep trying.',
  'Your skills grow every time you practice.',
  'The hardest part is often simply starting.',
  'Stay patient with yourself. You are still growing.',
  'A little consistency can create a big difference.',
  'Keep going. Your story is still being written.',
  'Your next opportunity may begin with what you learn today.',
  'Learning is an investment in the person you are becoming.',
  'Do not wait for motivation. Build momentum.',
  'Your goals are worth the effort.',
  'Small actions can create meaningful change.',
  'Keep your curiosity alive.',
  'Progress starts with a decision to begin.',
  'Every new skill opens a new possibility.',
  'You are capable of learning more than you think.',
  'Give yourself permission to be a beginner.',
  'Practice turns knowledge into ability.',
  'Your effort is creating something bigger than today.',
  'Stay focused on the next useful step.',
  'A journey of growth is made of ordinary days.',
  'Keep building, even when nobody is watching.',
  'Your future has room for everything you are learning now.',
  'One focused hour can move you closer to your goal.',
  'Do not underestimate small beginnings.',
  'Learning something difficult today makes tomorrow easier.',
  'Your path does not need to look like anyone else’s.',
  'Keep your eyes on the goal and your feet on the next step.',
  'Every day is another chance to improve.',
  'The more you practice, the more possible becomes.',
  'Your mistakes are part of the learning process.',
  'Keep asking questions. That is how growth begins.',
  'You do not need all the answers to begin.',
  'A good beginning is simply a beginning.',
  'Your potential grows when you give it practice.',
  'Stay consistent. Results take time.',
  'The future is built one decision at a time.',
  'Learn today. Build tomorrow.',
  'Your journey is worth taking.',
  'Keep moving forward, even if the step is small.',
  'There is always something new worth learning.',
  'Your effort today can become your opportunity tomorrow.',
  'Be patient. Progress has its own pace.',
  'Start small. Think big. Keep going.',
  'Your goal is waiting. Take the next step.',
  'A strong foundation makes difficult things easier.',
  'The work you do quietly can shape your future loudly.',
  'Skill is built through repetition, reflection, and patience.',
  'You do not need a perfect plan to make a meaningful start.',
  'The next useful step is enough for today.',
  'Keep the goal clear and let the process do its work.',
  'Good progress is often made in small, ordinary moments.',
  'Learn with intention. Practice with patience.',
  'Every chapter starts before you feel ready.',
  'Your pace can be steady without being fast.',
  'A thoughtful start can save a lot of time later.',
  'The skills you build now can create choices later.',
  'Stay curious enough to keep improving.',
  'Mastery is built from many small improvements.',
  'You are allowed to learn one piece at a time.',
  'Keep your standards high and your next step simple.',
  'Progress becomes powerful when it becomes consistent.',
  'Build something small today. Let it lead to something bigger tomorrow.',
];

const polishStyles = `
  @media print {
    body * { visibility: hidden !important; }
    .certificate-print, .certificate-print * { visibility: visible !important; }
    .certificate-print { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; box-shadow: none !important; border-radius: 0 !important; }
    .certificate-actions { display: none !important; }
  }
  html { scroll-behavior: smooth; }

  .app { overflow-x: hidden; }

  .navbar, .hero, .dashboard-section, .roadmap-section,
  .features-section, .final-cta, .footer, .lesson-view {
    animation: lifemapFadeUp .55s ease both;
  }

  .feature-card, .stage-card, .lesson-card, .learning-card,
  .badge-card, .saved-goal-chip, .practice-item, .quiz-question-box {
    transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
  }

  .feature-card:hover, .stage-card:hover, .learning-card:hover {
    transform: translateY(-4px);
  }

  .lesson-card:hover, .practice-item:hover, .saved-goal-chip:hover {
    transform: translateY(-2px);
  }

  button, a, input { -webkit-tap-highlight-color: transparent; }

  button:focus-visible, a:focus-visible, input:focus-visible {
    outline: 3px solid rgba(79, 70, 229, .28);
    outline-offset: 3px;
  }

  .empty-state {
    border: 1px dashed rgba(100, 116, 139, .35);
    border-radius: 20px;
    padding: 34px 20px;
    text-align: center;
    background: rgba(248, 250, 252, .75);
    margin-top: 18px;
  }

  .empty-state-icon { font-size: 34px; margin-bottom: 8px; }
  .empty-state h3 { margin: 0 0 7px; }
  .empty-state p { margin: 0; color: #64748b; }

  .mobile-menu-button {
    min-width: 42px;
    min-height: 42px;
    border-radius: 12px;
  }

  @keyframes lifemapFadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .lifemap-waiting-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(248, 250, 252, .72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .lifemap-waiting-card {
    width: min(680px, 100%);
    padding: 42px 36px 36px;
    border: 1px solid rgba(148, 163, 184, .22);
    border-radius: 28px;
    background: rgba(255, 255, 255, .94);
    box-shadow: 0 30px 90px rgba(15, 23, 42, .16);
    text-align: center;
    animation: lifemapWaitIn .45s ease both;
  }

  .lifemap-waiting-mark {
    width: 58px;
    height: 58px;
    margin: 0 auto 20px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    color: white;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    font-size: 25px;
    box-shadow: 0 14px 35px rgba(79, 70, 229, .25);
    animation: lifemapPulse 1.8s ease-in-out infinite;
  }

  .lifemap-waiting-card h2 {
    margin: 0;
    font-size: clamp(28px, 5vw, 42px);
    letter-spacing: -.03em;
    color: #0f172a;
  }

  .lifemap-waiting-quote {
    min-height: 58px;
    margin: 20px auto 16px;
    max-width: 570px;
    color: #334155;
    font-size: clamp(17px, 2.5vw, 21px);
    line-height: 1.65;
    animation: lifemapQuoteIn .5s ease both;
  }

  .lifemap-waiting-subtitle {
    margin: 0;
    color: #64748b;
    font-size: 14px;
  }

  .lifemap-waiting-dots {
    display: flex;
    justify-content: center;
    gap: 7px;
    margin-top: 25px;
  }

  .lifemap-waiting-dots span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #6366f1;
    opacity: .25;
    animation: lifemapDot 1.2s ease-in-out infinite;
  }

  .lifemap-waiting-dots span:nth-child(2) { animation-delay: .18s; }
  .lifemap-waiting-dots span:nth-child(3) { animation-delay: .36s; }

  @keyframes lifemapWaitIn {
    from { opacity: 0; transform: translateY(18px) scale(.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes lifemapQuoteIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes lifemapPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }

  @keyframes lifemapDot {
    0%, 100% { opacity: .25; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-3px); }
  }

  @media (max-width: 900px) {
    .navbar { padding-left: 18px !important; padding-right: 18px !important; }
    .hero-content, .lesson-container { width: min(94%, 760px) !important; }
    .features-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    .lesson-grid { grid-template-columns: 1fr !important; }
    .final-cta { gap: 22px !important; }
  }

  @media (max-width: 640px) {
    .navbar { min-height: 68px; }
    .brand-button strong { font-size: 16px !important; }
    .brand-button small { font-size: 10px !important; }

    .nav-links.mobile-open {
      display: flex !important;
      position: absolute;
      top: 68px;
      left: 12px;
      right: 12px;
      z-index: 50;
      flex-direction: column;
      padding: 12px;
      border-radius: 18px;
      background: rgba(255,255,255,.97);
      box-shadow: 0 18px 50px rgba(15,23,42,.14);
      border: 1px solid rgba(148,163,184,.18);
    }

    .nav-links.mobile-open button,
    .nav-links.mobile-open a { width: 100%; text-align: left; padding: 12px 14px; }

    .hero { padding-top: 58px !important; padding-bottom: 55px !important; }
    .hero h1 { font-size: clamp(38px, 11vw, 58px) !important; line-height: 1.02 !important; }
    .hero-text { font-size: 16px !important; }
    .goal-box { flex-direction: column !important; gap: 10px !important; }
    .goal-input-wrapper, .create-button { width: 100% !important; box-sizing: border-box; }

    .features-grid { grid-template-columns: 1fr !important; }
    .roadmap-meta { flex-direction: column !important; align-items: flex-start !important; gap: 14px; }
    .stage-content { padding: 18px !important; }
    .stage-header { gap: 12px; align-items: flex-start !important; }
    .lesson-card { padding: 16px !important; }

    .lesson-hero h1 { font-size: clamp(34px, 10vw, 48px) !important; }
    .learning-card { padding: 20px !important; }
    .card-heading { align-items: flex-start !important; }
    .quiz-option { font-size: 14px !important; }
    .final-cta { padding: 42px 20px !important; }

    .saved-goals-row { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 6px; }
  }
`;

function normalizeGoalKey(value) {
  return String(value || "").trim().toLowerCase();
}

function createCertificateId(goal) {
  const prefix = normalizeGoalKey(goal)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 12)
    .toUpperCase() || "GOAL";
  const stamp = Date.now().toString(36).toUpperCase().slice(-8);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LM-${prefix}-${stamp}-${random}`;
}

const authRequest = async (endpoint, options = {}) => {
  const response = await fetch(`https://lifemap-8a58.onrender.com${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "Authentication request failed.");
    Object.assign(error, data);
    throw error;
  }
  return data;
};

const authStyles = `
  .lifemap-auth-screen { min-height:100vh; display:grid; place-items:center; padding:28px 18px; background:radial-gradient(circle at top left,#eef2ff 0,#f8fafc 45%,#fff 100%); box-sizing:border-box; }
  .lifemap-auth-card { width:min(440px,100%); background:rgba(255,255,255,.97); border:1px solid #e5e7eb; border-radius:28px; padding:30px; box-shadow:0 24px 70px rgba(15,23,42,.12); box-sizing:border-box; }
  .lifemap-auth-brand { display:flex; align-items:center; gap:12px; margin-bottom:22px; }
  .lifemap-auth-mark { width:46px; height:46px; border-radius:15px; display:grid; place-items:center; background:#4f46e5; color:#fff; font-weight:900; font-size:22px; }
  .lifemap-auth-brand strong { display:block; font-size:22px; color:#111827; }
  .lifemap-auth-brand small { color:#6b7280; }
  .lifemap-auth-title { margin:0 0 7px; color:#111827; font-size:30px; }
  .lifemap-auth-subtitle { margin:0 0 22px; color:#6b7280; line-height:1.55; }
  .lifemap-auth-field { display:block; margin:14px 0; }
  .lifemap-auth-field span { display:block; margin-bottom:7px; font-size:13px; font-weight:800; color:#374151; }
  .lifemap-auth-field input { width:100%; box-sizing:border-box; padding:13px 14px; border:1px solid #d1d5db; border-radius:13px; font:inherit; outline:none; background:#fff; color:#111827 !important; -webkit-text-fill-color:#111827 !important; caret-color:#111827; }
  .lifemap-auth-field input:focus { border-color:#6366f1; box-shadow:0 0 0 3px rgba(99,102,241,.12); }
  .lifemap-auth-error { margin:12px 0; padding:11px 13px; border-radius:12px; background:#fef2f2; color:#b91c1c; font-size:13px; font-weight:700; }
  .lifemap-auth-submit { width:100%; border:0; border-radius:13px; padding:14px; background:#4f46e5; color:#fff; font-weight:900; cursor:pointer; margin-top:8px; }
  .lifemap-auth-submit:disabled { opacity:.65; cursor:wait; }
  .lifemap-auth-switch { margin-top:18px; text-align:center; color:#6b7280; font-size:14px; }
  .lifemap-auth-switch button { border:0; background:none; color:#4f46e5; font-weight:900; cursor:pointer; padding:0; }
  .lifemap-auth-note { margin-top:16px; font-size:12px; color:#9ca3af; text-align:center; line-height:1.5; }
  .lifemap-account-bar { position:fixed; top:14px; right:18px; z-index:100; display:flex; align-items:center; gap:10px; padding:8px 10px 8px 13px; border:1px solid rgba(148,163,184,.25); border-radius:999px; background:rgba(255,255,255,.94); box-shadow:0 10px 28px rgba(15,23,42,.12); backdrop-filter:blur(10px); }
  .lifemap-account-info { display:flex; flex-direction:column; min-width:0; max-width:190px; }
  .lifemap-account-info strong { font-size:13px; color:#111827; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .lifemap-account-info span { font-size:11px; color:#64748b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .lifemap-logout { border:0; border-radius:999px; padding:8px 12px; background:#111827; color:#fff; font-size:12px; font-weight:800; cursor:pointer; }
  .lifemap-account-trigger { border:0; background:transparent; display:flex; align-items:center; gap:9px; padding:0; cursor:pointer; text-align:left; min-width:0; }
  .lifemap-avatar { width:34px; height:34px; border-radius:50%; display:grid; place-items:center; background:#4f46e5; color:#fff; font-weight:900; font-size:14px; flex:0 0 auto; }
  .lifemap-account-chevron { color:#64748b; font-size:18px; line-height:1; margin-left:2px; }
  .lifemap-account-menu { position:absolute; top:calc(100% + 9px); right:0; width:225px; padding:7px; border:1px solid #e5e7eb; border-radius:16px; background:#fff; box-shadow:0 18px 45px rgba(15,23,42,.18); }
  .lifemap-account-menu button { width:100%; display:flex; align-items:center; gap:10px; border:0; background:transparent; color:#1f2937; padding:10px 11px; border-radius:10px; cursor:pointer; font:inherit; font-size:13px; text-align:left; }
  .lifemap-account-menu button:hover { background:#f3f4f6; }
  .lifemap-account-menu button span { flex:1; }
  .lifemap-menu-divider { height:1px; background:#e5e7eb; margin:5px 4px; }
  .lifemap-account-menu .lifemap-menu-logout { color:#b91c1c; font-weight:800; }

  .lifemap-password-overlay { position:fixed; inset:0; z-index:1000; display:grid; place-items:center; padding:20px; background:rgba(15,23,42,.42); backdrop-filter:blur(5px); }
  .lifemap-password-card { width:min(460px,100%); background:#fff; border-radius:24px; padding:26px; box-shadow:0 28px 80px rgba(15,23,42,.25); box-sizing:border-box; }
  .lifemap-password-header { display:flex; justify-content:space-between; gap:18px; align-items:flex-start; margin-bottom:8px; }
  .lifemap-password-header h2 { margin:3px 0 6px; color:#111827; font-size:25px; }
  .lifemap-password-header p:not(.section-tag) { margin:0; color:#64748b; font-size:13px; line-height:1.5; }
  .lifemap-password-close { border:0; background:#f1f5f9; width:36px; height:36px; border-radius:50%; font-size:24px; color:#475569; cursor:pointer; }
  .lifemap-password-actions { display:flex; gap:10px; margin-top:16px; }
  .lifemap-password-actions .lifemap-auth-submit { margin-top:0; flex:1; }
  .lifemap-password-cancel { border:1px solid #d1d5db; border-radius:13px; padding:13px 18px; background:#fff; color:#374151; font-weight:800; cursor:pointer; }
  .lifemap-password-message { margin-top:10px; padding:11px 13px; border-radius:12px; font-size:13px; font-weight:700; }
  .lifemap-password-message.error { background:#fef2f2; color:#b91c1c; }
  .lifemap-password-message.success { background:#ecfdf5; color:#047857; }

  @media (max-width:600px){ .lifemap-account-bar{top:10px;right:10px;max-width:calc(100% - 20px)} .lifemap-account-info{max-width:120px} }

  .lifemap-forgot-link { border:0; background:transparent; color:#4f46e5; font-weight:800; cursor:pointer; padding:8px 0; font-size:13px; text-align:left; }
  .lifemap-forgot-link:hover { text-decoration:underline; }
  .lifemap-reset-overlay { position:fixed; inset:0; z-index:1200; display:grid; place-items:center; padding:20px; background:rgba(15,23,42,.48); backdrop-filter:blur(6px); }
  .lifemap-reset-card { position:relative; width:min(460px,100%); max-height:calc(100vh - 40px); overflow:auto; background:#fff; border-radius:24px; padding:28px; box-shadow:0 28px 80px rgba(15,23,42,.28); box-sizing:border-box; }
  .lifemap-reset-card h2 { margin:18px 0 7px; color:#111827; font-size:25px; }
  .lifemap-reset-card p { margin:0 0 16px; color:#64748b; font-size:13px; line-height:1.5; }
  .lifemap-reset-close { position:absolute; right:18px; top:18px; border:0; background:#f1f5f9; width:36px; height:36px; border-radius:50%; font-size:23px; color:#475569; cursor:pointer; }
  .lifemap-reset-message { margin:10px 0; padding:11px 13px; border-radius:12px; font-size:13px; font-weight:700; }
  .lifemap-reset-message.error { background:#fef2f2; color:#b91c1c; }
  .lifemap-reset-message.success { background:#ecfdf5; color:#047857; }
`;

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataHydrated, setDataHydrated] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [passwordHint, setPasswordHint] = useState("");
  const [loginHint, setLoginHint] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [savedGoals, setSavedGoals] = useState(() =>
    readStorage("lifemap_saved_goals", [])
  );
  const [roadmapCache, setRoadmapCache] = useState(() =>
    readStorage("lifemap_roadmaps_v1", {})
  );
  const [videoCache, setVideoCache] = useState(() =>
    readStorage("lifemap_videos_v1", {})
  );
  const [goalProgress, setGoalProgress] = useState(() => {
    const saved = readStorage("lifemap_goal_progress_v1", null);
    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      return saved;
    }

    const legacyCompleted = readStorage("lifemap_completed", []);
    const legacyPractice = readStorage("lifemap_practice", {});
    const legacyQuizScores = readStorage("lifemap_quiz_scores_v2", {});
    const legacyGoalList = readStorage("lifemap_saved_goals", []);
    const firstGoal = Array.isArray(legacyGoalList) ? legacyGoalList[0] : "";

    if (firstGoal && (legacyCompleted.length || Object.keys(legacyPractice).length || Object.keys(legacyQuizScores).length)) {
      return {
        [normalizeGoalKey(firstGoal)]: {
          completed: legacyCompleted,
          practiceDone: legacyPractice,
          quizScores: legacyQuizScores,
        },
      };
    }

    return {};
  });
  const [lessonSearch, setLessonSearch] = useState("");
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [waitingQuoteIndex, setWaitingQuoteIndex] = useState(0);

  const activeGoalKey = normalizeGoalKey(goal);
  const activeGoalProgress = goalProgress[activeGoalKey] || {
    completed: [],
    practiceDone: {},
    quizScores: {},
    finalAssessment: null,
    finalProject: null,
  };
  const completed = activeGoalProgress.completed || [];
  const practiceDone = activeGoalProgress.practiceDone || {};
  const quizScores = activeGoalProgress.quizScores || {};

  const updateActiveGoalProgress = (updater) => {
    if (!activeGoalKey) return;

    setGoalProgress((previous) => {
      const current = previous[activeGoalKey] || {
        completed: [],
        practiceDone: {},
        quizScores: {},
        finalAssessment: null,
        finalProject: null,
        certificateId: null,
        studentName: "",
      };
      const next = typeof updater === "function" ? updater(current) : updater;

      return {
        ...previous,
        [activeGoalKey]: {
          completed: next.completed || [],
          practiceDone: next.practiceDone || {},
          quizScores: next.quizScores || {},
          finalAssessment: next.finalAssessment ?? null,
          finalProject: next.finalProject ?? null,
          certificateId: next.certificateId ?? null,
          studentName: next.studentName ?? "",
        },
      };
    });
  };

  const setCompleted = (updater) => {
    updateActiveGoalProgress((current) => ({
      ...current,
      completed: typeof updater === "function" ? updater(current.completed || []) : updater,
    }));
  };

  const setPracticeDone = (updater) => {
    updateActiveGoalProgress((current) => ({
      ...current,
      practiceDone: typeof updater === "function" ? updater(current.practiceDone || {}) : updater,
    }));
  };

  const setQuizScores = (updater) => {
    updateActiveGoalProgress((current) => ({
      ...current,
      quizScores: typeof updater === "function" ? updater(current.quizScores || {}) : updater,
    }));
  };

  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);

  const savedFinalAssessment = activeGoalProgress.finalAssessment || null;
  const savedFinalProject = activeGoalProgress.finalProject || null;
  const [finalAssessment, setFinalAssessment] = useState(savedFinalAssessment);
  const [finalAssessmentAnswers, setFinalAssessmentAnswers] = useState({});
  const [finalAssessmentSubmitted, setFinalAssessmentSubmitted] = useState(false);
  const [finalAssessmentLoading, setFinalAssessmentLoading] = useState(false);
  const [finalAssessmentScore, setFinalAssessmentScore] = useState(
    savedFinalAssessment?.score ?? null
  );
  const [finalProject, setFinalProject] = useState(savedFinalProject);
  const [finalProjectDone, setFinalProjectDone] = useState(
    Boolean(savedFinalProject?.completed)
  );
  const [finalProjectLoading, setFinalProjectLoading] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [studentName, setStudentName] = useState(() =>
    readStorage("lifemap_student_name", "")
  );

  const loadAccountData = async () => {
    const response = await authRequest("/api/user/data");
    const data = response.data || {};

    if (data.goalProgress && typeof data.goalProgress === "object") setGoalProgress(data.goalProgress);
    if (data.roadmapCache && typeof data.roadmapCache === "object") setRoadmapCache(data.roadmapCache);
    if (data.videoCache && typeof data.videoCache === "object") setVideoCache(data.videoCache);
    if (Array.isArray(data.savedGoals)) setSavedGoals(data.savedGoals);
    if (typeof data.studentName === "string") setStudentName(data.studentName);
    if (typeof data.goal === "string") setGoal(data.goal);
    if (data.roadmap && typeof data.roadmap === "object") setRoadmap(data.roadmap);

    setDataHydrated(true);
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setAuthError("");
    setLoginHint("");
    setAuthSubmitting(true);

    try {
      const endpoint = authMode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const payload = authMode === "signup"
        ? {
            name: authName,
            email: authEmail,
            password: authPassword,
            passwordHint: passwordHint.trim(),
          }
        : { email: authEmail, password: authPassword };

      const result = await authRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setAuthUser(result.user);
      setAuthPassword("");
      setPasswordHint("");
      setLoginHint("");
      await loadAccountData();
    } catch (error) {
      setAuthError(error.message || "Could not sign in.");

      if (authMode === "login" && error.passwordHint) {
        setLoginHint(error.passwordHint);
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleAccountMenuAction = (action) => {
    setAccountMenuOpen(false);
    if (action === "profile") {
      alert(`My Profile\n\nName: ${authUser?.name || "LifeMap User"}\nEmail: ${authUser?.email || ""}`);
      return;
    }
    if (action === "certificate") {
      if (courseCompleted) {
        setCertificateOpen(true);
        return;
      }
      alert("Complete the course requirements first to unlock your certificate.");
    }
  };

  const handleLogout = async () => {
    try {
      await authRequest("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.warn("Logout request failed", error);
    }

    setAuthUser(null);
    setDataHydrated(false);
    setSelectedLesson(null);
    setCertificateOpen(false);
    setAuthMode("login");
    setAuthPassword("");
  };

  useEffect(() => {
    let active = true;

    const restoreAuth = async () => {
      try {
        const result = await authRequest("/api/auth/me");
        if (!active) return;

        if (result.user) {
          setAuthUser(result.user);
          await loadAccountData();
        } else {
          setDataHydrated(false);
        }
      } catch (error) {
        if (active) {
          setAuthError("Could not connect to the LifeMap account server. Start the Flask backend first.");
        }
      } finally {
        if (active) setAuthLoading(false);
      }
    };

    restoreAuth();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!authUser || !dataHydrated) return;

    const timer = window.setTimeout(() => {
      authRequest("/api/user/data", {
        method: "PUT",
        body: JSON.stringify({
          goalProgress, roadmapCache, videoCache, savedGoals, studentName, goal, roadmap,
        }),
      }).catch((error) => console.warn("Account data sync failed", error));
    }, 500);

    return () => window.clearTimeout(timer);
  }, [authUser, dataHydrated, goalProgress, roadmapCache, videoCache, savedGoals, studentName, goal, roadmap]);

  useEffect(() => {
    if (!isGeneratingRoadmap) return;

    setWaitingQuoteIndex(Math.floor(Math.random() * lifeMapQuotes.length));

    const interval = window.setInterval(() => {
      setWaitingQuoteIndex((previous) =>
        (previous + 1) % lifeMapQuotes.length
      );
    }, 6000);

    document.body.style.overflow = "hidden";

    return () => {
      window.clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [isGeneratingRoadmap]);

  useEffect(() => {
    saveStorage("lifemap_goal_progress_v1", goalProgress);
  }, [goalProgress]);

  useEffect(() => {
    saveStorage("lifemap_roadmaps_v1", roadmapCache);
  }, [roadmapCache]);

  useEffect(() => {
    saveStorage("lifemap_videos_v1", videoCache);
  }, [videoCache]);

  useEffect(() => {
    saveStorage("lifemap_saved_goals", savedGoals);
  }, [savedGoals]);

  useEffect(() => {
    saveStorage("lifemap_student_name", studentName);
  }, [studentName]);

  useEffect(() => {
    const storedAssessment = activeGoalProgress.finalAssessment || null;
    const assessment = storedAssessment?.questions?.length === 15 ? storedAssessment : null;
    const project = activeGoalProgress.finalProject || null;

    setFinalAssessment(assessment);
    setFinalAssessmentScore(assessment?.score ?? null);
    setFinalAssessmentAnswers({});
    setFinalAssessmentSubmitted(false);
    setFinalProject(project);
    setFinalProjectDone(Boolean(project?.completed));
    setCertificateOpen(false);
    setStudentName(activeGoalProgress.studentName || readStorage("lifemap_student_name", ""));

    if (storedAssessment && !assessment) {
      updateActiveGoalProgress((current) => ({
        ...current,
        finalAssessment: null,
      }));
    }
  }, [activeGoalKey]);

  const saveStudentName = (value) => {
    const clean = value.trim();
    setStudentName(clean);
    updateActiveGoalProgress((current) => ({
      ...current,
      studentName: clean,
    }));
  };

  const saveGoalToList = (value) => {
    const clean = value.trim();
    if (!clean) return;

    setSavedGoals((previous) => {
      const withoutDuplicate = previous.filter(
        (item) => item.toLowerCase() !== clean.toLowerCase()
      );
      return [clean, ...withoutDuplicate].slice(0, 8);
    });
  };

  const showRoadmapAndScroll = (newRoadmap, clean) => {
    setGoal(clean);
    setRoadmap(newRoadmap);
    setSelectedLesson(null);
    setAnswers({});
    setQuizSubmitted(false);
    setLessonSearch("");
    setFinalAssessmentAnswers({});
    setFinalAssessmentSubmitted(false);
    setCertificateOpen(false);

    setTimeout(() => {
      document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const generateForGoal = async (value, shouldScroll = true) => {
    const clean = value.trim();
    if (!clean) return null;

    const cacheKey = normalizeGoalKey(clean);
    const cachedRoadmap = roadmapCache[cacheKey];

    setGenerationError("");
    setSelectedLesson(null);
    setAnswers({});
    setQuizSubmitted(false);
    setLessonSearch("");

    if (cachedRoadmap) {
      setGoal(clean);
      setRoadmap(cachedRoadmap);
      saveGoalToList(clean);

      if (shouldScroll) {
        setTimeout(() => {
          document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      return cachedRoadmap;
    }

    setIsGeneratingRoadmap(true);

    try {
      const newRoadmap = await buildRoadmap(clean);
      setGoal(clean);
      setRoadmap(newRoadmap);
      setRoadmapCache((previous) => ({
        ...previous,
        [cacheKey]: newRoadmap,
      }));
      saveGoalToList(clean);

      if (shouldScroll) {
        setTimeout(() => {
          document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
      return newRoadmap;
    } catch (error) {
      const message = error?.message || "Could not generate the roadmap.";
      setGenerationError(message);
      alert(message);
      return null;
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  const loadGoal = async (value) => {
    await generateForGoal(value);
  };

  const removeSavedGoal = (value) => {
    const key = normalizeGoalKey(value);
    setSavedGoals((previous) => previous.filter((item) => item !== value));
    setRoadmapCache((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
    setGoalProgress((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });

    if (normalizeGoalKey(goal) === key) {
      setGoal("");
      setRoadmap(null);
      setSelectedLesson(null);
    }
  };

  const createRoadmap = async () => {
    const cleanGoal = goal.trim();
    if (!cleanGoal) {
      alert("Please enter your goal first.");
      return;
    }
    await generateForGoal(cleanGoal);
  };

  const useQuickGoal = async (value) => {
    setGoal(value);
    await generateForGoal(value);
  };

  const openLesson = async (lesson) => {
    const fallbackQuiz = getQuizForLesson(lesson.title, lesson.description)
      .slice(0, 5)
      .map((question) => ({ ...question, options: [...question.options] }));

    const videoKey = `${normalizeGoalKey(goal)}::${normalizeGoalKey(lesson.title)}`;
    const cachedVideo = videoCache[videoKey];

    setSelectedLesson({
      ...lesson,
      video: cachedVideo?.url || lesson.video,
      videoTitle: cachedVideo?.title || "Finding a relevant tutorial...",
      videoLoading: !cachedVideo,
      quiz: fallbackQuiz,
    });
    setAnswers({});
    setQuizSubmitted(false);
    setQuizLoading(true);
    setMobileMenu(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (!cachedVideo) {
      try {
        const videoResponse = await fetch("https://lifemap-8a58.onrender.com/api/find-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            goal,
            lessonTitle: lesson.title,
            lessonDescription: lesson.description,
          }),
        });

        const videoData = await videoResponse.json().catch(() => ({}));

        if (videoResponse.ok && videoData.videoUrl) {
          const videoInfo = {
            url: videoData.videoUrl,
            title: videoData.videoTitle || "Related tutorial",
            channel: videoData.channel || "YouTube",
          };

          setVideoCache((previous) => ({
            ...previous,
            [videoKey]: videoInfo,
          }));

          setSelectedLesson((current) =>
            current && current.title === lesson.title
              ? {
                  ...current,
                  video: videoInfo.url,
                  videoTitle: videoInfo.title,
                  videoChannel: videoInfo.channel,
                  videoLoading: false,
                }
              : current
          );
        } else {
          setSelectedLesson((current) =>
            current && current.title === lesson.title
              ? { ...current, videoLoading: false }
              : current
          );
        }
      } catch (error) {
        console.warn("Specific video could not be loaded; using the lesson video fallback.", error);
        setSelectedLesson((current) =>
          current && current.title === lesson.title
            ? { ...current, videoLoading: false }
            : current
        );
      }
    }

    try {
      const response = await fetch("https://lifemap-8a58.onrender.com/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal,
          lessonTitle: lesson.title,
          lessonDescription: lesson.description,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && Array.isArray(data.quiz) && data.quiz.length === 5) {
        setSelectedLesson((current) =>
          current && current.title === lesson.title
            ? {
                ...current,
                quiz: data.quiz.slice(0, 5).map((question) => ({
                  question: question.question,
                  options: Array.isArray(question.options) ? question.options.slice(0, 4) : [],
                  answer: Number.isInteger(question.answer) ? question.answer : 0,
                })),
              }
            : current
        );
      }
    } catch (error) {
      console.warn("AI quiz could not be loaded; using the local topic quiz.", error);
    } finally {
      setQuizLoading(false);
    }
  };

  const backToRoadmap = () => {
    setSelectedLesson(null);
    setAnswers({});
    setQuizSubmitted(false);

    setTimeout(() => {
      document
        .getElementById("roadmap")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const goHome = () => {
    setSelectedLesson(null);
    setMobileMenu(false);

    setTimeout(() => {
      document
        .getElementById("home")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const completeLesson = () => {
    if (!selectedLesson) return;

    if (!completed.includes(selectedLesson.title)) {
      setCompleted((previous) => [
        ...previous,
        selectedLesson.title,
      ]);
    }
  };

  const togglePractice = (index) => {
    if (!selectedLesson) return;

    const key = `${selectedLesson.title}-${index}`;

    setPracticeDone((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleAnswer = (questionIndex, optionIndex) => {
    if (quizSubmitted) return;

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
  };

  const submitQuiz = () => {
    if (!selectedLesson) return;

    if (
      Object.keys(answers).length !==
      selectedLesson.quiz.length
    ) {
      alert("Please answer all questions first.");
      return;
    }

    let score = 0;

    selectedLesson.quiz.forEach((question, index) => {
      if (answers[index] === question.answer) {
        score++;
      }
    });

    setQuizScores((previous) => ({
      ...previous,
      [selectedLesson.title]: score,
    }));

    setQuizSubmitted(true);
  };

  const buildFinalAssessmentFallback = () => {
    const lessons = roadmap?.stages?.flatMap((stage) => stage.lessons) || [];
    return lessons.slice(0, 15).map((lesson, index) => ({
      question: `Which statement best represents the main skill being developed in “${lesson.title}” for the goal “${goal}”?`,
      options: [
        lesson.description,
        `A completely unrelated skill outside ${goal}`,
        `Only memorizing the lesson title without applying it`,
        `Skipping practice and relying only on watching videos`,
      ],
      answer: 0,
      sourceLesson: lesson.title,
      id: `fallback-${index}`,
    }));
  };

  const generateFinalAssessment = async () => {
    if (!roadmap || !goal) return;

    if (finalAssessment?.questions?.length) {
      setFinalAssessmentAnswers({});
      setFinalAssessmentSubmitted(false);
      setFinalAssessmentScore(finalAssessment.score ?? null);
      return;
    }

    setFinalAssessmentLoading(true);
    try {
      const compactRoadmap = {
        title: roadmap.title,
        name: roadmap.name,
        stages: roadmap.stages.map((stage) => ({
          title: stage.title,
          lessons: stage.lessons.map((lesson) => ({
            title: lesson.title,
            description: lesson.description,
          })),
        })),
      };

      const response = await fetch("https://lifemap-8a58.onrender.com/api/generate-final-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, roadmap: compactRoadmap }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !Array.isArray(data.questions) || data.questions.length < 15) {
        throw new Error(data.error || "Could not generate the final assessment.");
      }

      const assessment = {
        questions: data.questions.slice(0, 15),
        passingPercent: Number(data.passingPercent) || 70,
        generatedAt: new Date().toISOString(),
        score: null,
        passed: false,
      };

      setFinalAssessment(assessment);
      setFinalAssessmentScore(null);
      setFinalAssessmentAnswers({});
      setFinalAssessmentSubmitted(false);
      updateActiveGoalProgress((current) => ({
        ...current,
        finalAssessment: assessment,
      }));
    } catch (error) {
      console.warn("Final assessment AI generation failed; using a local fallback.", error);
      const assessment = {
        questions: buildFinalAssessmentFallback(),
        passingPercent: 70,
        generatedAt: new Date().toISOString(),
        score: null,
        passed: false,
      };
      setFinalAssessment(assessment);
      setFinalAssessmentScore(null);
      setFinalAssessmentAnswers({});
      setFinalAssessmentSubmitted(false);
      updateActiveGoalProgress((current) => ({
        ...current,
        finalAssessment: assessment,
      }));
    } finally {
      setFinalAssessmentLoading(false);
    }
  };

  const submitFinalAssessment = () => {
    if (!finalAssessment?.questions?.length) return;

    if (Object.keys(finalAssessmentAnswers).length !== finalAssessment.questions.length) {
      alert("Please answer all final assessment questions first.");
      return;
    }

    const correct = finalAssessment.questions.reduce(
      (total, question, index) =>
        total + (finalAssessmentAnswers[index] === question.answer ? 1 : 0),
      0
    );
    const score = Math.round((correct / finalAssessment.questions.length) * 100);
    const passed = score >= (finalAssessment.passingPercent || 70);
    const nextAssessment = { ...finalAssessment, score, passed };

    setFinalAssessmentScore(score);
    setFinalAssessmentSubmitted(true);
    setFinalAssessment(nextAssessment);
    updateActiveGoalProgress((current) => ({
      ...current,
      finalAssessment: nextAssessment,
    }));
  };

  const generateFinalProject = async () => {
    if (!roadmap || !goal) return;
    if (finalProject) return;

    setFinalProjectLoading(true);
    try {
      const compactRoadmap = {
        name: roadmap.name,
        stages: roadmap.stages.map((stage) => ({
          title: stage.title,
          lessons: stage.lessons.map((lesson) => lesson.title),
        })),
      };

      const response = await fetch("https://lifemap-8a58.onrender.com/api/generate-final-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, roadmap: compactRoadmap }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.title) {
        throw new Error(data.error || "Could not generate the final project.");
      }

      const project = { ...data, completed: false, completedAt: null };
      setFinalProject(project);
      updateActiveGoalProgress((current) => ({
        ...current,
        finalProject: project,
      }));
      window.setTimeout(() => {
        document.getElementById("capstone-project")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    } catch (error) {
      console.warn("Final project AI generation failed; using a local project brief.", error);
      const project = {
        title: `${goal} Capstone Project`,
        objective: `Create a practical project that demonstrates the main skills covered in your ${goal} roadmap.`,
        requirements: [
          "Use skills from at least three roadmap stages.",
          "Create a clear, working final result.",
          "Document your process, decisions and learning.",
        ],
        deliverables: ["Final project", "Short project explanation", "Evidence of your work"],
        evaluation: "Your project should be practical, clearly explained and connected to the roadmap skills.",
        completed: false,
        completedAt: null,
      };
      setFinalProject(project);
      updateActiveGoalProgress((current) => ({
        ...current,
        finalProject: project,
      }));
      window.setTimeout(() => {
        document.getElementById("capstone-project")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    } finally {
      setFinalProjectLoading(false);
    }
  };

  const markFinalProjectComplete = () => {
    if (!finalProject) return;

    if (!finalAssessmentPassed) {
      alert("Pass the final assessment before completing the capstone project.");
      return;
    }

    const completedProject = {
      ...finalProject,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    setFinalProject(completedProject);
    setFinalProjectDone(true);
    updateActiveGoalProgress((current) => ({
      ...current,
      finalProject: completedProject,
      certificateId: current.certificateId || createCertificateId(goal),
    }));
  };

  const totalLessons =
    roadmap?.stages?.reduce(
      (total, stage) => total + stage.lessons.length,
      0
    ) || 0;

  const completedLessonsForRoadmap =
    roadmap?.stages?.reduce(
      (total, stage) =>
        total +
        stage.lessons.filter((lesson) =>
          completed.includes(lesson.title)
        ).length,
      0
    ) || 0;

  const progress =
    totalLessons > 0
      ? Math.round(
          (completedLessonsForRoadmap / totalLessons) * 100
        )
      : 0;

  const totalPractice =
    roadmap?.stages?.reduce(
      (total, stage) =>
        total +
        stage.lessons.reduce(
          (lessonTotal, lesson) =>
            lessonTotal + lesson.practice.length,
          0
        ),
      0
    ) || 0;

  const completedPractice =
    roadmap?.stages?.reduce(
      (total, stage) =>
        total +
        stage.lessons.reduce(
          (lessonTotal, lesson) =>
            lessonTotal +
            lesson.practice.filter(
              (_, index) =>
                practiceDone[
                  `${lesson.title}-${index}`
                ]
            ).length,
          0
        ),
      0
    ) || 0;

  const scoredLessons =
    roadmap?.stages?.flatMap((stage) => stage.lessons)
      .filter((lesson) => quizScores[lesson.title] !== undefined) || [];

  const quizPoints = scoredLessons.reduce(
    (total, lesson) => total + (quizScores[lesson.title] || 0),
    0
  );

  const quizPossiblePoints = scoredLessons.reduce(
    (total, lesson) => total + lesson.quiz.length,
    0
  );

  const averageQuiz =
    quizPossiblePoints > 0
      ? Math.round((quizPoints / quizPossiblePoints) * 100)
      : 0;

  const lessonProgress = progress;

  const practiceProgress =
    totalPractice > 0
      ? Math.round((completedPractice / totalPractice) * 100)
      : 0;

  const learningProgress =
    totalLessons > 0
      ? Math.round(
          lessonProgress * 0.5 +
            practiceProgress * 0.25 +
            averageQuiz * 0.25
        )
      : 0;

  const finalAssessmentPercent = finalAssessmentScore ?? 0;
  const finalAssessmentPassed = Boolean(
    finalAssessment?.passed &&
    finalAssessmentScore >= (finalAssessment?.passingPercent || 70)
  );
  const allLessonQuizzesPassed =
    totalLessons > 0 &&
    roadmap?.stages?.every((stage) =>
      stage.lessons.every((lesson) => {
        const score = quizScores[lesson.title];
        return Number.isFinite(score) && score >= 4;
      })
    );

  const courseLearningReady =
    lessonProgress === 100 &&
    practiceProgress === 100 &&
    allLessonQuizzesPassed;
  const courseCompleted =
    courseLearningReady &&
    finalAssessmentPassed &&
    finalProjectDone;

  useEffect(() => {
    if (!courseCompleted || !activeGoalKey) return;

    if (!activeGoalProgress.certificateId || activeGoalProgress.studentName !== studentName) {
      updateActiveGoalProgress((current) => ({
        ...current,
        certificateId: current.certificateId || createCertificateId(goal),
        studentName: studentName.trim(),
      }));
    }
  }, [courseCompleted, activeGoalKey]);

  const overallProgress = courseCompleted
    ? 100
    : Math.min(99, Math.round(
        learningProgress * 0.8 +
        finalAssessmentPercent * 0.15 +
        (finalProjectDone ? 100 : 0) * 0.05
      ));

  /* =======================================================
     BATCH 3 — XP, BADGES & MILESTONES
  ======================================================= */

  const completedPracticeCount = completedPractice;
  const completedQuizCount = scoredLessons.length;
  const quizCorrectPoints = quizPoints;

  const xp =
    completedLessonsForRoadmap * 100 +
    completedPracticeCount * 25 +
    quizCorrectPoints * 50 +
    (overallProgress === 100 ? 500 : 0);

  const badges = [
    {
      id: "first-step",
      icon: "🌱",
      title: "First Step",
      description: "Complete your first lesson.",
      unlocked: completedLessonsForRoadmap >= 1,
    },
    {
      id: "practice-pro",
      icon: "✍️",
      title: "Practice Pro",
      description: "Complete 5 practice tasks.",
      unlocked: completedPracticeCount >= 5,
    },
    {
      id: "quiz-starter",
      icon: "🧠",
      title: "Quiz Starter",
      description: "Complete your first quiz.",
      unlocked: completedQuizCount >= 1,
    },
    {
      id: "halfway-hero",
      icon: "🚀",
      title: "Halfway Hero",
      description: "Reach 50% overall progress.",
      unlocked: overallProgress >= 50,
    },
    {
      id: "goal-achieved",
      icon: "🏆",
      title: "Goal Achieved",
      description: "Complete lessons, final assessment and final project.",
      unlocked: courseCompleted,
    },
  ];

  const unlockedBadges = badges.filter((badge) => badge.unlocked);

  const stageStats =
    roadmap?.stages?.map((stage) => {
      const total = stage.lessons.length;
      const done = stage.lessons.filter((lesson) =>
        completed.includes(lesson.title)
      ).length;

      return {
        title: stage.title,
        total,
        done,
        percent: total > 0 ? Math.round((done / total) * 100) : 0,
      };
    }) || [];

  const nextLesson =
    roadmap?.stages
      ?.flatMap((stage) => stage.lessons)
      .find((lesson) => !completed.includes(lesson.title)) || null;

  const normalizedLessonSearch = lessonSearch.trim().toLowerCase();

  const filteredStageLessons = (stage) =>
    stage.lessons.filter((lesson) => {
      if (!normalizedLessonSearch) return true;
      return (
        lesson.title.toLowerCase().includes(normalizedLessonSearch) ||
        lesson.description.toLowerCase().includes(normalizedLessonSearch)
      );
    });

  /* =======================================================
     LESSON VIEW
  ======================================================= */

  if (authLoading) {
    return (
      <div className="lifemap-auth-screen">
        <style>{authStyles}</style>
        <div className="lifemap-auth-card" style={{ textAlign: "center" }}>
          <div className="lifemap-auth-brand" style={{ justifyContent: "center" }}>
            <span className="lifemap-auth-mark">L</span>
            <span><strong>LifeMap</strong><small>Learn with direction</small></span>
          </div>
          <p className="lifemap-auth-subtitle">Checking your account…</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="lifemap-auth-screen">
        <style>{authStyles}</style>
        <form className="lifemap-auth-card" onSubmit={handleAuthSubmit}>
          <div className="lifemap-auth-brand">
            <span className="lifemap-auth-mark">L</span>
            <span><strong>LifeMap</strong><small>Learn with direction</small></span>
          </div>
          <h1 className="lifemap-auth-title">{authMode === "login" ? "Welcome back" : "Create your account"}</h1>
          <p className="lifemap-auth-subtitle">{authMode === "login" ? "Login to continue your learning journey." : "Create an account to keep your LifeMap progress across devices."}</p>
          {authMode === "signup" && (
            <label className="lifemap-auth-field"><span>Name</span><input value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Your name" autoComplete="name" required /></label>
          )}
          <label className="lifemap-auth-field"><span>Email</span><input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
          <label className="lifemap-auth-field"><span>Password</span><input type="password" value={authPassword} onChange={(e) => { setAuthPassword(e.target.value); setLoginHint(""); }} placeholder="At least 6 characters" autoComplete={authMode === "login" ? "current-password" : "new-password"} minLength={6} required /></label>
          {authMode === "signup" && (
            <label className="lifemap-auth-field">
              <span>Password Hint</span>
              <input
                type="text"
                value={passwordHint}
                onChange={(e) => setPasswordHint(e.target.value)}
                placeholder="A clue only you will understand"
                maxLength={120}
                required
              />
            </label>
          )}
          {authError && <div className="lifemap-auth-error">{authError}</div>}
          {loginHint && (
            <div style={{ marginTop: "12px", padding: "14px 16px", borderRadius: "14px", background: "#eef2ff", border: "1px solid #c7d2fe", color: "#3730a3" }}>
              <strong style={{ display: "block", marginBottom: "4px" }}>💡 Password Hint</strong>
              <span>{loginHint}</span>
            </div>
          )}
          <button className="lifemap-auth-submit" type="submit" disabled={authSubmitting}>{authSubmitting ? "Please wait…" : authMode === "login" ? "Login" : "Create Account"}</button>
          <div className="lifemap-auth-switch">{authMode === "login" ? "Don't have an account?" : "Already have an account?"} <button type="button" onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setAuthError(""); setLoginHint(""); setPasswordHint(""); }}>{authMode === "login" ? "Sign Up" : "Login"}</button></div>
          <p className="lifemap-auth-note">Your LifeMap progress is stored with your account.</p>
        </form>
      </div>
    );
  }

  if (selectedLesson) {
    const practiceTotal = selectedLesson.practice.length;

    const practiceCompleted =
      selectedLesson.practice.filter(
        (_, index) =>
          practiceDone[
            `${selectedLesson.title}-${index}`
          ]
      ).length;

    const score = quizSubmitted
      ? selectedLesson.quiz.reduce(
          (total, question, index) =>
            total +
            (answers[index] === question.answer ? 1 : 0),
          0
        )
      : 0;

    return (
      <div className="app">
        <style>{polishStyles}</style>
        <style>{authStyles}</style>

        
        <nav className="navbar">
          <div className="lifemap-account-bar">
            <button
              type="button"
              className="lifemap-account-trigger"
              onClick={() => setAccountMenuOpen((open) => !open)}
              aria-expanded={accountMenuOpen}
              aria-haspopup="menu"
            >
              <span className="lifemap-avatar">{(authUser?.name || "L").trim().charAt(0).toUpperCase()}</span>
              <span className="lifemap-account-info"><strong>{authUser?.name || "LifeMap User"}</strong><span>{authUser?.email || ""}</span></span>
              <span className="lifemap-account-chevron">⌄</span>
            </button>
            {accountMenuOpen && (
              <div className="lifemap-account-menu" role="menu">
                <button type="button" onClick={() => handleAccountMenuAction("profile")}>👤 <span>My Profile</span></button>
                <button type="button" onClick={() => handleAccountMenuAction("certificate")}>🏆 <span>View Certificate</span></button>
                <div className="lifemap-menu-divider" />
                <button type="button" className="lifemap-menu-logout" onClick={handleLogout}>🚪 <span>Logout</span></button>
              </div>
            )}
          </div>
          <button className="brand-button" onClick={goHome}>
            <span className="brand-mark">L</span>
            <span>
              <strong>LifeMap</strong>
              <small>Learn with direction</small>
            </span>
          </button>

          <div className="nav-links">
            <button onClick={goHome}>Home</button>
            <button onClick={backToRoadmap}>Roadmap</button>
            <a href="#features">Features</a>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>
        </nav>

        <main className="lesson-view">
          <div className="lesson-container">
            <button
              className="back-button"
              onClick={backToRoadmap}
            >
              ← Back to Roadmap
            </button>

            <section className="lesson-hero">
              <div className="lesson-hero-badge">
                <span>📚</span>
                LEARNING MODULE
              </div>

              <h1>{selectedLesson.title}</h1>

              <p>{selectedLesson.description}</p>
            </section>

            <section className="learning-card">
              <div className="card-heading">
                <div className="card-icon">📚</div>

                <div>
                  <p className="card-label">01 — LEARN</p>
                  <h2>Understand the Concept</h2>
                </div>
              </div>

              <p className="card-description">
                {selectedLesson.description}
              </p>

              <div className="learning-tip">
                <span>💡</span>
                <div>
                  <strong>Learning tip</strong>
                  <p>
                    Understand the idea first, then
                    practice it yourself.
                  </p>
                </div>
              </div>
            </section>

            <section className="learning-card">
              <div className="card-heading">
                <div className="card-icon video-icon">▶</div>

                <div>
                  <p className="card-label">02 — WATCH</p>
                  <h2>Related Video</h2>
                </div>
              </div>

              <p className="card-description">
                LifeMap finds a specific YouTube tutorial for this exact lesson.
              </p>

              <div className="video-topic">
                <span>🎥</span>
                <div>
                  <strong>{selectedLesson.videoTitle || selectedLesson.title}</strong>
                  {selectedLesson.videoChannel && (
                    <small style={{ display: "block", marginTop: "4px", color: "#64748b" }}>
                      {selectedLesson.videoChannel}
                    </small>
                  )}
                </div>
              </div>

              {selectedLesson.videoLoading ? (
                <div className="video-button" style={{ opacity: 0.7, cursor: "wait" }}>
                  🔎 Finding a relevant tutorial...
                </div>
              ) : (
                <a
                  className="video-button"
                  href={selectedLesson.video}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Watch This Tutorial
                </a>
              )}
            </section>

            <section className="learning-card">
              <div className="card-heading">
                <div className="card-icon practice-icon">
                  ✍
                </div>

                <div>
                  <p className="card-label">03 — PRACTICE</p>
                  <h2>Practice What You Learned</h2>
                </div>
              </div>

              <div className="practice-progress-box">
                <div className="practice-progress-top">
                  <span>Practice Progress</span>
                  <strong>
                    {practiceCompleted}/{practiceTotal}
                  </strong>
                </div>

                <div className="practice-progress-bar">
                  <div
                    className="practice-progress-fill"
                    style={{
                      width: `${
                        practiceTotal
                          ? (practiceCompleted /
                              practiceTotal) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="practice-list">
                {selectedLesson.practice.map(
                  (task, index) => {
                    const done =
                      practiceDone[
                        `${selectedLesson.title}-${index}`
                      ];

                    return (
                      <button
                        key={index}
                        className={`practice-item ${
                          done ? "practice-done" : ""
                        }`}
                        onClick={() =>
                          togglePractice(index)
                        }
                      >
                        <div
                          className={`practice-checkbox ${
                            done ? "checked" : ""
                          }`}
                        >
                          {done ? "✓" : ""}
                        </div>

                        <div className="practice-text">
                          <span>Task {index + 1}</span>
                          <p>{task}</p>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </section>

            <section className="learning-card">
              <div className="card-heading">
                <div className="card-icon quiz-icon">?</div>

                <div>
                  <p className="card-label">04 — QUIZ</p>
                  <h2>Test Your Knowledge</h2>
                  <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: "13px" }}>
                    {quizLoading
                      ? "Preparing 5 questions for this exact lesson..."
                      : "5 topic-specific questions • concept + application + reasoning"}
                  </p>
                </div>
              </div>

              {quizLoading && (
                <div
                  style={{
                    margin: "14px 0",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    color: "#475569",
                    fontSize: "14px",
                  }}
                >
                  ✨ AI is tailoring these questions to your lesson...
                </div>
              )}

              {selectedLesson.quiz.map(
                (question, questionIndex) => (
                  <div
                    className="quiz-question-box"
                    key={questionIndex}
                  >
                    <h4>
                      {questionIndex + 1}.{" "}
                      {question.question}
                    </h4>

                    <div className="quiz-options">
                      {question.options.map(
                        (option, optionIndex) => {
                          const selected =
                            answers[questionIndex] ===
                            optionIndex;

                          const correct =
                            question.answer ===
                            optionIndex;

                          let className =
                            "quiz-option";

                          if (
                            quizSubmitted &&
                            correct
                          ) {
                            className += " quiz-correct";
                          } else if (
                            quizSubmitted &&
                            selected &&
                            !correct
                          ) {
                            className += " quiz-wrong";
                          } else if (selected) {
                            className += " quiz-selected";
                          }

                          return (
                            <button
                              key={optionIndex}
                              className={className}
                              onClick={() =>
                                handleAnswer(
                                  questionIndex,
                                  optionIndex
                                )
                              }
                            >
                              <span>
                                {String.fromCharCode(
                                  65 + optionIndex
                                )}
                              </span>
                              {option}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )
              )}

              {!quizSubmitted && (
                <button
                  className="submit-quiz-button"
                  onClick={submitQuiz}
                >
                  Submit Quiz →
                </button>
              )}

              {quizSubmitted && (
                <div className="quiz-result">
                  <div className="score-circle">
                    {score}/
                    {selectedLesson.quiz.length}
                  </div>

                  <div>
                    <h3>
                      {score ===
                      selectedLesson.quiz.length
                        ? "🎉 Perfect Score!"
                        : "👏 Keep Learning!"}
                    </h3>

                    <p>
                      You scored {score} out of{" "}
                      {selectedLesson.quiz.length} ({Math.round((score / selectedLesson.quiz.length) * 100)}%).
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="completion-card">
              {completed.includes(
                selectedLesson.title
              ) ? (
                <>
                  <div className="completion-check">
                    ✓
                  </div>
                  <div>
                    <h2>Lesson Completed!</h2>
                    <p>
                      Your progress has been saved.
                    </p>
                    <p style={{ margin: "7px 0 0", color: "#4f46e5", fontWeight: 800 }}>
                      +100 XP • 🌱 First Step progress
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2>Ready to mark this lesson complete?</h2>
                    <p>
                      Complete the lesson after learning,
                      practicing and reviewing.
                    </p>
                  </div>

                  <button
                    className="complete-button"
                    onClick={completeLesson}
                  >
                    ✓ Complete Lesson
                  </button>
                </>
              )}
            </section>
          </div>
        </main>

        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            right: "18px",
            bottom: "18px",
            zIndex: 40,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid rgba(148,163,184,.22)",
            background: "rgba(255,255,255,.92)",
            boxShadow: "0 10px 30px rgba(15,23,42,.14)",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ↑
        </button>
      </div>
    );
  }

  /* =======================================================
     MAIN VIEW
  ======================================================= */

  return (
    <div className="app">
            {isGeneratingRoadmap && (
        <div className="lifemap-waiting-overlay" role="status" aria-live="polite">
          <div className="lifemap-waiting-card">
            <div className="lifemap-waiting-mark">L</div>
            <h2>Building your LifeMap</h2>
            <p key={waitingQuoteIndex} className="lifemap-waiting-quote">
              “{lifeMapQuotes[waitingQuoteIndex]}”
            </p>
            <p className="lifemap-waiting-subtitle">
              Personalizing your roadmap for you...
            </p>
            <div className="lifemap-waiting-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}
      <style>{polishStyles}</style>
        <style>{authStyles}</style>
      <nav className="navbar">
          <div className="lifemap-account-bar">
            <button
              type="button"
              className="lifemap-account-trigger"
              onClick={() => setAccountMenuOpen((open) => !open)}
              aria-expanded={accountMenuOpen}
              aria-haspopup="menu"
            >
              <span className="lifemap-avatar">{(authUser?.name || "L").trim().charAt(0).toUpperCase()}</span>
              <span className="lifemap-account-info"><strong>{authUser?.name || "LifeMap User"}</strong><span>{authUser?.email || ""}</span></span>
              <span className="lifemap-account-chevron">⌄</span>
            </button>
            {accountMenuOpen && (
              <div className="lifemap-account-menu" role="menu">
                <button type="button" onClick={() => handleAccountMenuAction("profile")}>👤 <span>My Profile</span></button>
                <button type="button" onClick={() => handleAccountMenuAction("certificate")}>🏆 <span>View Certificate</span></button>
                <div className="lifemap-menu-divider" />
                <button type="button" className="lifemap-menu-logout" onClick={handleLogout}>🚪 <span>Logout</span></button>
              </div>
            )}
          </div>
        <button className="brand-button" onClick={goHome}>
          <span className="brand-mark">L</span>

          <span>
            <strong>LifeMap</strong>
            <small>Learn with direction</small>
          </span>
        </button>

        <div
          className={`nav-links ${
            mobileMenu ? "mobile-open" : ""
          }`}
        >
          <button onClick={goHome}>Home</button>

          <button
            onClick={() =>
              document
                .getElementById("roadmap")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Roadmap
          </button>

          <button
            onClick={() =>
              document
                .getElementById("dashboard")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Features
          </button>

          <button
            className="nav-cta"
            onClick={goHome}
          >
            Start Learning
          </button>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>
      </nav>

      {/* HERO */}

      <section className="hero" id="home">
        <div className="hero-background-orb orb-one" />
        <div className="hero-background-orb orb-two" />

        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span>
            PERSONAL LEARNING ROADMAP
          </div>

          <h1>
            Turn Your Goal
            <br />
            Into a <span>Clear Path.</span>
          </h1>

          <p className="hero-text">
            Tell LifeMap what you want to achieve.
            Get a structured journey from
            <strong> beginner → skilled → goal-ready.</strong>
          </p>

          <div className="goal-box">
            <div className="goal-input-wrapper">
              <span className="goal-search-icon">
                ⌕
              </span>

              <input
                type="text"
                value={goal}
                onChange={(event) =>
                  setGoal(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    createRoadmap();
                  }
                }}
                placeholder="What do you want to achieve?"
              />
            </div>

            <button
              className="create-button"
              onClick={createRoadmap}
              disabled={isGeneratingRoadmap}
            >
              {isGeneratingRoadmap ? "Building Roadmap..." : "Create Roadmap"}
              <span>{isGeneratingRoadmap ? "✦" : "→"}</span>
            </button>
          </div>

          <p className="hero-hint">
            LifeMap builds a goal-specific roadmap for any learning or career goal.
          </p>

          {generationError && (
            <p style={{ color: "#b91c1c", fontSize: "13px", marginTop: "8px" }}>
              {generationError}
            </p>
          )}

          <div className="quick-goals">
            <span>Popular goals:</span>

            <button
              onClick={() =>
                useQuickGoal("Web Developer")
              }
            >
              Web Developer
            </button>

            <button
              onClick={() =>
                useQuickGoal("AI Specialist")
              }
            >
              AI Specialist
            </button>

            <button
              onClick={() =>
                useQuickGoal("Data Scientist")
              }
            >
              Data Scientist
            </button>
          </div>
        </div>

        <div className="hero-preview">
          <div className="preview-window">
            <div className="preview-top">
              <div className="preview-dots">
                <span />
                <span />
                <span />
              </div>

              <span>lifemap.app</span>
            </div>

            <div className="preview-body">
              <div className="preview-mini-label">
                YOUR JOURNEY
              </div>

              <h3>{roadmap ? roadmap.name : "Your Goal"}</h3>

              <div className="preview-progress">
                <div>
                  <span>Progress</span>
                  <strong>{roadmap ? overallProgress : 0}%</strong>
                </div>

                <div className="mini-progress">
                  <div
                    style={{
                      width: `${roadmap ? overallProgress : 0}%`,
                    }}
                  />
                </div>
              </div>

              {roadmap ? (
                <>
                  <div className="preview-stage">
                    <div className="preview-stage-number">
                      {String(
                        Math.min(
                          (roadmap.stages || []).length,
                          Math.max(
                            1,
                            (roadmap.stages || []).findIndex(
                              (stage) =>
                                stage.lessons.some(
                                  (lesson) =>
                                    !completed.includes(lesson.title)
                                )
                            ) + 1
                          )
                        )
                      ).padStart(2, "0")}
                    </div>

                    <div>
                      <span>
                        STAGE {
                          Math.min(
                            (roadmap.stages || []).length,
                            Math.max(
                              1,
                              (roadmap.stages || []).findIndex(
                                (stage) =>
                                  stage.lessons.some(
                                    (lesson) =>
                                      !completed.includes(lesson.title)
                                  )
                              ) + 1
                            )
                          )
                        }
                      </span>
                      <strong>
                        {(roadmap.stages || [])[Math.min(
                          (roadmap.stages || []).length - 1,
                          Math.max(
                            0,
                            (roadmap.stages || []).findIndex(
                              (stage) =>
                                stage.lessons.some(
                                  (lesson) =>
                                    !completed.includes(lesson.title)
                                )
                            )
                          )
                        )]?.title || "Getting Started"}
                      </strong>
                      <small>
                        {(roadmap.stages || [])[Math.min(
                          (roadmap.stages || []).length - 1,
                          Math.max(
                            0,
                            (roadmap.stages || []).findIndex(
                              (stage) =>
                                stage.lessons.some(
                                  (lesson) =>
                                    !completed.includes(lesson.title)
                                )
                            )
                          )
                        )]?.lessons?.length || 0} lessons
                      </small>
                    </div>

                    <b>{overallProgress === 100 ? "✓" : "→"}</b>
                  </div>

                  <div className="preview-stage muted">
                    <div className="preview-stage-number">
                      {String(
                        Math.min(
                          (roadmap.stages || []).length,
                          Math.max(
                            1,
                            (roadmap.stages || []).findIndex(
                              (stage) =>
                                stage.lessons.some(
                                  (lesson) =>
                                    !completed.includes(lesson.title)
                                )
                            ) + 2
                          )
                        )
                      ).padStart(2, "0")}
                    </div>

                    <div>
                      <span>
                        STAGE {
                          Math.min(
                            (roadmap.stages || []).length,
                            Math.max(
                              1,
                              (roadmap.stages || []).findIndex(
                                (stage) =>
                                  stage.lessons.some(
                                    (lesson) =>
                                      !completed.includes(lesson.title)
                                  )
                              ) + 2
                            )
                          )
                        }
                      </span>
                      <strong>
                        {(roadmap.stages || [])[Math.min(
                          (roadmap.stages || []).length - 1,
                          Math.max(
                            0,
                            (roadmap.stages || []).findIndex(
                              (stage) =>
                                stage.lessons.some(
                                  (lesson) =>
                                    !completed.includes(lesson.title)
                                )
                            ) + 1
                          )
                        )]?.title || "Goal Ready"}
                      </strong>
                      <small>Next learning stage</small>
                    </div>

                    <b>→</b>
                  </div>
                </>
              ) : (
                <div className="preview-stage">
                  <div className="preview-stage-number">
                    01
                  </div>
                  <div>
                    <span>START HERE</span>
                    <strong>Create your roadmap</strong>
                    <small>Your first learning stage will appear here</small>
                  </div>
                  <b>→</b>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}

      <section className="trust-strip">
        <div>
          <strong>01</strong>
          <span>Choose your goal</span>
        </div>

        <div>
          <strong>02</strong>
          <span>Follow your roadmap</span>
        </div>

        <div>
          <strong>03</strong>
          <span>Learn & practice</span>
        </div>

        <div>
          <strong>04</strong>
          <span>Track your progress</span>
        </div>
      </section>

      {/* DASHBOARD */}

      {roadmap && (
        <>
          <section
            className="dashboard-section"
            id="dashboard"
            style={{
              background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
            }}
          >
            <div className="section-heading left">
              <div>
                <p className="section-tag">YOUR DASHBOARD</p>

                <h2>
                  See your progress.
                  <br />
                  Know your next step.
                </h2>
              </div>

              <p>
                LifeMap automatically saves your learning progress in this browser.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "16px",
                marginBottom: "22px",
              }}
            >
              {[
                ["📚", "Lessons", `${completedLessonsForRoadmap}/${totalLessons}`],
                ["✍️", "Practice", `${completedPractice}/${totalPractice}`],
                ["🧠", "Quiz Average", `${averageQuiz}%`],
                ["🎯", "Overall", `${overallProgress}%`],
                ["⭐", "XP Earned", `${xp}`],
              ].map(([icon, label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e7edf5",
                    borderRadius: "18px",
                    padding: "20px",
                    boxShadow: "0 8px 24px rgba(30, 60, 90, 0.06)",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>{icon}</div>
                  <div style={{ color: "#6b7280", fontSize: "13px", fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: "27px", fontWeight: 800, marginTop: "4px" }}>{value}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#111827",
                color: "white",
                borderRadius: "24px",
                padding: "26px",
                marginBottom: "20px",
                boxShadow: "0 14px 35px rgba(17, 24, 39, 0.16)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ opacity: 0.7, fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>OVERALL LEARNING PROGRESS</div>
                  <h3 style={{ margin: "8px 0 5px", fontSize: "28px" }}>{overallProgress}% complete</h3>
                  <p style={{ margin: 0, opacity: 0.72, fontSize: "14px" }}>
                    Lessons 50% • Practice 25% • Quiz 25%
                  </p>
                </div>

                <div
                  style={{
                    width: "82px",
                    height: "82px",
                    borderRadius: "50%",
                    border: "7px solid rgba(255,255,255,0.18)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "19px",
                    fontWeight: 800,
                  }}
                >
                  {overallProgress}%
                </div>
              </div>

              <div
                style={{
                  height: "10px",
                  background: "rgba(255,255,255,0.13)",
                  borderRadius: "99px",
                  marginTop: "22px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${overallProgress}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                    borderRadius: "99px",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e7edf5",
                borderRadius: "22px",
                padding: "22px",
                marginBottom: "20px",
                boxShadow: "0 8px 24px rgba(30, 60, 90, 0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ color: "#8b95a7", fontSize: "11px", fontWeight: 800, letterSpacing: "1px" }}>ACHIEVEMENTS</div>
                  <h3 style={{ margin: "6px 0 3px" }}>Your learning rewards</h3>
                  <p style={{ margin: 0, color: "#6b7280", fontSize: "13px" }}>
                    {unlockedBadges.length}/{badges.length} badges unlocked
                  </p>
                </div>

                <div
                  style={{
                    background: "#111827",
                    color: "#fff",
                    borderRadius: "14px",
                    padding: "10px 16px",
                    fontWeight: 800,
                  }}
                >
                  ⭐ {xp} XP
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))",
                  gap: "12px",
                  marginTop: "18px",
                }}
              >
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    style={{
                      border: badge.unlocked ? "1px solid #c7d2fe" : "1px solid #e7edf5",
                      background: badge.unlocked ? "linear-gradient(135deg, #f5f3ff, #eff6ff)" : "#f8fafc",
                      borderRadius: "16px",
                      padding: "16px",
                      opacity: badge.unlocked ? 1 : 0.55,
                    }}
                  >
                    <div style={{ fontSize: "28px" }}>{badge.icon}</div>
                    <strong style={{ display: "block", marginTop: "7px" }}>{badge.title}</strong>
                    <span style={{ display: "block", color: "#6b7280", fontSize: "12px", lineHeight: 1.5, marginTop: "4px" }}>{badge.description}</span>
                    <span style={{ display: "inline-block", marginTop: "9px", fontSize: "11px", fontWeight: 800, color: badge.unlocked ? "#4f46e5" : "#7b8492" }}>
                      {badge.unlocked ? "UNLOCKED ✓" : "LOCKED"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {overallProgress === 100 && (
              <div
                style={{
                  background: "linear-gradient(135deg, #111827, #312e81)",
                  color: "#fff",
                  borderRadius: "24px",
                  padding: "30px",
                  marginBottom: "24px",
                  textAlign: "center",
                  boxShadow: "0 16px 40px rgba(49, 46, 129, 0.22)",
                }}
              >
                <div style={{ fontSize: "48px" }}>🏆</div>
                <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2px", opacity: 0.7, marginTop: "5px" }}>GOAL ACHIEVED</div>
                <h2 style={{ margin: "8px 0 7px", fontSize: "30px" }}>You completed your {roadmap.name} journey!</h2>
                <p style={{ margin: 0, opacity: 0.78 }}>
                  All lessons are complete and your overall learning progress reached 100%. Keep building, practicing and growing.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginTop: "18px" }}>
                  <span style={{ background: "rgba(255,255,255,.12)", borderRadius: "999px", padding: "8px 13px", fontWeight: 700 }}>⭐ {xp} XP earned</span>
                  <span style={{ background: "rgba(255,255,255,.12)", borderRadius: "999px", padding: "8px 13px", fontWeight: 700 }}>🏅 {unlockedBadges.length} badges</span>
                </div>
              </div>
            )}

            {nextLesson ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "18px",
                  flexWrap: "wrap",
                  background: "#ffffff",
                  border: "1px solid #e7edf5",
                  borderRadius: "20px",
                  padding: "22px",
                  marginBottom: "24px",
                  boxShadow: "0 8px 24px rgba(30, 60, 90, 0.05)",
                }}
              >
                <div>
                  <div style={{ color: "#6b7280", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>CONTINUE LEARNING</div>
                  <h3 style={{ margin: "7px 0 4px" }}>{nextLesson.title}</h3>
                  <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>{nextLesson.description}</p>
                </div>

                <button
                  onClick={() => openLesson(nextLesson)}
                  style={{
                    border: 0,
                    borderRadius: "12px",
                    padding: "12px 18px",
                    background: "#111827",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Continue →
                </button>
              </div>
            ) : (
              <div
                style={{
                  background: "linear-gradient(135deg, #ecfdf5, #f0fdf4)",
                  border: "1px solid #bbf7d0",
                  borderRadius: "20px",
                  padding: "22px",
                  marginBottom: "24px",
                }}
              >
                <h3 style={{ margin: "0 0 6px" }}>🎉 All lessons completed!</h3>
                <p style={{ margin: 0, color: "#166534" }}>Keep practicing and improving your quiz scores to reach 100% overall progress.</p>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                gap: "16px",
              }}
            >
              {stageStats.map((stage, index) => (
                <div
                  key={stage.title}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e7edf5",
                    borderRadius: "18px",
                    padding: "18px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                    <div>
                      <div style={{ color: "#8b95a7", fontSize: "11px", fontWeight: 700 }}>STAGE {String(index + 1).padStart(2, "0")}</div>
                      <h4 style={{ margin: "6px 0 3px" }}>{stage.title}</h4>
                    </div>
                    <strong style={{ fontSize: "15px" }}>{stage.percent}%</strong>
                  </div>

                  <div style={{ height: "7px", background: "#edf1f6", borderRadius: "99px", margin: "13px 0 9px", overflow: "hidden" }}>
                    <div style={{ width: `${stage.percent}%`, height: "100%", background: "#111827", borderRadius: "99px", transition: "width 0.4s ease" }} />
                  </div>

                  <span style={{ color: "#6b7280", fontSize: "12px" }}>
                    {stage.done}/{stage.total} lessons complete
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SAVED GOALS */}

          <section style={{maxWidth:"1120px",margin:"0 auto",padding:"0 24px 28px"}}>
            <div style={{background:"#fff",border:"1px solid #e7edf5",borderRadius:"22px",padding:"22px",boxShadow:"0 8px 24px rgba(30,60,90,.05)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px",flexWrap:"wrap",marginBottom:"16px"}}>
                <div>
                  <div style={{fontSize:"11px",fontWeight:800,letterSpacing:"1px",color:"#8b95a7"}}>YOUR GOALS</div>
                  <h3 style={{margin:"5px 0 0"}}>Saved learning journeys</h3>
                </div>
                <span style={{color:"#6b7280",fontSize:"13px"}}>{savedGoals.length}/8 saved</span>
              </div>
              {savedGoals.length ? (
                <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                  {savedGoals.map((savedGoal) => {
                    const active = savedGoal.toLowerCase() === goal.toLowerCase();
                    return (
                      <div key={savedGoal} style={{display:"flex",alignItems:"center",gap:"4px",background:active?"#111827":"#f3f6fa",borderRadius:"999px",padding:"4px 6px 4px 12px"}}>
                        <button onClick={() => loadGoal(savedGoal)} style={{border:0,background:"transparent",color:active?"#fff":"#263244",fontWeight:700,cursor:"pointer",padding:"6px 3px"}}>{savedGoal}</button>
                        <button onClick={() => removeSavedGoal(savedGoal)} style={{border:0,background:"transparent",color:active?"rgba(255,255,255,.7)":"#7b8492",cursor:"pointer",fontSize:"16px",padding:"3px 6px"}}>×</button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{margin:0,color:"#6b7280",fontSize:"14px"}}>Create a roadmap and it will appear here for quick access.</p>
              )}
            </div>
          </section>

          {/* ROADMAP */}

          <section
            className="roadmap-section"
            id="roadmap"
          >
            <div className="section-heading">
              <p className="section-tag">
                YOUR LEARNING PATH
              </p>

              <h2>{roadmap.title}</h2>

              <p>
                Learn → Watch → Practice → Quiz → Final Assessment → Final Project → Certificate
              </p>
            </div>

            <div className="roadmap-meta">
              <div>
                <span className="roadmap-icon">
                  {roadmap.icon}
                </span>

                <div>
                  <small>CURRENT GOAL</small>
                  <strong>{roadmap.name}</strong>
                </div>
              </div>

              <span className="roadmap-status">
                {overallProgress === 100
                  ? "Goal Complete 🎉"
                  : `${overallProgress}% overall progress`}
              </span>
            </div>

                        <div style={{maxWidth:"760px",margin:"0 auto 28px",position:"relative"}}>
              <span style={{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",fontSize:"19px",color:"#7b8492"}}>⌕</span>
              <input value={lessonSearch} onChange={(event) => setLessonSearch(event.target.value)} placeholder="Search lessons in this roadmap..." style={{width:"100%",boxSizing:"border-box",border:"1px solid #dfe6ef",borderRadius:"14px",padding:"14px 18px 14px 46px",fontSize:"14px",outline:"none",background:"#fff"}} />
            </div>

<div className="journey-line">
              {roadmap.stages.map(
                (stage, stageIndex) => (
                  <div
                    className="stage-card"
                    key={stageIndex}
                  >
                    <div className="stage-marker">
                      <span>
                        {String(stageIndex + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>

                    <div className="stage-content">
                      <div className="stage-header">
                        <div>
                          <p className="stage-label">
                            STAGE {stageIndex + 1}
                          </p>

                          <h3>{stage.title}</h3>
                        </div>

                        <span className="lesson-count">
                          {stage.lessons.length} lessons
                        </span>
                      </div>

                      <div className="lesson-grid">
                        {filteredStageLessons(stage).length === 0 ? (
                          <div style={{gridColumn:"1 / -1",padding:"20px",borderRadius:"14px",background:"#f8fafc",color:"#6b7280",textAlign:"center",fontSize:"14px"}}>
                            No lessons match “{lessonSearch}” in this stage.
                          </div>
                        ) : (
                          filteredStageLessons(stage).map(
                            (lesson, index) => {
                            const done =
                              completed.includes(
                                lesson.title
                              );

                            return (
                              <button
                                key={index}
                                className={`lesson-card ${
                                  done
                                    ? "lesson-completed"
                                    : ""
                                }`}
                                onClick={() =>
                                  openLesson(lesson)
                                }
                              >
                                <div
                                  className={`lesson-icon ${
                                    done
                                      ? "done"
                                      : ""
                                  }`}
                                >
                                  {done ? "✓" : "→"}
                                </div>

                                <div className="lesson-info">
                                  <h4>
                                    {lesson.title}
                                  </h4>

                                  <p>
                                    {lesson.description}
                                  </p>

                                  <span>
                                    Learn • Practice •
                                    Quiz
                                  </span>
                                </div>

                                <div className="lesson-arrow">
                                  →
                                </div>
                              </button>
                            );
                            }
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </>
      )}

      {roadmap && (
        <section className="learning-card" id="final-course" style={{ maxWidth: "1120px", margin: "40px auto" }}>
          <div className="card-heading">
            <div className="card-icon">🏆</div>
            <div>
              <p className="card-label">FINAL COURSE STAGE</p>
              <h2>Complete Your {roadmap.name} Course</h2>
            </div>
          </div>

          <p className="card-description">
            Complete every lesson, finish every practice task, pass every lesson quiz, pass the 15-question final assessment, and complete the goal-specific capstone project to unlock your LifeMap certificate.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "14px", marginTop: "20px" }}>
            <div className="badge-card" style={{ padding: "18px", borderRadius: "16px", border: "1px solid #e5e7eb", background: "#fff" }}>
              <strong>01 · Lessons</strong>
              <p style={{ margin: "8px 0 0", color: "#64748b" }}>{completedLessonsForRoadmap}/{totalLessons} completed</p>
            </div>
            <div className="badge-card" style={{ padding: "18px", borderRadius: "16px", border: "1px solid #e5e7eb", background: "#fff" }}>
              <strong>02 · Practice</strong>
              <p style={{ margin: "8px 0 0", color: "#64748b" }}>{completedPractice}/{totalPractice} completed</p>
            </div>
            <div className="badge-card" style={{ padding: "18px", borderRadius: "16px", border: "1px solid #e5e7eb", background: "#fff" }}>
              <strong>03 · Lesson Quizzes</strong>
              <p style={{ margin: "8px 0 0", color: "#64748b" }}>{allLessonQuizzesPassed ? "All quizzes passed ✓" : `${scoredLessons.length}/${totalLessons} passed (70% needed)`}</p>
            </div>
            <div className="badge-card" style={{ padding: "18px", borderRadius: "16px", border: "1px solid #e5e7eb", background: "#fff" }}>
              <strong>04 · Final Assessment</strong>
              <p style={{ margin: "8px 0 0", color: "#64748b" }}>{finalAssessmentPassed ? `Passed · ${finalAssessmentScore}%` : "Not passed yet"}</p>
            </div>
            <div className="badge-card" style={{ padding: "18px", borderRadius: "16px", border: "1px solid #e5e7eb", background: "#fff" }}>
              <strong>05 · Capstone Project</strong>
              <p style={{ margin: "8px 0 0", color: "#64748b" }}>{finalProjectDone ? "Completed ✓" : "Not completed yet"}</p>
            </div>
          </div>

          <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="submit-quiz-button" onClick={generateFinalAssessment} disabled={finalAssessmentLoading}>
              {finalAssessmentLoading ? "Generating Assessment..." : finalAssessment?.questions?.length ? "Open Final Assessment →" : "Start Final Assessment →"}
            </button>
            <button
              className="complete-button"
              onClick={() => {
                if (finalProject) {
                  document.getElementById("capstone-project")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  return;
                }
                generateFinalProject();
              }}
              disabled={finalProjectLoading}
            >
              {finalProjectLoading
                ? "Generating Project..."
                : finalProject
                  ? "Open Project Brief →"
                  : "Generate Final Project →"}
            </button>
          </div>

          {finalAssessment?.questions?.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: 0 }}>Final Assessment</h3>
                  <p style={{ margin: "6px 0 0", color: "#64748b" }}>{finalAssessment.questions.length} questions · Passing score {finalAssessment.passingPercent || 70}%</p>
                </div>
                {finalAssessmentScore !== null && (
                  <strong style={{ fontSize: "20px", color: finalAssessmentPassed ? "#15803d" : "#b91c1c" }}>
                    {finalAssessmentScore}% {finalAssessmentPassed ? "✓ Passed" : "— Try Again"}
                  </strong>
                )}
              </div>

              {finalAssessment.questions.map((question, questionIndex) => (
                <div className="quiz-question-box" key={question.id || questionIndex} style={{ marginTop: "16px" }}>
                  <h4>{questionIndex + 1}. {question.question}</h4>
                  <div className="quiz-options">
                    {question.options.map((option, optionIndex) => {
                      const selected = finalAssessmentAnswers[questionIndex] === optionIndex;
                      const correct = question.answer === optionIndex;
                      let className = "quiz-option";
                      if (finalAssessmentSubmitted && correct) className += " quiz-correct";
                      else if (finalAssessmentSubmitted && selected && !correct) className += " quiz-wrong";
                      else if (selected) className += " quiz-selected";
                      return (
                        <button
                          key={optionIndex}
                          className={className}
                          onClick={() => {
                            if (finalAssessmentSubmitted) return;
                            setFinalAssessmentAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }));
                          }}
                        >
                          <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {!finalAssessmentSubmitted && (
                <button className="submit-quiz-button" style={{ marginTop: "18px" }} onClick={submitFinalAssessment}>
                  Submit Final Assessment →
                </button>
              )}

              {finalAssessmentSubmitted && !finalAssessmentPassed && (
                <button className="complete-button" style={{ marginTop: "18px" }} onClick={() => { setFinalAssessmentAnswers({}); setFinalAssessmentSubmitted(false); }}>
                  Retry Assessment
                </button>
              )}
            </div>
          )}

          {finalProject && (
            <div
              id="capstone-project"
              style={{ marginTop: "30px", padding: "22px", borderRadius: "18px", background: "#f8fafc", border: "1px solid #e2e8f0", scrollMarginTop: "24px" }}
            >
              <h3 style={{ marginTop: 0 }}>💻 {finalProject.title}</h3>
              <p><strong>Objective:</strong> {finalProject.objective}</p>
              <h4>Requirements</h4>
              <ul>{(finalProject.requirements || []).map((item, index) => <li key={index}>{item}</li>)}</ul>
              <h4>Deliverables</h4>
              <ul>{(finalProject.deliverables || []).map((item, index) => <li key={index}>{item}</li>)}</ul>
              {finalProject.evaluation && <p><strong>Evaluation:</strong> {finalProject.evaluation}</p>}
              {!finalProjectDone ? (
                <>
                  <button
                    className="complete-button"
                    onClick={markFinalProjectComplete}
                    disabled={!finalAssessmentPassed}
                    title={!finalAssessmentPassed ? "Pass the final assessment first." : "Mark your capstone as complete"}
                  >
                    ✓ Mark Final Project Complete
                  </button>
                  {!finalAssessmentPassed && (
                    <p style={{ margin: "10px 0 0", color: "#64748b", fontSize: "13px" }}>
                      Pass the final assessment to unlock capstone completion.
                    </p>
                  )}
                </>
              ) : (
                <div className="completion-card" style={{ marginTop: "14px" }}><div className="completion-check">✓</div><div><h3 style={{ margin: 0 }}>Final Project Completed!</h3><p style={{ marginBottom: 0 }}>Your capstone completion is saved for this goal.</p></div></div>
              )}
            </div>
          )}

          {courseCompleted && (
            <div style={{ marginTop: "30px", padding: "28px", borderRadius: "22px", textAlign: "center", background: "linear-gradient(135deg,#eef2ff,#f0fdf4)", border: "1px solid #c7d2fe" }}>
              <div style={{ fontSize: "42px" }}>🏆</div>
              <h2 style={{ margin: "8px 0" }}>Course Completed!</h2>
              <p style={{ color: "#475569" }}>You completed the full roadmap, passed the final assessment and finished the final project.</p>
              <button className="submit-quiz-button" onClick={() => setCertificateOpen(true)}>View & Download Certificate →</button>
            </div>
          )}
        </section>
      )}

      {certificateOpen && courseCompleted && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(15,23,42,.55)", display: "grid", placeItems: "center", padding: "20px", overflowY: "auto" }}>
          <div className="certificate-print" style={{ width: "min(850px,100%)", background: "#fff", padding: "56px", borderRadius: "24px", textAlign: "center", boxShadow: "0 30px 80px rgba(0,0,0,.2)" }}>
            <div style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "3px" }}>LIFEMAP</div>
            <div style={{ fontSize: "52px", margin: "18px 0" }}>🏆</div>
            <p style={{ letterSpacing: "3px", color: "#64748b" }}>CERTIFICATE OF COMPLETION</p>
            <h1 style={{ fontSize: "40px", margin: "18px 0" }}>Certificate of Completion</h1>
            <p style={{ fontSize: "18px", color: "#475569" }}>This certificate is presented to</p>

            <input
              value={studentName}
              onChange={(event) => saveStudentName(event.target.value)}
              placeholder="Enter your name"
              aria-label="Student name"
              style={{ width: "min(520px,100%)", boxSizing: "border-box", padding: "14px 16px", borderRadius: "12px", border: "1px solid #cbd5e1", textAlign: "center", fontSize: "20px", fontWeight: 700, margin: "8px auto 18px" }}
            />

            <p style={{ fontSize: "16px", color: "#475569" }}>for successfully completing the LifeMap learning journey</p>
            <h2 style={{ fontSize: "30px", margin: "10px 0" }}>{roadmap.name}</h2>
            <p style={{ color: "#64748b" }}>Completed on {new Date(finalProject?.completedAt || Date.now()).toLocaleDateString()}</p>
            <p style={{ fontFamily: "monospace", color: "#475569" }}>Certificate ID: {activeGoalProgress.certificateId || createCertificateId(goal)}</p>
            <p style={{ marginTop: "28px", fontSize: "13px", color: "#64748b" }}>This is a LifeMap learning-completion certificate and is not an accredited academic or professional certification.</p>
            <div className="certificate-actions" style={{ marginTop: "28px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
              <button className="submit-quiz-button" onClick={() => { if (!studentName.trim()) { alert("Please enter your name on the certificate first."); return; } window.print(); }}>🖨 Print / Save as PDF</button>
              <button className="complete-button" onClick={() => setCertificateOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* FEATURES */}

      <section
        className="features-section"
        id="features"
      >
        <div className="section-heading">
          <p className="section-tag">
            WHY LIFEMAP
          </p>

          <h2>
            Everything you need
            <br />
            to keep learning.
          </h2>

          <p>
            LifeMap turns a big goal into small,
            actionable steps.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <div className="feature-icon">🗺️</div>
            <h3>Goal-Based Roadmaps</h3>
            <p>
              Start with a goal and follow a
              structured path from foundations to
              advanced skills.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">02</div>
            <div className="feature-icon">🎥</div>
            <h3>Related Learning</h3>
            <p>
              Every lesson connects you with a
              specific tutorial focused on the topic.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">03</div>
            <div className="feature-icon">✍️</div>
            <h3>Practice Along the Way</h3>
            <p>
              Turn concepts into skills using
              simple practical tasks.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">04</div>
            <div className="feature-icon">📈</div>
            <h3>Track Your Progress</h3>
            <p>
              See progress, earn XP, unlock badges
              and celebrate your milestones.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="final-cta">
        <div>
          <p className="section-tag">START TODAY</p>

          <h2>
            Your goal is big.
            <br />
            Your next step doesn't have to be.
          </h2>

          <p>
            Choose a goal and let LifeMap show
            you the path.
          </p>
        </div>

        <button
          onClick={goHome}
          className="cta-button"
        >
          Create Your Roadmap →
        </button>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark">L</span>

          <div>
            <strong>LifeMap</strong>
            <p>Learn with direction.</p>
          </div>
        </div>

        <p className="footer-copy">
          © 2026 LifeMap. Built to turn goals
          into progress.
        </p>
      </footer>

        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            right: "18px",
            bottom: "18px",
            zIndex: 40,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid rgba(148,163,184,.22)",
            background: "rgba(255,255,255,.92)",
            boxShadow: "0 10px 30px rgba(15,23,42,.14)",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ↑
        </button>
    </div>
  );
}

export default App;
