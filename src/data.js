const roadmapData = {
  "web developer": {
    title: "Web Developer",
    description:
      "A complete beginner-to-job-ready path covering HTML, CSS, JavaScript, Git, React and real-world projects.",

    stages: [
      {
        title: "Web Foundations",
        subtitle: "Understand how the web works",
        icon: "🌐",

        lessons: [
          {
            title: "How the Web Works",
            description:
              "Understand websites, browsers, servers, HTTP and how a webpage reaches your screen.",

            video: {
              title: "How the Internet Works",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=7_LPdttKXPc",
            },

            practice: [
              "Explain what a browser does in your own words.",
              "Write the difference between a client and a server.",
              "Find the IP address of a website using browser developer tools.",
            ],

            quiz: [
              {
                question: "What is the main job of a web browser?",
                options: [
                  "Display and interact with web pages",
                  "Store electricity",
                  "Create computer hardware",
                  "Replace the operating system",
                ],
                answer: 0,
              },
              {
                question: "What is a server?",
                options: [
                  "A device or program that provides services or data",
                  "A type of keyboard",
                  "A CSS property",
                  "A browser extension",
                ],
                answer: 0,
              },
              {
                question: "What does HTTP mainly help with?",
                options: [
                  "Communication between web clients and servers",
                  "Changing monitor brightness",
                  "Installing RAM",
                  "Creating images",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "HTML Basics",
            description:
              "Learn the structure of webpages using HTML elements, headings, paragraphs, links and images.",

            video: {
              title: "HTML Full Course for Beginners",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
            },

            practice: [
              "Create a webpage containing a heading and three paragraphs.",
              "Add links to two websites.",
              "Add an image with meaningful alt text.",
            ],

            quiz: [
              {
                question: "What is HTML mainly used for?",
                options: [
                  "Structuring web page content",
                  "Styling web pages",
                  "Managing databases",
                  "Editing videos",
                ],
                answer: 0,
              },
              {
                question:
                  "Which HTML element is commonly used to create a hyperlink?",
                options: [
                  "<a>",
                  "<p>",
                  "<img>",
                  "<table>",
                ],
                answer: 0,
              },
              {
                question: "Which element is used for the largest heading?",
                options: [
                  "<h1>",
                  "<h6>",
                  "<head>",
                  "<title>",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "HTML Forms",
            description:
              "Learn how websites collect information using forms, inputs, labels and buttons.",

            video: {
              title: "HTML Forms Tutorial",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=2O8pkybH6po",
            },

            practice: [
              "Create a registration form.",
              "Add name, email and password inputs.",
              "Add a submit button and labels.",
            ],

            quiz: [
              {
                question: "Why are HTML forms used?",
                options: [
                  "To collect user input",
                  "To increase monitor size",
                  "To install software",
                  "To create computer processors",
                ],
                answer: 0,
              },
              {
                question: "Which element creates a user input field?",
                options: [
                  "<input>",
                  "<image>",
                  "<section>",
                  "<br>",
                ],
                answer: 0,
              },
              {
                question: "Which element is commonly used for a clickable form button?",
                options: [
                  "<button>",
                  "<heading>",
                  "<paragraph>",
                  "<label>",
                ],
                answer: 0,
              },
            ],
          },
        ],
      },

      {
        title: "CSS Styling",
        subtitle: "Make websites attractive and responsive",
        icon: "🎨",

        lessons: [
          {
            title: "CSS Basics",
            description:
              "Learn selectors, properties, values, colors, backgrounds and basic styling.",

            video: {
              title: "CSS Full Course for Beginners",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=OXGznpKZ_sA",
            },

            practice: [
              "Change the color and font of your webpage.",
              "Add a background color.",
              "Style headings and paragraphs differently.",
            ],

            quiz: [
              {
                question: "What is CSS mainly used for?",
                options: [
                  "Styling web pages",
                  "Creating databases",
                  "Writing operating systems",
                  "Creating computer hardware",
                ],
                answer: 0,
              },
              {
                question: "What does a CSS selector identify?",
                options: [
                  "HTML elements to style",
                  "Computer processors",
                  "Database tables",
                  "Video files",
                ],
                answer: 0,
              },
              {
                question: "Which property changes text color?",
                options: [
                  "color",
                  "font-size",
                  "margin",
                  "display",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "CSS Box Model",
            description:
              "Understand content, padding, border and margin — the foundation of webpage layout.",

            video: {
              title: "CSS Box Model Explained",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=rIO5326FgPE",
            },

            practice: [
              "Create a card with padding and border.",
              "Add margin between multiple cards.",
              "Experiment with different box sizes.",
            ],

            quiz: [
              {
                question: "Which four parts make up the CSS box model?",
                options: [
                  "Content, padding, border, margin",
                  "Header, footer, image, text",
                  "Width, height, color, font",
                  "HTML, CSS, JavaScript, React",
                ],
                answer: 0,
              },
              {
                question: "What does padding control?",
                options: [
                  "Space between content and border",
                  "Space outside the element",
                  "Text color",
                  "Font family",
                ],
                answer: 0,
              },
              {
                question: "What does margin control?",
                options: [
                  "Space outside an element's border",
                  "Text size",
                  "Background image",
                  "HTML structure",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "Flexbox",
            description:
              "Learn how to arrange webpage elements efficiently using CSS Flexbox.",

            video: {
              title: "CSS Flexbox Course",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=fYq5PXgSsbE",
            },

            practice: [
              "Create a horizontal navigation bar.",
              "Center a card using Flexbox.",
              "Create three equal-width boxes.",
            ],

            quiz: [
              {
                question: "What is Flexbox mainly used for?",
                options: [
                  "Arranging elements in a layout",
                  "Creating databases",
                  "Writing Java programs",
                  "Editing images",
                ],
                answer: 0,
              },
              {
                question: "Which property controls alignment along the main axis?",
                options: [
                  "justify-content",
                  "font-size",
                  "border",
                  "background",
                ],
                answer: 0,
              },
              {
                question: "Which property commonly aligns items across the cross axis?",
                options: [
                  "align-items",
                  "color",
                  "padding",
                  "position",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "Responsive Design",
            description:
              "Learn how to make websites work properly on mobile, tablet and desktop screens.",

            video: {
              title: "Responsive Web Design",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=srvUrASNj0s",
            },

            practice: [
              "Make your existing webpage mobile-friendly.",
              "Use a media query.",
              "Test your webpage at different screen widths.",
            ],

            quiz: [
              {
                question: "What is responsive web design?",
                options: [
                  "Designing websites that adapt to different screen sizes",
                  "Making websites only for desktops",
                  "Removing CSS from websites",
                  "Using only images on a website",
                ],
                answer: 0,
              },
              {
                question: "What are media queries commonly used for?",
                options: [
                  "Applying styles based on device or screen conditions",
                  "Creating databases",
                  "Running Python programs",
                  "Uploading files",
                ],
                answer: 0,
              },
              {
                question: "Why should websites support mobile screens?",
                options: [
                  "Users access websites from many different devices",
                  "Mobile devices cannot display HTML",
                  "CSS only works on phones",
                  "Websites cannot run on computers",
                ],
                answer: 0,
              },
            ],
          },
        ],
      },

      {
        title: "JavaScript",
        subtitle: "Make websites interactive",
        icon: "⚡",

        lessons: [
          {
            title: "JavaScript Basics",
            description:
              "Learn variables, data types, operators and the basic structure of JavaScript programs.",

            video: {
              title: "JavaScript Full Course for Beginners",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
            },

            practice: [
              "Create variables for your name and age.",
              "Perform basic arithmetic operations.",
              "Print different values using console.log().",
            ],

            quiz: [
              {
                question: "What is JavaScript commonly used for?",
                options: [
                  "Adding behavior and interactivity to web pages",
                  "Creating computer chips",
                  "Replacing HTML completely",
                  "Managing electricity",
                ],
                answer: 0,
              },
              {
                question: "What is a variable?",
                options: [
                  "A named place for storing a value",
                  "A web browser",
                  "A CSS selector",
                  "A database server",
                ],
                answer: 0,
              },
              {
                question: "What does console.log() commonly do?",
                options: [
                  "Prints information to the console",
                  "Creates an HTML image",
                  "Changes the screen size",
                  "Deletes a file",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "Functions",
            description:
              "Learn how to create reusable blocks of JavaScript code using functions.",

            video: {
              title: "JavaScript Functions",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=N8ap4k_1QEQ",
            },

            practice: [
              "Create a function that adds two numbers.",
              "Create a function that greets a user.",
              "Call the same function with different values.",
            ],

            quiz: [
              {
                question: "What is a function?",
                options: [
                  "A reusable block of code",
                  "A CSS color",
                  "An HTML image",
                  "A browser window",
                ],
                answer: 0,
              },
              {
                question: "Why are functions useful?",
                options: [
                  "They help organize and reuse code",
                  "They increase screen brightness",
                  "They replace the keyboard",
                  "They remove HTML",
                ],
                answer: 0,
              },
              {
                question: "What is a parameter?",
                options: [
                  "A value received by a function",
                  "A CSS selector",
                  "An HTML page",
                  "A browser",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "Arrays and Objects",
            description:
              "Learn how JavaScript stores and manages collections of related data.",

            video: {
              title: "JavaScript Arrays and Objects",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            },

            practice: [
              "Create an array containing five skills.",
              "Create an object describing yourself.",
              "Access individual array and object values.",
            ],

            quiz: [
              {
                question: "What is an array?",
                options: [
                  "A collection of values stored in order",
                  "A CSS rule",
                  "A web browser",
                  "A database server",
                ],
                answer: 0,
              },
              {
                question: "What is an object commonly used for?",
                options: [
                  "Storing related data using properties",
                  "Styling HTML",
                  "Playing videos",
                  "Creating computer hardware",
                ],
                answer: 0,
              },
              {
                question: "Which notation is commonly used to access an array item by index?",
                options: [
                  "arr[0]",
                  "arr<>",
                  "arr#0",
                  "arr::0",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "DOM Manipulation",
            description:
              "Learn how JavaScript interacts with HTML elements and changes webpages dynamically.",

            video: {
              title: "JavaScript DOM Manipulation",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=5fb2aPlgoys",
            },

            practice: [
              "Change webpage text using JavaScript.",
              "Change the style of an element.",
              "Create a button that changes webpage content.",
            ],

            quiz: [
              {
                question: "What does DOM stand for?",
                options: [
                  "Document Object Model",
                  "Data Operation Method",
                  "Digital Object Machine",
                  "Document Output Mode",
                ],
                answer: 0,
              },
              {
                question: "What does the DOM represent?",
                options: [
                  "The structure of a web document as objects",
                  "A database",
                  "A CSS file",
                  "A video file",
                ],
                answer: 0,
              },
              {
                question: "Why is DOM manipulation useful?",
                options: [
                  "It allows JavaScript to change webpage content and elements",
                  "It creates computer processors",
                  "It replaces the internet",
                  "It removes the browser",
                ],
                answer: 0,
              },
            ],
          },
        ],
      },

      {
        title: "Developer Tools",
        subtitle: "Work like a real developer",
        icon: "🛠️",

        lessons: [
          {
            title: "Git and GitHub",
            description:
              "Learn version control and how developers store and manage projects using GitHub.",

            video: {
              title: "Git and GitHub for Beginners",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
            },

            practice: [
              "Create a local Git repository.",
              "Make your first commit.",
              "Create a GitHub repository and push your project.",
            ],

            quiz: [
              {
                question: "What is Git?",
                options: [
                  "A version control system",
                  "A programming language",
                  "A web browser",
                  "A database",
                ],
                answer: 0,
              },
              {
                question: "What is GitHub?",
                options: [
                  "A platform for hosting and collaborating on code repositories",
                  "A CSS framework",
                  "A computer processor",
                  "A JavaScript variable",
                ],
                answer: 0,
              },
              {
                question: "Why do developers use version control?",
                options: [
                  "To track and manage changes to code",
                  "To increase monitor brightness",
                  "To replace HTML",
                  "To create hardware",
                ],
                answer: 0,
              },
            ],
          },
        ],
      },

      {
        title: "React",
        subtitle: "Build modern frontend applications",
        icon: "⚛️",

        lessons: [
          {
            title: "React Basics",
            description:
              "Understand React, components and the basic structure of a React application.",

            video: {
              title: "React Course for Beginners",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
            },

            practice: [
              "Create your first React component.",
              "Display a heading and paragraph using JSX.",
              "Create multiple reusable components.",
            ],

            quiz: [
              {
                question: "What is React?",
                options: [
                  "A JavaScript library for building user interfaces",
                  "A database system",
                  "A CSS property",
                  "An operating system",
                ],
                answer: 0,
              },
              {
                question: "What is a React component?",
                options: [
                  "A reusable UI building block",
                  "A database table",
                  "A CSS color",
                  "A browser",
                ],
                answer: 0,
              },
              {
                question: "What is JSX?",
                options: [
                  "A syntax commonly used in React to describe UI",
                  "A database language",
                  "A CSS framework",
                  "A web server",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "React Props and State",
            description:
              "Learn how React components share information and manage changing data.",

            video: {
              title: "React Props and State",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=SqcY0GlETPk",
            },

            practice: [
              "Pass a name to a component using props.",
              "Create a counter using state.",
              "Build a small component with changing data.",
            ],

            quiz: [
              {
                question: "What are props?",
                options: [
                  "Data passed from one component to another",
                  "CSS styles",
                  "Database tables",
                  "Browser settings",
                ],
                answer: 0,
              },
              {
                question: "What is state?",
                options: [
                  "Data managed by a component that can change",
                  "A CSS selector",
                  "An HTML tag",
                  "A Git command",
                ],
                answer: 0,
              },
              {
                question: "Why is state useful in React?",
                options: [
                  "It allows UI to respond to changing data",
                  "It creates databases",
                  "It replaces JavaScript",
                  "It installs React",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "React Hooks",
            description:
              "Learn important React Hooks such as useState and useEffect.",

            video: {
              title: "React Hooks Tutorial",
              channel: "freeCodeCamp.org",
              level: "Intermediate",
              url: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
            },

            practice: [
              "Use useState to create a counter.",
              "Use useEffect to run code after rendering.",
              "Build a small interactive React component.",
            ],

            quiz: [
              {
                question: "What is a React Hook?",
                options: [
                  "A function that lets components use React features",
                  "A CSS selector",
                  "A database command",
                  "A browser extension",
                ],
                answer: 0,
              },
              {
                question: "What does useState provide?",
                options: [
                  "State and a function to update it",
                  "HTML and CSS",
                  "A Git repository",
                  "A database",
                ],
                answer: 0,
              },
              {
                question: "What is useEffect commonly used for?",
                options: [
                  "Handling side effects in a component",
                  "Creating CSS classes",
                  "Writing HTML headings",
                  "Creating Git commits",
                ],
                answer: 0,
              },
            ],
          },
        ],
      },

      {
        title: "Real Projects",
        subtitle: "Turn knowledge into portfolio projects",
        icon: "🚀",

        lessons: [
          {
            title: "Build a Portfolio Website",
            description:
              "Create a personal portfolio that presents your skills, projects and contact information.",

            video: {
              title: "Build a Portfolio Website",
              channel: "freeCodeCamp.org",
              level: "Intermediate",
              url: "https://www.youtube.com/watch?v=xV7S8BhIeBo",
            },

            practice: [
              "Create Home, About, Skills and Projects sections.",
              "Make the portfolio responsive.",
              "Deploy the portfolio online.",
            ],

            quiz: [
              {
                question: "Why is a portfolio useful for a developer?",
                options: [
                  "It demonstrates skills and projects",
                  "It replaces a programming language",
                  "It creates a database",
                  "It installs Git",
                ],
                answer: 0,
              },
              {
                question: "What should a developer portfolio commonly contain?",
                options: [
                  "Projects and technical skills",
                  "Only random images",
                  "Only advertisements",
                  "Only browser settings",
                ],
                answer: 0,
              },
              {
                question: "Why should a portfolio be responsive?",
                options: [
                  "It should work across different screen sizes",
                  "It removes JavaScript",
                  "It prevents HTML from loading",
                  "It replaces GitHub",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "Build a Full Project",
            description:
              "Combine HTML, CSS, JavaScript and React knowledge to build a complete application.",

            video: {
              title: "Build a Full Stack Project",
              channel: "freeCodeCamp.org",
              level: "Intermediate",
              url: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
            },

            practice: [
              "Choose a real problem to solve.",
              "Design the application before coding.",
              "Build, test and deploy the project.",
            ],

            quiz: [
              {
                question: "What makes a project useful for a portfolio?",
                options: [
                  "It demonstrates real skills and solves a meaningful problem",
                  "It contains only copied code",
                  "It has no user interface",
                  "It is never tested",
                ],
                answer: 0,
              },
              {
                question: "Why should you test an application?",
                options: [
                  "To find and fix problems",
                  "To remove all code",
                  "To replace HTML",
                  "To make the monitor brighter",
                ],
                answer: 0,
              },
              {
                question: "Why is deployment important?",
                options: [
                  "It makes the application available for users",
                  "It deletes the project",
                  "It replaces JavaScript",
                  "It removes CSS",
                ],
                answer: 0,
              },
            ],
          },
        ],
      },

      {
        title: "Job Ready",
        subtitle: "Prepare for internships and developer jobs",
        icon: "🎯",

        lessons: [
          {
            title: "Resume and GitHub",
            description:
              "Learn how to present your technical skills and projects professionally.",

            video: {
              title: "How to Build a Developer Resume",
              channel: "freeCodeCamp.org",
              level: "Beginner",
              url: "https://www.youtube.com/watch?v=YvR2jY7V7nA",
            },

            practice: [
              "Create a one-page technical resume.",
              "Add your strongest projects.",
              "Organize your GitHub repositories.",
            ],

            quiz: [
              {
                question: "What should a technical resume highlight?",
                options: [
                  "Relevant skills, projects and experience",
                  "Only hobbies",
                  "Only personal photos",
                  "Only social media posts",
                ],
                answer: 0,
              },
              {
                question: "Why is GitHub useful for developers?",
                options: [
                  "It can showcase code and projects",
                  "It replaces a resume completely",
                  "It creates computer hardware",
                  "It is a CSS property",
                ],
                answer: 0,
              },
              {
                question: "Why should projects have descriptions?",
                options: [
                  "To explain what was built and what technologies were used",
                  "To make the code longer",
                  "To hide the project purpose",
                  "To replace the source code",
                ],
                answer: 0,
              },
            ],
          },

          {
            title: "Interview Preparation",
            description:
              "Prepare for technical interviews, coding questions and common developer interview topics.",

            video: {
              title: "Frontend Interview Preparation",
              channel: "freeCodeCamp.org",
              level: "Intermediate",
              url: "https://www.youtube.com/watch?v=Z4gI1JpM4vM",
            },

            practice: [
              "Practice JavaScript interview questions.",
              "Explain your projects without reading notes.",
              "Practice solving coding problems regularly.",
            ],

            quiz: [
              {
                question: "Why should you understand your own projects deeply?",
                options: [
                  "You may need to explain your decisions during interviews",
                  "It makes HTML unnecessary",
                  "It removes the need for coding",
                  "It replaces GitHub",
                ],
                answer: 0,
              },
              {
                question: "What is a technical interview designed to evaluate?",
                options: [
                  "Technical knowledge and problem-solving ability",
                  "Favorite colors",
                  "Computer screen size",
                  "Internet speed",
                ],
                answer: 0,
              },
              {
                question: "Why is regular coding practice useful?",
                options: [
                  "It improves problem-solving and coding skills",
                  "It removes the need to learn concepts",
                  "It replaces all projects",
                  "It disables programming errors",
                ],
                answer: 0,
              },
            ],
          },
        ],
      },
    ],
  },
};

export default roadmapData;