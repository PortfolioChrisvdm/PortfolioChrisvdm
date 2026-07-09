const futures = [
  "you will find unexpected wealth",
  "a thrilling adventure awaits you",
  "you will meet someone who changes your life",
  "your hard work will finally pay off",
  "a big opportunity is on the horizon",
  "you will discover a hidden talent",
  "your kindness will return tenfold",
  "you will travel to a faraway place",
  "a surprise gift will brighten your day",
  "you will overcome a challenging obstacle"
];

const timeFrames = [
  "within the next week",
  "in the coming month",
  "before the year ends",
  "soon",
  "in the near future",
  "by the next full moon",
  "this summer",
  "before your next birthday",
  "in the next few days",
  "within six months"
];

const outcomes = [
  "and it will change everything.",
  "leading to new beginnings.",
  "bringing joy and excitement.",
  "that you never expected.",
  "and your life will be better for it.",
  "opening new doors.",
  "making you stronger than before.",
  "that will surprise everyone.",
  "and you will cherish it forever.",
  "changing your perspective completely."
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePrediction() {
  const future = getRandomElement(futures);
  const time = getRandomElement(timeFrames);
  const outcome = getRandomElement(outcomes);

  return `In ${time}, ${future} ${outcome}`;
}

const predictionElem = document.getElementById("prediction");
const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", () => {
  const newPrediction = generatePrediction();
  predictionElem.textContent = newPrediction;
});
