// Helper functions from project
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randIndex];
      let newBase = returnRandBase();

      while (newBase === currentBase) {
        newBase = returnRandBase();
      }

      this.dna[randIndex] = newBase;
      return this.dna;
    },

    compareDNA(otherPAequor) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) identicalBases++;
      }
      const percentage = ((identicalBases / this.dna.length) * 100).toFixed(2);
      return `specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentage}% DNA in common.`;
    },

    willLikelySurvive() {
      const cAndGCount = this.dna.filter(base => base === 'C' || base === 'G').length;
      return (cAndGCount / this.dna.length) >= 0.6;
    },
  };
};

// Global array for organisms
let survivingSpecimens = [];

// DOM elements
const generateBtn = document.getElementById('generateBtn');
const organismList = document.getElementById('organismList');
const actionsSection = document.getElementById('actionsSection');

const mutateSelect = document.getElementById('mutateSelect');
const mutateBtn = document.getElementById('mutateBtn');

const compareSelect1 = document.getElementById('compareSelect1');
const compareSelect2 = document.getElementById('compareSelect2');
const compareBtn = document.getElementById('compareBtn');
const compareResult = document.getElementById('compareResult');

// Generate 30 surviving organisms
generateBtn.addEventListener('click', () => {
  survivingSpecimens = [];
  let specimenNum = 1;

  while (survivingSpecimens.length < 30) {
    const dna = mockUpStrand();
    const organism = pAequorFactory(specimenNum, dna);
    if (organism.willLikelySurvive()) {
      survivingSpecimens.push(organism);
    }
    specimenNum++;
  }

  renderOrganisms();
  populateSelects();
  actionsSection.style.display = 'block';
  compareResult.textContent = '';
});

// Render list of organisms on page
function renderOrganisms() {
  organismList.innerHTML = '';
  survivingSpecimens.forEach(org => {
    const li = document.createElement('li');
    li.textContent = `Specimen #${org.specimenNum}: [${org.dna.join('')}]`;
    organismList.appendChild(li);
  });
}

// Populate select dropdowns for mutate and compare actions
function populateSelects() {
  // Clear selects
  mutateSelect.innerHTML = '';
  compareSelect1.innerHTML = '';
  compareSelect2.innerHTML = '';

  survivingSpecimens.forEach(org => {
    const option1 = document.createElement('option');
    option1.value = org.specimenNum;
    option1.textContent = `Specimen #${org.specimenNum}`;
    mutateSelect.appendChild(option1);

    const option2a = option1.cloneNode(true);
    compareSelect1.appendChild(option2a);

    const option2b = option1.cloneNode(true);
    compareSelect2.appendChild(option2b);
  });
}

// Mutate selected organism
mutateBtn.addEventListener('click', () => {
  const specimenId = Number(mutateSelect.value);
  const organism = survivingSpecimens.find(org => org.specimenNum === specimenId);
  if (!organism) return;

  organism.mutate();
  renderOrganisms();
  compareResult.textContent = `Specimen #${specimenId} DNA mutated! New DNA: [${organism.dna.join('')}]`;
});

// Compare two organisms DNA
compareBtn.addEventListener('click', () => {
  const id1 = Number(compareSelect1.value);
  const id2 = Number(compareSelect2.value);
  if (id1 === id2) {
    compareResult.textContent = "Please select two different organisms to compare.";
    return;
  }
  const org1 = survivingSpecimens.find(org => org.specimenNum === id1);
  const org2 = survivingSpecimens.find(org => org.specimenNum === id2);
  if (!org1 || !org2) return;

  const message = org1.compareDNA(org2);
  compareResult.textContent = message;
});
