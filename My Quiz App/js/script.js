const questions = [
    {
        question: "What is the closest planet to the Sun?",
        answer: [
            { text: "Venus", correct: false },
            { text: "Mercury", correct: true },
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
        ]
    },
    {
        question: "Which planet is known as the “Red Planet”?",
        answer: [
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "Who was the first human to travel into space?",
        answer: [
            { text: "Yuri Gagarin", correct: true },
            { text: "Neil Armstrong", correct: false },
            { text: "Rakesh Sharma", correct: false },
            { text: "Buzz Aldrin", correct: false },
        ]
    },
    {
        question: "What galaxy do we live in?",
        answer: [
            { text: "Andromeda Galaxy", correct: false },
            { text: "Sombrero Galaxy", correct: false },
            { text: "Whirlpool Galaxy", correct: false },
            { text: "Milky Way Galaxy", correct: true },
        ]
    },
    {
        question: "What is the name of the first artificial satellite launched into space?",
        answer: [
            { text: "Apollo 11", correct: false },
            { text: "Sputnik 1", correct: true },
            { text: "Voyager 1", correct: false },
            { text: "Hubble", correct: false },
        ]
    },
    {
        question: "Which planet has the most moons?",
        answer: [
            { text: "Jupiter", correct: false },
            { text: "Uranus", correct: false },
            { text: "Saturn", correct: true },
            { text: "Neptune", correct: false },
        ]
    },
    {
        question: "What is a light-year used to measure?",
        answer: [
            { text: "Time", correct: false },
            { text: "Distance", correct: true },
            { text: "Speed", correct: false },
            { text: "Brightness", correct: false },
        ]
    },
    {
        question: "What is the name of the largest volcano in the solar system?",
        answer: [
            { text: "Mount Everest", correct: false },
            { text: "Olympus Mons", correct: true },
            { text: "Mauna Kea", correct: false },
            { text: "Mount Etna", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.style.background = "green";
        score++;
    } else {
        selectedBtn.style.background = "red";
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.background = "green";
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 🎉`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
