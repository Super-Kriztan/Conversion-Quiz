const TOTAL_QUESTIONS = 10; 

const allQuestions = [
  // Celsius to Fahrenheit
  { question: "Convert 0°C to Fahrenheit.", choices: ["32°F", "0°F", "50°F", "100°F"], correct: "32°F" },
  { question: "Convert 25°C to Fahrenheit.", choices: ["77°F", "80°F", "70°F", "90°F"], correct: "77°F" },
  { question: "Convert 100°C to Fahrenheit.", choices: ["212°F", "200°F", "180°F", "220°F"], correct: "212°F" },

  // Fahrenheit to Celsius
  { question: "Convert 32°F to Celsius.", choices: ["0°C", "10°C", "5°C", "-5°C"], correct: "0°C" },
  { question: "Convert 77°F to Celsius.", choices: ["25°C", "30°C", "20°C", "15°C"], correct: "25°C" },
  { question: "Convert 98.6°F to Celsius.", choices: ["37°C", "40°C", "35°C", "30°C"], correct: "37°C" },

  //  Celsius to Kelvin
  { question: "Convert 0°C to Kelvin.", choices: ["273.15 K", "250 K", "300 K", "100 K"], correct: "273.15 K" },
  { question: "Convert 25°C to Kelvin.", choices: ["298.15 K", "295 K", "300 K", "280 K"], correct: "298.15 K" },
  { question: "Convert 100°C to Kelvin.", choices: ["373.15 K", "350 K", "400 K", "360 K"], correct: "373.15 K" },

  //  Kelvin to Celsius
  { question: "Convert 273.15 K to Celsius.", choices: ["0°C", "100°C", "273°C", "-273°C"], correct: "0°C" },
  { question: "Convert 310 K to Celsius.", choices: ["36.85°C", "40°C", "30°C", "25°C"], correct: "36.85°C" },
  { question: "Convert 350 K to Celsius.", choices: ["76.85°C", "80°C", "50°C", "60°C"], correct: "76.85°C" },

  //  Fahrenheit to Kelvin
  { question: "Convert 32°F to Kelvin.", choices: ["273.15 K", "300 K", "250 K", "100 K"], correct: "273.15 K" },
  { question: "Convert 212°F to Kelvin.", choices: ["373.15 K", "350 K", "300 K", "400 K"], correct: "373.15 K" },
  { question: "Convert 68°F to Kelvin.", choices: ["293.15 K", "295 K", "300 K", "285 K"], correct: "293.15 K" },

  //  Kelvin to Fahrenheit
  { question: "Convert 273.15 K to Fahrenheit.", choices: ["32°F", "0°F", "50°F", "100°F"], correct: "32°F" },
  { question: "Convert 373.15 K to Fahrenheit.", choices: ["212°F", "200°F", "220°F", "180°F"], correct: "212°F" },
  { question: "Convert 310 K to Fahrenheit.", choices: ["98.6°F", "100°F", "90°F", "105°F"], correct: "98.6°F" },

  //  Other
  { question: "What is the freezing point of water in Celsius?", choices: ["0°C", "32°C", "100°C", "-32°C"], correct: "0°C" },
  { question: "What is the boiling point of water in Fahrenheit?", choices: ["212°F", "100°F", "373°F", "180°F"], correct: "212°F" },
  { question: "What is absolute zero in Kelvin?", choices: ["0 K", "-273.15 K", "273.15 K", "32 K"], correct: "0 K" },

  // Specific Heat 
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

// Shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Display Questions

function displayQuestions() {
  const quizForm = document.getElementById("quizForm");
  quizForm.innerHTML = "";

  const selected = shuffleArray([...allQuestions]).slice(0, TOTAL_QUESTIONS);

  selected.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `
      <p><b>${index + 1}.</b> ${q.question}</p>
      ${q.choices
        .map(
          (choice) => `
          <label>
            <input type="radio" name="q${index}" value="${choice}">
            ${choice}
          </label>
        `
        )
        .join("")}
    `;
    quizForm.appendChild(div);
  });

  // For Submit
  document.getElementById("submitBtn").onclick = () =>
    checkAnswers(selected);
}


// Check Answers

function checkAnswers(selected) {
  let score = 0;

  selected.forEach((q, index) => {
    const userAnswer = document.querySelector(`input[name="q${index}"]:checked`);
    if (userAnswer && userAnswer.value === q.correct) score++;
  });

  let message = "";
  if (score <= 3) message = "🥶 Keep trying!";
  else if (score <= 6) message = "🔥 Not bad, warming up!";
  else if (score <= 8) message = "💪 You're on fire!";
  else message = "🏆 Perfect! You’re red hot!";

  document.getElementById("result").innerHTML = `
    <h3>Your Score: ${score} / ${TOTAL_QUESTIONS}</h3>
    <p>${message}</p>
    <button onclick="displayQuestions()">Try Again</button>
  `;
}


function checkAnswers(selected) {
  let score = 0;

  selected.forEach((q, index) => {
    const userAnswer = document.querySelector(`input[name="q${index}"]:checked`);
    if (userAnswer && userAnswer.value === q.correct) score++;
  });

  // Message and Image
  let message = "";
  let imgPath = "";

  if (score <= 3) {
    message = "😢 Low score — keep practicing!";
    imgPath = "image/sad.jpg";
  } else if (score <= 5) {
    message = "💪 I'll do better next time!";
    imgPath = "image/half.jpg";
  } else if (score <= 9) {
    message = "🔥 Passed — great job!";
    imgPath = "image/moderate.jpg";
  } else { 
    message = "🏆 Perfect score!";
    imgPath = "image/perfect.jpg";
  }

  document.getElementById("result").innerHTML = `
    <h3>Your Score: ${score} / 10</h3>
    <p>${message}</p>
    <img src="${imgPath}" alt="score image" class="score-img" />
    <button onclick="displayQuestions()">Try Again</button>
  `;
}


displayQuestions();
