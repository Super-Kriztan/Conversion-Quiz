// Shuffle
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// TEMPERATURE HEAT QUIZ
const questions = [
  { question: "Convert 0°C to Fahrenheit.", choices: ["32°F", "0°F", "50°F", "100°F"], correct: "32°F" },
  { question: "Convert 25°C to Fahrenheit.", choices: ["77°F", "80°F", "70°F", "90°F"], correct: "77°F" },
  { question: "Convert 100°C to Fahrenheit.", choices: ["212°F", "200°F", "180°F", "220°F"], correct: "212°F" },
  { question: "Convert 32°F to Celsius.", choices: ["0°C", "10°C", "5°C", "-5°C"], correct: "0°C" },
  { question: "Convert 77°F to Celsius.", choices: ["25°C", "30°C", "20°C", "15°C"], correct: "25°C" },
  { question: "Convert 98.6°F to Celsius.", choices: ["37°C", "40°C", "35°C", "30°C"], correct: "37°C" },
  { question: "Convert 0°C to Kelvin.", choices: ["273.15 K", "250 K", "300 K", "100 K"], correct: "273.15 K" },
  { question: "Convert 25°C to Kelvin.", choices: ["298.15 K", "295 K", "300 K", "280 K"], correct: "298.15 K" },
  { question: "Convert 100°C to Kelvin.", choices: ["373.15 K", "350 K", "400 K", "360 K"], correct: "373.15 K" },
  { question: "Convert 273.15 K to Celsius.", choices: ["0°C", "100°C", "273°C", "-273°C"], correct: "0°C" },
  { question: "Convert 310 K to Celsius.", choices: ["36.85°C", "40°C", "30°C", "25°C"], correct: "36.85°C" },
  { question: "Convert 350 K to Celsius.", choices: ["76.85°C", "80°C", "50°C", "60°C"], correct: "76.85°C" },
  { question: "Convert 32°F to Kelvin.", choices: ["273.15 K", "300 K", "250 K", "100 K"], correct: "273.15 K" },
  { question: "Convert 212°F to Kelvin.", choices: ["373.15 K", "350 K", "300 K", "400 K"], correct: "373.15 K" },
  { question: "Convert 68°F to Kelvin.", choices: ["293.15 K", "295 K", "300 K", "285 K"], correct: "293.15 K" },
  { question: "Convert 273.15 K to Fahrenheit.", choices: ["32°F", "0°F", "50°F", "100°F"], correct: "32°F" },
  { question: "Convert 373.15 K to Fahrenheit.", choices: ["212°F", "200°F", "220°F", "180°F"], correct: "212°F" },
  { question: "Convert 310 K to Fahrenheit.", choices: ["98.6°F", "100°F", "90°F", "105°F"], correct: "98.6°F" },
  { question: "What is the formula for heat energy?", choices: ["Q = m × c × ΔT", "Q = m + c + ΔT", "Q = c / m × ΔT", "Q = P × t"], correct: "Q = m × c × ΔT" },
  { question: "What does 'c' represent in Q = m c ΔT?", choices: ["Specific heat", "Constant", "Capacity", "Celsius"], correct: "Specific heat" },
  { question: "If Q = 500 J, m = 2 kg, and ΔT = 25°C, find c.", choices: ["10 J/kg°C", "20 J/kg°C", "5 J/kg°C", "25 J/kg°C"], correct: "10 J/kg°C" },
  { question: "Which substance has the highest specific heat capacity?", choices: ["Water", "Iron", "Sand", "Copper"], correct: "Water" },
  { question: "If 1000 J heats 0.5 kg by 4°C, find c.", choices: ["500 J/kg°C", "400 J/kg°C", "250 J/kg°C", "1000 J/kg°C"], correct: "500 J/kg°C" }
];

let quizQuestions = shuffle(questions).slice(0, 10);

// Generate quiz
function generateQuiz() {
  const quizForm = document.getElementById("quizForm");
  const tracker = document.getElementById("progressTracker");
  quizForm.innerHTML = "";
  tracker.innerHTML = "";

  quizQuestions.forEach((q, i) => {
    // Question block
    const div = document.createElement("div");
    div.classList.add("question");
    div.id = "question-" + i;
    div.innerHTML = `<h4>${i + 1}. ${q.question}</h4>`;

    shuffle([...q.choices]).forEach(choice => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${i}" value="${choice}"> ${choice}
        </label>
      `;
    });
    quizForm.appendChild(div);

    // Progress tracker box (70/30 layout)
    const box = document.createElement("div");
    box.classList.add("progress-box");
    box.id = "box-" + i;
    box.innerHTML = `
      <div class="box-number">${i + 1}</div>
      <div class="box-bar"></div>
    `;

    box.onclick = function () {
      const questionEl = document.getElementById("question-" + i);
      questionEl.scrollIntoView({ behavior: "smooth", block: "center" });
      document.querySelectorAll(".question").forEach(q => q.classList.remove("blue-focus"));
      questionEl.classList.add("blue-focus");
      setTimeout(() => questionEl.classList.remove("blue-focus"), 3000);
    };

    tracker.appendChild(box);
  });

  quizForm.onchange = function (event) {
    if (event.target.type === "radio") {
      const index = parseInt(event.target.name.replace("q", ""));
      const box = document.getElementById("box-" + index);
      box.classList.add("answered-border");
    }
  };
}

// Check answers
function checkAnswers() {
  const unanswered = [];
  quizQuestions.forEach((_, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) unanswered.push(i + 1);
  });

  if (unanswered.length > 0) {
    if (!confirm(`You haven't answered question${unanswered.length > 1 ? "s" : ""}: ${unanswered.join(", ")}.\n\nAre you sure you want to submit?`)) return;
  } else {
    if (!confirm("Are you sure you want to submit your answers?")) return;
  }

  let score = 0;
  quizQuestions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const questionDiv = document.getElementById("question-" + i);
    const labels = questionDiv.querySelectorAll("label");
    const box = document.getElementById("box-" + i);
    const bar = box.querySelector(".box-bar");

    labels.forEach(label => label.classList.remove("correct", "wrong"));

    if (selected && selected.value.trim() === q.correct) {
      score++;
      selected.parentElement.classList.add("correct");
      bar.classList.add("bar-correct");
    } else {
      if (selected) selected.parentElement.classList.add("wrong");
      bar.classList.add("bar-wrong");

      // show correct answer
      labels.forEach(label => {
        const input = label.querySelector("input");
        if (input && input.value.trim() === q.correct) label.classList.add("correct");
      });
    }

    labels.forEach(label => {
      const input = label.querySelector("input");
      if (input) input.disabled = true;
    });
  });

  document.querySelectorAll('input[type="radio"]').forEach(opt => (opt.disabled = true));

  let message = "", image = "";
  if (score <= 3) {
    message = "😢 Low score. Try again!";
    image = "image/sad.jpg";
  } else if (score <= 5) {
    message = "😐 You’ll do better next time!";
    image = "image/half.jpg";
  } else if (score <= 9) {
    message = "🔥 You passed!";
    image = "image/moderate.jpg";
  } else {
    message = "🏆 Perfect score!";
    image = "image/perfect.jpg";
  }

  document.getElementById("result").innerHTML = `
    <h3>Your Score: ${score} / ${quizQuestions.length}</h3>
    <p>${message}</p>
    <img src="${image}" class="score-img" alt="Result" onerror="this.style.display='none';">
    <br><button onclick="restartQuiz()">Try Again</button>
  `;
}

function restartQuiz() {
  document.getElementById("result").innerHTML = "";
  quizQuestions = shuffle(questions).slice(0, 10);
  generateQuiz();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.onload = generateQuiz;
document.getElementById("submitBtn").addEventListener("click", checkAnswers);
