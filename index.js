// Global variables to track quiz state
let score = 0;
let questionNumber = 0;
let min = 0;
let max = 0;
let correctAnswer = 0;

/**
 * Starts the quiz based on selected difficulty.
 * Resets score and question counter, and sets number range.
 *
 * @param {string} difficulty - Selected level: beginner, intermediate, advanced
 */
function startQuiz(difficulty) {
  score = 0;
  document.getElementById("score").textContent = "Score: 0/10";

  if (difficulty === "beginner") {
    min = -50;
    max = 50;
  } else if (difficulty === "intermediate") {
    min = -1000;
    max = 1000;
  } else {
    min = -10000;
    max = 10000;
  }

  nextQuestion();
}

/**
 * Generates a random math question using random numbers and operators.
 * Also calculates and stores the correct answer.
 *
 * @returns {string} The formatted math question (e.g. "4 + 5")
 */
function generateQuestion() {
  let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
  let num2 = Math.floor(Math.random() * (max - min + 1)) + min;

  let operators = ["+", "-", "*", "/"];
  let op = operators[Math.floor(Math.random() * operators.length)];

  if (op === "/") {
    while (num2 === 0) {
      num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    correctAnswer = parseFloat((num1 / num2).toFixed(2));
  } else if (op === "+") {
    correctAnswer = num1 + num2;
  } else if (op === "-") {
    correctAnswer = num1 - num2;
  } else {
    correctAnswer = num1 * num2;
  }

  return `${num1} ${op} ${num2}`;
}

/**
 * Displays the next question or shows results if quiz is finished.
 * Updates the UI with a new question and input field.
 */
function nextQuestion() {
  if (questionNumber >= 10) {
    showResults();
    return;
  }

  let question = generateQuestion();

  document.querySelector(".container").innerHTML =
    `<h1>Question ${questionNumber + 1}</h1><p>${question}</p>
    <input type="text" id="answer" placeholder="Your answer" />
    <button onclick="checkAnswer()">Submit</button>
    <div id="feedback"></div>`;
}

/**
 * Checks the user's answer and updates score.
 * Displays feedback and shows "Next" button.
 */
function checkAnswer() {
  let userAnswer = document.querySelector("#answer").value.trim();

  if (userAnswer === "") {
    return;
  }
  let feedback = document.querySelector("#feedback");

  if (parseFloat(userAnswer) === correctAnswer) {
    score++;
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = `Incorrect! The correct answer was ${correctAnswer}.`;
  }

  document.getElementById("score").textContent = `Score: ${score}/10`;
  questionNumber++;

  document.querySelector(".container").innerHTML +=
    `<button onclick="nextQuestion()">Next</button>`;
}

/**
 * Displays final quiz results after all questions are completed.
 */
function showResults() {
  document.getElementById("score").textContent = "";
  document.querySelector(".container").innerHTML =
    `<h1>Quiz Completed!</h1><p>Your final score is ${score}/10.</p>`;
}
