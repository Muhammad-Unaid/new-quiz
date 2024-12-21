// Global Variables
let timeLeft = 180; // 3 minutes in seconds
let timerInterval;
const quizData = [
    { 
        question: "What does HTML stand for?", options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlink Markup Language", "None"], answer: 0 },
    { 
        question: "Which CSS property is used for text color?", options: ["color", "font-color", "background-color", "text-color"], answer: 0 },
    { 
        question: "Bootstrap is a __ framework.", options: ["CSS", "JavaScript", "Python", "None"], answer: 0 

    },
     {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlink Text Marking Language", "Home Tool Markup Language", "None of the above"],
        correct: 0,
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["color", "background-color", "bgcolor", "background"],
        correct: 1,
    },
    {
        question: "Which Bootstrap class adds padding to an element?",
        options: [".padding", ".p-", ".p-3", ".pad-3"],
        correct: 2,
    },
    {
        question: "What does 'let' declare in JavaScript?",
        options: ["A global variable", "A block-scoped variable", "A constant", "None of the above"],
        correct: 1,
    },
    {
        question: "Which CSS framework is used to create responsive designs?",
        options: ["jQuery", "Bootstrap", "React", "Tailwind"],
        correct: 1,
    },
    {
        question: "Which JavaScript function selects an element by ID?",
        options: ["getElementById()", "querySelector()", "getById()", "getId()"],
        correct: 0,
    },
    {
        question: "What is the correct syntax for linking a CSS file?",
        options: ["<link rel='stylesheet' href='style.css'>", "<style src='style.css'>", "<css href='style.css'>", "<link src='style.css'>"],
        correct: 0,
    },
    {
        question: "Which unit is NOT relative in CSS?",
        options: ["em", "rem", "px", "%"],
        correct: 2,
    },
    {
        question: "Which Bootstrap class adds margins?",
        options: [".m-", ".margin-", ".mg-", ".mar-"],
        correct: 0,
    },
    {
        question: "Which is NOT a valid JavaScript data type?",
        options: ["String", "Number", "Boolean", "Float"],
        correct: 3,
    }
    // Add 7 more questions...
];

// Save user data
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const roll = document.getElementById('roll').value;
    localStorage.setItem('user', JSON.stringify({ name, email, roll }));
    document.getElementById('userForm').classList.add('d-none');
    document.getElementById('quizSection').classList.remove('d-none');
    startQuiz();
});

// Start Quiz
function startQuiz() {
    const questionsDiv = document.getElementById('questions');
    quizData.forEach((data, index) => {
        const questionHTML = `
      <div class="mb-3">
        <p>${index + 1}. ${data.question}</p>
        ${data.options.map((opt, i) => `
          <div class="form-check">
            <input type="radio" class="form-check-input" name="q${index}" value="${i}">
            <label class="form-check-label">${opt}</label>
          </div>
        `).join('')}
      </div>`;
        questionsDiv.innerHTML += questionHTML;
    });
    startTimer();
}

// Timer Function
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('time').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

// Submit Quiz
document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();
    submitQuiz();
});

function submitQuiz() {
    clearInterval(timerInterval);
    let score = 0;
    quizData.forEach((data, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === data.answer) {
            score++;
        }
    });
    document.getElementById('quizSection').classList.add('d-none');
    document.getElementById('resultSection').classList.remove('d-none');
    document.getElementById('result').textContent = `You scored ${score} out of ${quizData.length}`;
}
