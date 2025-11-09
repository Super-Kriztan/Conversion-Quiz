// Shuffle
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const questions = [
  // Celsius to Fahrenheit
  { question: "Convert 0°C to Fahrenheit.", choices: ["32°F", "0°F", "50°F", "100°F"], correct: "32°F" },
  { question: "Convert 25°C to Fahrenheit.", choices: ["77°F", "80°F", "70°F", "90°F"], correct: "77°F" },
  { question: "Convert 100°C to Fahrenheit.", choices: ["212°F", "200°F", "180°F", "220°F"], correct: "212°F" },

  // Fahrenheit to Celsius
  { question: "Convert 32°F to Celsius.", choices: ["0°C", "10°C", "5°C", "-5°C"], correct: "0°C" },
  { question: "Convert 77°F to Celsius.", choices: ["25°C", "30°C", "20°C", "15°C"], correct: "25°C" },
  { question: "Convert 98.6°F to Celsius.", choices: ["37°C", "40°C", "35°C", "30°C"], correct: "37°C" },

  // Celsius to Kelvin
  { question: "Convert 0°C to Kelvin.", choices: ["273.15 K", "250 K", "300 K", "100 K"], correct: "273.15 K" },
  { question: "Convert 25°C to Kelvin.", choices: ["298.15 K", "295 K", "300 K", "280 K"], correct: "298.15 K" },
  { question: "Convert 100°C to Kelvin.", choices: ["373.15 K", "350 K", "400 K", "360 K"], correct: "373.15 K" },

  // Kelvin to Celsius
  { question: "Convert 273.15 K to Celsius.", choices: ["0°C", "100°C", "273°C", "-273°C"], correct: "0°C" },
  { question: "Convert 310 K to Celsius.", choices: ["36.85°C", "40°C", "30°C", "25°C"], correct: "36.85°C" },
  { question: "Convert 350 K to Celsius.", choices: ["76.85°C", "80°C", "50°C", "60°C"], correct: "76.85°C" },

  // Fahrenheit to Kelvin
  { question: "Convert 32°F to Kelvin.", choices: ["273.15 K", "300 K", "250 K", "100 K"], correct: "273.15 K" },
  { question: "Convert 212°F to Kelvin.", choices: ["373.15 K", "350 K", "300 K", "400 K"], correct: "373.15 K" },
  { question: "Convert 68°F to Kelvin.", choices: ["293.15 K", "295 K", "300 K", "285 K"], correct: "293.15 K" },

  // Kelvin to Fahrenheit
  { question: "Convert 273.15 K to Fahrenheit.", choices: ["32°F", "0°F", "50°F", "100°F"], correct: "32°F" },
  { question: "Convert 373.15 K to Fahrenheit.", choices: ["212°F", "200°F", "220°F", "180°F"], correct: "212°F" },
  { question: "Convert 310 K to Fahrenheit.", choices: ["98.6°F", "100°F", "90°F", "105°F"], correct: "98.6°F" },

  // Specific Heat Capacity
  { question: "What is the formula for heat energy?", choices: ["Q = m × c × ΔT", "Q = m + c + ΔT", "Q = c / m × ΔT", "Q = P × t"], correct: "Q = m × c × ΔT" },
  { question: "What does 'c' represent in Q = m c ΔT?", choices: ["Specific heat", "Constant", "Capacity", "Celsius"], correct: "Specific heat" },
  { question: "If Q = 500 J, m = 2 kg, and ΔT = 25°C, find c.", choices: ["10 J/kg°C", "20 J/kg°C", "5 J/kg°C", "25 J/kg°C"], correct: "10 J/kg°C" },
  { question: "Which substance has the highest specific heat capacity?", choices: ["Water", "Iron", "Sand", "Copper"], correct: "Water" },
  { question: "If the mass doubles, how does it affect heat required?", choices: ["It doubles", "It halves", "No change", "It becomes four times"], correct: "It doubles" },
  { question: "If ΔT increases, how does heat required change?", choices: ["It increases", "It decreases", "No change", "It halves"], correct: "It increases" },
  { question: "Unit of specific heat capacity?", choices: ["J/kg°C", "J/°C", "J/kg", "kg/J°C"], correct: "J/kg°C" },
  { question: "If 1000 J heats 0.5 kg by 4°C, find c.", choices: ["500 J/kg°C", "400 J/kg°C", "250 J/kg°C", "1000 J/kg°C"], correct: "500 J/kg°C" },
  { question: "Why does water heat slower than metal?", choices: ["Higher specific heat", "Lower specific heat", "Same specific heat", "No relation"], correct: "Higher specific heat" }
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

    // Choices
    shuffle([...q.choices]).forEach(choice => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${i}" value="${choice}"> ${choice}
        </label>
      `;
    });

    // Hidden correct answer text (will appear after submit)
    div.innerHTML += `<p class="correct-answer" style="display:none; color:limegreen; font-weight:bold;"></p>`;
    quizForm.appendChild(div);

    // Progress tracker box
    const box = document.createElement("div");
    box.classList.add("progress-box");
    box.id = "box-" + i;
    box.innerHTML = `
      <div class="box-number">${i + 1}</div>
      <div class="box-bar"></div>
    `;

    // Scroll when box clicked
    box.onclick = function () {
      const questionEl = document.getElementById("question-" + i);
      questionEl.scrollIntoView({ behavior: "smooth", block: "center" });
      document.querySelectorAll(".question").forEach(q => q.classList.remove("blue-focus"));
      questionEl.classList.add("blue-focus");
      setTimeout(() => questionEl.classList.remove("blue-focus"), 3000);
    };

    tracker.appendChild(box);
  });

  // When user selects an answer (only updates blue bar)
  quizForm.onchange = function (event) {
  if (event.target.type === "radio") {
    const index = parseInt(event.target.name.replace("q", ""));
    const box = document.getElementById("box-" + index);
    const bar = box.querySelector(".box-bar");

    // remove previous selection color if any
    bar.classList.remove("bar-selected");

    // add blue fill for selection
    bar.classList.add("bar-selected");
  }
};
}


// Check answers
async function checkAnswers() {
  const unanswered = [];
  quizQuestions.forEach((_, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) unanswered.push(i + 1);
  });

 let proceed = true;

if (unanswered.length > 0) {
  proceed = await showConfirmation(`You haven't answered question${unanswered.length > 1 ? "s" : ""}: ${unanswered.join(", ")}.\n\nAre you sure you want to submit?`);
} else {
  proceed = await showConfirmation("Are you sure you want to submit your answers?");
}

if (!proceed) return;


  let score = 0;

  quizQuestions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const questionDiv = document.getElementById("question-" + i);
    const labels = questionDiv.querySelectorAll("label");
    const box = document.getElementById("box-" + i);
    const bar = box.querySelector(".box-bar");

    // Reset visual classes
    bar.classList.remove("bar-selected", "bar-correct", "bar-wrong");

    labels.forEach(label => label.classList.remove("correct", "wrong"));

    if (selected) {
      // keep the user's selection visible (radio remains checked)
      selected.checked = true;

      if (selected.value.trim() === q.correct) {
        // ✅ Correct
        score++;
        selected.parentElement.classList.add("correct");
        bar.classList.add("bar-correct");
      } else {
        // ❌ Wrong
        selected.parentElement.classList.add("wrong");
        bar.classList.add("bar-wrong");

        // Highlight correct one in green too
        labels.forEach(label => {
          const input = label.querySelector("input");
          if (input.value.trim() === q.correct) label.classList.add("correct");
        });
      }
    } else {
      // Unanswered question
      bar.style.background = "#ddd";
      // Highlight correct answer in green
      labels.forEach(label => {
        const input = label.querySelector("input");
        if (input.value.trim() === q.correct) label.classList.add("correct");
      });
    }

    // Disable all options so user can’t change answers after submitting
    labels.forEach(label => {
      const input = label.querySelector("input");
      if (input) input.disabled = true;
    });
  });

  // Final score display
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
  const resultEl = document.getElementById("result");
      if(resultEl) {
          resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

}
  
function showConfirmation(message) {
  return new Promise((resolve) => {
    const popup = document.getElementById("confirmationPopup");
    const overlay = document.getElementById("confirmationOverlay");
    const messageEl = document.getElementById("confirmationMessage");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");

    messageEl.textContent = message;
    popup.style.display = "block";
    overlay.style.display = "block";

    function cleanUp() {
      popup.style.display = "none";
      overlay.style.display = "none";
      yesBtn.removeEventListener("click", onYes);
      noBtn.removeEventListener("click", onNo);
    }

    function onYes() {
      cleanUp();
      resolve(true);
    }

    function onNo() {
      cleanUp();
      resolve(false);
    }

    yesBtn.addEventListener("click", onYes);
    noBtn.addEventListener("click", onNo);

    // Close popup if overlay clicked
    overlay.addEventListener("click", () => {
      cleanUp();
      resolve(false);
    }, { once: true });
  });
}


function submitQuiz() {
  let score = 0;
  const quizForm = document.getElementById("quizForm");
  const boxes = document.querySelectorAll(".progress-box");

  quizQuestions.forEach((q, i) => {
  const selected = document.querySelector(`input[name="q${i}"]:checked`);
  const questionDiv = document.getElementById("question-" + i);
  const labels = questionDiv.querySelectorAll("label");
  const box = document.getElementById("box-" + i);
  const bar = box.querySelector(".box-bar");

  // Remove previous classes
  bar.classList.remove("bar-correct", "bar-wrong");

  // Reset label colors
  labels.forEach(label => {
    label.style.color = "black";
    label.style.fontWeight = "normal";
  });

  if (selected) {
    if (selected.value === q.correct) {
      // ✅ Correct answer
      selected.parentElement.style.color = "limegreen";
      selected.parentElement.style.fontWeight = "bold";
      bar.classList.add("bar-correct"); // green
    } else {
      // ❌ Wrong answer
      selected.parentElement.style.color = "red";
      selected.parentElement.style.fontWeight = "bold";
      bar.classList.add("bar-wrong"); // red

      // Highlight correct answer
      labels.forEach(label => {
        const input = label.querySelector("input");
        if (input.value === q.correct) {
          label.style.color = "limegreen";
          label.style.fontWeight = "bold";
        }
      });
    }
  } else {
    // unanswered, keep default
    bar.style.background = "#ddd";
  }

  // Show correct answer text
  const correctAnswer = questionDiv.querySelector(".correct-answer");
  correctAnswer.style.display = "block";
  correctAnswer.textContent = `✔ Correct Answer: ${q.correct}`;

  // Disable all radio buttons after submission
  labels.forEach(label => {
    const input = label.querySelector("input");
    if (input) input.disabled = true;
  });
});

  // Display score result image (if you already have this part)
  showScoreImage(score);
}

function restartQuiz() {
  document.getElementById("result").innerHTML = "";
  quizQuestions = shuffle(questions).slice(0, 10);
  generateQuiz();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.onload = generateQuiz;
document.getElementById("submitBtn").addEventListener("click", checkAnswers);

// 🌗 DARK MODE TOGGLE
const toggle = document.getElementById("darkModeToggle");
const modeLabel = document.getElementById("modeLabel");

// Load saved preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
  modeLabel.textContent = "🌙 Dark Mode";
}

// Listen for toggle change
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    modeLabel.textContent = "🌙 Dark Mode";
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    modeLabel.textContent = "🌞 Light Mode";
  }
});
