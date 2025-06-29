const quizData = [
  {
    question: "How does your skin feel after washing?",
    options: [
      { text: "Tight and dry", value: "dry" },
      { text: "Shiny and oily", value: "oily" },
      { text: "Normal", value: "normal" },
      { text: "Red or itchy", value: "sensitive" }
    ]
  },
  {
    question: "How often do you notice oil on your face?",
    options: [
      { text: "Very often", value: "oily" },
      { text: "Rarely", value: "dry" },
      { text: "Sometimes", value: "normal" },
      { text: "With irritation", value: "sensitive" }
    ]
  },
  {
    question: "How does your skin react to new products?",
    options: [
      { text: "It gets red or itchy", value: "sensitive" },
      { text: "It breaks out", value: "oily" },
      { text: "It’s fine", value: "normal" },
      { text: "It feels dry", value: "dry" }
    ]
  }
];

let currentQuestion = 0;
let scores = { oily: 0, dry: 0, normal: 0, sensitive: 0 };

function showQuestion(index) {
  const container = document.getElementById("quizContainer");
  container.innerHTML = ""; // Clear previous

  if (index >= quizData.length) {
    // Quiz done → show result
    const result = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );
    localStorage.setItem("skinType", result);
    window.location.href = "result.html";
    return;
  }

  const q = quizData[index];

  const questionEl = document.createElement("h4");
  questionEl.textContent = q.question;
  container.appendChild(questionEl);

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary m-2 w-100";
    btn.textContent = opt.text;
    btn.onclick = () => {
      scores[opt.value]++;
      showQuestion(index + 1);
    };
    container.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showQuestion(0);
});
