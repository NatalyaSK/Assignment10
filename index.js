let score;
let questionNumber;
let min;
let max;
let correctAnswer;

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

}

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
    }  else {
        correctAnswer = num1 * num2;
    }

    return `${num1} ${op} ${num2}`;
}

function nextQuestion() {
    if (questionNumber >= 10) {
        showResults();
        return;
    }

    let question = generateuestion();

    document.querySelector(".container").innerHTML = 
    `<h1>Question ${questionNumber + 1}</h1><p>${question}</p>
    <input type="text" id="answer" placeholder="Your answer" />
    <button onclick="submitAnswer()">Submit</button>`;

}

function showResults() {
    document.querySelector(".container").innerHTML = 
    `<h1>Quiz Completed!</h1><p>Your final score is ${score}/10.</p>`;
}