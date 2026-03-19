let score;
let questionNumber;
let min;
let max;

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

function showResults() {
    document.querySelector(".container").innerHTML = 
    `<h1>Quiz Completed!</h1><p>Your final score is ${score}/10.</p>`;
}