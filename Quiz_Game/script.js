const startscreen = document.getElementById("start-screen");
const quizscreen = document.getElementById("questions-screen");
const resultscreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("options");
const currQuestionspan = document.getElementById("start-q");
const totalQuestionspan = document.getElementById("end-q");
const scorespan = document.getElementById("score");
const finalScorespan = document.getElementById("score-achieved");
const maxScorespan = document.getElementById("total-score");
const resultmsg = document.getElementById("res-message");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question:
      "Which normal form removes partial dependency in a database table?",
    answers: [
      { text: "1NF", correct: false },
      { text: "2NF", correct: true },
      { text: "3NF", correc: false },
      { text: "BCNF", correct: false },
    ],
  },
  {
    question:
      "Which of the following is not a valid ACID property of a transaction?",
    answers: [
      { text: "Atomicity", correct: false },
      { text: "Consistency", correct: false },
      { text: "Isolation", correct: false },
      { text: "Accessibility", correct: true },
    ],
  },
  {
    question: "Which SQL clause is used to filter records after aggregation?",
    answers: [
      { text: "WHERE", correct: false },
      { text: "GROUP BY", correct: false },
      { text: "HAVING", correct: true },
      { text: "ORDER BY", correct: false },
    ],
  },
  {
    question:
      "What will be the result of the following query?\nSELECT COUNT(*) FROM Employees WHERE salary = NULL;",
    answers: [
      { text: "Counts employees with NULL salary", correct: false },
      { text: "Returns error", correct: false },
      { text: "Returns 0", correct: true },
      { text: "Counts all employees", correct: false },
    ],
  },
  {
    question: "What is the time complexity of binary search in a sorted array?",
    answers: [
      { text: "O(n)", correct: false },
      { text: "O(log n)", correct: true },
      { text: "O(n log n)", correct: false },
      { text: "O(1)", correct: false },
    ],
  },
  {
    question:
      "Which data structure is used in Breadth First Search (BFS) of a graph?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Priority Queue", correct: false },
      { text: "Set", correct: false },
    ],
  },
  {
    question: "Which CPU scheduling algorithm can cause starvation?",
    answers: [
      { text: "First Come First Serve", correct: false },
      { text: "Round Robin", correct: false },
      { text: "Shortest Job First", correct: true },
      { text: "FIFO", correct: false },
    ],
  },
  {
    question:
      "Which of the following is a non-preemptive scheduling algorithm?",
    answers: [
      { text: "Round Robin", correct: false },
      { text: "Priority Scheduling (Preemptive)", correct: false },
      { text: "Shortest Remaining Time First", correct: false },
      { text: "First Come First Serve", correct: true },
    ],
  },
  {
    question:
      "If the ratio of boys to girls in a class is 3:2 and there are 30 students, how many boys are there?",
    answers: [
      { text: "12", correct: false },
      { text: "15", correct: false },
      { text: "18", correct: true },
      { text: "20", correct: false },
    ],
  },
  {
    question:
      "A man walks 10 km north, then 10 km east, then 10 km south. How far is he from the starting point?",
    answers: [
      { text: "0 km", correct: false },
      { text: "10 km", correct: true },
      { text: "20 km", correct: false },
      { text: "√200 km", correct: false },
    ],
  },
];

let currquestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionspan.textContent = quizQuestions.length;
maxScorespan.textContent = quizQuestions.length;

//Adding Event Listeners
startBtn.addEventListener("click", startQuiz);

function startQuiz(){
  currquestionIndex = 0;
  score = 0;
  scorespan.textContent = 0;
  startscreen.classList.remove("active");
  quizscreen.classList.add("active");
  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currquestion = quizQuestions[currquestionIndex];
  currQuestionspan.textContent = currquestionIndex + 1;
  questionText.textContent = currquestion.question;
  const progress_percent = (currquestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progress_percent+"%";
  answersContainer.innerHTML = "";
  currquestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedBtn) {
      button.classList.add("incorrect");
    }
  });
  if (isCorrect) {
    score++;
    scorespan.textContent = score;
  }
  setTimeout(() => {
    currquestionIndex++;
    if (currquestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizscreen.classList.remove("active");
  resultscreen.classList.add("active");
  finalScorespan.textContent = score;
  maxScorespan.textContent = quizQuestions.length;
  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultmsg.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultmsg.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultmsg.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultmsg.textContent = "Not bad! Try again to improve!";
  } else {
    resultmsg.textContent = "Keep studying! You'll get better!";
  }
}

restartBtn.addEventListener("click", () => {
  resultscreen.classList.remove('active');
  startQuiz();
});
