// ------------------------------
// QUIZ DATA
// ------------------------------
const quizData = [
  {
    question: "Which array method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question: "What does i++ mean?",
    options: [
      "Decrease i by 1",
      "Increase i by 1",
      "Multiply i by 2",
      "Set i to 0",
    ],
    answer: 1,
  },
  {
    question: "Which keyword creates a constant variable?",
    options: ["let", "const", "var", "static"],
    answer: 1,
  },
  {
    question: "What doeas a Div do?",
    options: [
      "It serves as a container",
      "it allows nothing",
      "it's not a coding term",
      "it is like padding",
    ],
    answer: 0,
  },
];

// DOM ELEMENTS
// ------------------------------
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

// ------------------------------
// QUIZ STATE
// ------------------------------
let currentIndex = 0;
let score = 0;

// ------------------------------
// SHOW A QUESTION
// ------------------------------
function showQuestion() {
  const currentQuestion = quizData[currentIndex];

  // Show question text
  questionContainer.textContent = currentQuestion.question;

  // Clear old options
  optionsContainer.innerHTML = "";

  // Create option buttons
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");

    button.addEventListener("click", () => selectOption(index));

    optionsContainer.appendChild(button);
  });
}

// ------------------------------
// WHEN USER SELECTS ANSWER
// ------------------------------
function selectOption(selectedIndex) {
  const correctIndex = quizData[currentIndex].answer;

  // Grab all the option buttons
  const buttons = document.querySelectorAll(".option-btn");

  // Disable buttons so user can't click again
  buttons.forEach((btn) => (btn.disabled = true));

  // Color correct answer green
  buttons[correctIndex].style.backgroundColor = "green";
  buttons[correctIndex].style.color = "white";

  // If wrong answer chosen, color it red
  if (selectedIndex !== correctIndex) {
    buttons[selectedIndex].style.backgroundColor = "red";
    buttons[selectedIndex].style.color = "white";
  } else {
    score++; // answer is correct
  }

  // Allow user to go to next question
  nextButton.disabled = false;
}

// ------------------------------
// NEXT QUESTION
// ------------------------------
nextButton.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex < quizData.length) {
    nextButton.disabled = true;
    showQuestion();
  } else {
    endQuiz();
  }
});

// ------------------------------
// END OF QUIZ
// ------------------------------
function endQuiz() {
  document.getElementById("quiz-container").classList.add("hidden");
  scoreContainer.classList.remove("hidden");

  scoreText.textContent = `${score} / ${quizData.length}`;
}

// ------------------------------
// RESTART QUIZ
// ------------------------------
restartButton.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;

  scoreContainer.classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");

  nextButton.disabled = true;
  showQuestion();
});

// ------------------------------
nextButton.disabled = true;
showQuestion();
