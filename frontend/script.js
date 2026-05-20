let questions = [];
let currentQuestion = 0;
let userAnswers = [];
let timer;

const API_BASE = "https://mcq-test-platform-9nl2.onrender.com";

async function generateTest() {
    const mcqText = document.getElementById("mcqInput").value;
    const questionCount = document.getElementById("questionCount").value;
    const timerMinutes = document.getElementById("timerMinutes").value;

    if (!mcqText || !questionCount || !timerMinutes) {
        alert("Please fill all fields.");
        return;
    }

    const parsedQuestions = parseQuestions(mcqText);

    if (parsedQuestions.length === 0) {
        alert("Invalid MCQ format.");
        return;
    }

    for (const q of parsedQuestions) {
        await fetch(`${API_BASE}/api/questions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: q.question,
                optionA: q.options[0],
                optionB: q.options[1],
                optionC: q.options[2],
                optionD: q.options[3],
                correctAnswer: q.answer
            })
        });
    }

    localStorage.setItem("mcqData", mcqText);
    localStorage.setItem("questionCount", questionCount);
    localStorage.setItem("timerMinutes", timerMinutes);

    window.location.href = "test.html";
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function parseQuestions(text) {
    const blocks = text.trim().split(/\n\s*\n/);
    const parsed = [];

    blocks.forEach(block => {
        const lines = block
            .split("\n")
            .map(line => line.trim())
            .filter(line => line !== "");

        if (lines.length < 6) return;

        let options = [
            lines[1],
            lines[2],
            lines[3],
            lines[4]
        ];

        if (!lines[5].includes(":")) return;

        const correctAnswerLetter = lines[5].split(":")[1]?.trim();

        if (!correctAnswerLetter) return;

        const correctOptionText = options.find(opt =>
            opt && opt.startsWith(correctAnswerLetter)
        );

        if (!correctOptionText) return;

        options = shuffleArray(options);

        const newCorrectAnswer = options.find(
            opt => opt === correctOptionText
        )?.charAt(0);

        if (!newCorrectAnswer) return;

        parsed.push({
            question: lines[0],
            options: options,
            answer: newCorrectAnswer
        });
    });

    return shuffleArray(parsed);
}

function startTest() {
    const mcqData = localStorage.getItem("mcqData");
    const questionCount = parseInt(localStorage.getItem("questionCount"));
    const timerMinutes = parseInt(localStorage.getItem("timerMinutes"));

    if (!mcqData) return;

    questions = parseQuestions(mcqData).slice(0, questionCount);
    userAnswers = new Array(questions.length).fill("");

    localStorage.setItem("questions", JSON.stringify(questions));

    displayQuestion();
    startTimer(timerMinutes * 60);
}

function displayQuestion() {
    const q = questions[currentQuestion];

    if (!q) return;

    document.getElementById("questionNumber").innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("questionText").innerText = q.question;

    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";

    q.options.forEach(option => {
        const optionLetter = option.charAt(0);

        container.innerHTML += `
            <label class="option">
                <input type="radio" name="option" value="${optionLetter}">
                ${option}
            </label>
        `;
    });

    const inputs = document.querySelectorAll('input[name="option"]');

    inputs.forEach(input => {
        input.addEventListener("change", function () {
            userAnswers[currentQuestion] = this.value;
            localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

            const allOptions = document.querySelectorAll(".option");

            allOptions.forEach(opt => {
                const radio = opt.querySelector("input");
                const optionLetter = radio.value;

                radio.disabled = true;

                if (optionLetter === q.answer) {
                    opt.style.backgroundColor = "green";
                    opt.style.color = "white";
                }

                if (optionLetter === this.value && this.value !== q.answer) {
                    opt.style.backgroundColor = "red";
                    opt.style.color = "white";
                }
            });
        });
    });
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function startTimer(seconds) {
    timer = setInterval(() => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        document.getElementById("timer").innerText =
            `${minutes}:${secs < 10 ? "0" : ""}${secs}`;

        seconds--;

        if (seconds < 0) {
            clearInterval(timer);
            submitTest();
        }
    }, 1000);
}

async function submitTest() {
    clearInterval(timer);

    let score = 0;
    const userId = Number(localStorage.getItem("userId"));

    const testResponse = await fetch(`${API_BASE}/api/tests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            testName: "Custom MCQ Test",
            totalQuestions: questions.length,
            score: 0,
            duration: Number(localStorage.getItem("timerMinutes"))
        })
    });

    const savedTest = await testResponse.json();
    const testId = savedTest.id;

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const selected = userAnswers[i] || "";

        if (selected === q.answer) {
            score++;
        }

        await fetch(`${API_BASE}/api/answers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                testId,
                question: q.question,
                optionA: q.options[0],
                optionB: q.options[1],
                optionC: q.options[2],
                optionD: q.options[3],
                correctAnswer: q.answer,
                selectedAnswer: selected
            })
        });
    }

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);

    window.location.href = "result.html";
}

function showResult() {
    const score = localStorage.getItem("score");
    const total = localStorage.getItem("total");

    if (!score || !total) return;

    const percentage = ((score / total) * 100).toFixed(2);

    document.getElementById("scoreText").innerText =
        `Score: ${score} / ${total}`;

    document.getElementById("percentageText").innerText =
        `Percentage: ${percentage}%`;
}

function showReview() {
    const questions = JSON.parse(localStorage.getItem("questions"));
    const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));
    const reviewContent = document.getElementById("reviewContent");

    if (!questions || !userAnswers) return;

    reviewContent.innerHTML = "";

    questions.forEach((q, index) => {
        const userAnswerLetter = userAnswers[index] || "Not Answered";

        const userAnswerText =
            q.options.find(opt => opt.startsWith(userAnswerLetter)) || "Not Answered";

        const correctAnswerText =
            q.options.find(opt => opt.startsWith(q.answer));

        const isCorrect = userAnswerLetter === q.answer;

        reviewContent.innerHTML += `
            <div class="review-item">
                <h3>${q.question}</h3>
                <p>Your Answer:
                    <span class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                        ${userAnswerText}
                    </span>
                </p>
                <p>Correct Answer:
                    <span class="correct-answer">
                        ${correctAnswerText}
                    </span>
                </p>
            </div>
        `;
    });
}

function goHome() {
    window.location.href = "index.html";
}