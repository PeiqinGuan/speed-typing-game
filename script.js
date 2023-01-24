const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const text = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timer = document.getElementById("timer");

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((res) => res.json())
    .then((data) => data.content);
}

async function renderNextQuote() {
  const quote = await getRandomQuote();
  text.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    text.appendChild(characterSpan);
  });
  textInput.value = null;
  startTimer();
}

textInput.addEventListener("input", () => {
  const arrayQuote = text.querySelectorAll("span");
  const arrayValue = textInput.value.split("");
  let correct = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    }
  });
  if (correct) renderNextQuote();
});

let startTime;
function startTimer() {
  timer.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    getTimerTime();
  }, 1000);
}

function getTimerTime() {
  const currentTime = new Date();
  timer.innerText = Math.floor((currentTime - startTime) / 1000);
}

renderNextQuote();
