const questions = [
  //  Celsius to Fahrenheit
  { question: "Convert 0°C to Fahrenheit.", choices: ["32°F", "0°F", "50°F", "100°F"], correct: "32°F" },
  { question: "Convert 25°C to Fahrenheit.", choices: ["77°F", "80°F", "70°F", "90°F"], correct: "77°F" },
  { question: "Convert 100°C to Fahrenheit.", choices: ["212°F", "200°F", "180°F", "220°F"], correct: "212°F" },

  //  Fahrenheit to Celsius
  { question: "Convert 32°F to Celsius.", choices: ["0°C", "10°C", "5°C", "-5°C"], correct: "0°C" },
  { question: "Convert 77°F to Celsius.", choices: ["25°C", "30°C", "20°C", "15°C"], correct: "25°C" },
  { question: "Convert 98.6°F to Celsius.", choices: ["37°C", "40°C", "35°C", "30°C"], correct: "37°C" },

  //  Celsius to Kelvin
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

// Shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Select 10 random questions
const quizQuestions = shuffle(questions).slice(0, 10);

// Generate quiz
function generateQuiz() {
  const quizForm = document.getElementById("quizForm");
  quizForm.innerHTML = "";

  quizQuestions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question");

    div.innerHTML = `<h4>${index + 1}. ${q.question}</h4>`;
    const shuffledChoices = shuffle([...q.choices]);

    shuffledChoices.forEach(choice => {
      div.innerHTML += `
        <label><input type="radio" name="q${index}" value="${choice}"> ${choice}</label>
      `;
    });

    quizForm.appendChild(div);
  });
}

// Evaluate answers
function checkAnswers() {
  let score = 0;

  quizQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const questionDiv = document.querySelectorAll(".question")[index];
    const labels = questionDiv.querySelectorAll("label");

    // Clear previous styles
    labels.forEach(label => {
      label.style.color = "";
      label.style.fontWeight = "";
    });

    // Remove previous message
    const oldMsg = questionDiv.querySelector(".correct-answer-msg");
    if (oldMsg) oldMsg.remove();

    if (!selected) return;

    let selectedValue = selected.value.trim();

    if (selectedValue === q.correct) {
      score++;
      selected.parentElement.classList.add("correct");
    } else {
      selected.parentElement.classList.add("wrong");

      // Highlight correct answer
      labels.forEach(label => {
        if (label.textContent.trim().includes(q.correct)) {
          label.classList.add("correct");
        }
      });

      // Show correct answer text
      const correctMsg = document.createElement("p");
      correctMsg.classList.add("correct-answer-msg");
      correctMsg.innerHTML = `✅ Correct Answer: <b>${q.correct}</b>`;
      questionDiv.appendChild(correctMsg);
    }
  });

  let message = "";
  let image = "";

if (score <= 3) {
  message = "😢 Low score. Try again!";
  image = "image/sad.jpg"; // ✅ fixed filename
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
    <img src="${image}" class="score-img" alt="Result image" onerror="this.style.display='none';">
    <br>
    <button onclick="restartQuiz()">Try Again</button>
  `;
}

function restartQuiz() {
  generateQuiz();
  document.getElementById("result").innerHTML = "";
}


window.onload = generateQuiz;
document.getElementById("submitBtn").addEventListener("click", checkAnswers);
