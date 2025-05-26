// Your previously defined functions here:
// validateCred, stringToArray, fixInvalidCard, etc.

// Example implementations:

function validateCred(cardArray) {
  const cardCopy = [...cardArray];
  let sum = 0;
  for (let i = cardCopy.length - 1; i >= 0; i--) {
    let digit = cardCopy[i];
    if ((cardCopy.length - 1 - i) % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

function stringToArray(cardString) {
  return cardString.replace(/\D/g, '').split('').map(Number);
}

function fixInvalidCard(cardArray) {
  let fixedCard = [...cardArray];
  for (let checkDigit = 0; checkDigit <= 9; checkDigit++) {
    fixedCard[fixedCard.length - 1] = checkDigit;
    if (validateCred(fixedCard)) {
      return fixedCard;
    }
  }
  return null;
}

document.getElementById('check-button').addEventListener('click', () => {
  const input = document.getElementById('card-input').value.trim();
  const lines = input.split('\n').filter(line => line.trim() !== '');
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  lines.forEach((line, index) => {
    const cardArr = stringToArray(line);
    if (cardArr.length === 0) {
      resultsDiv.innerHTML += `<p>Line ${index + 1}: Invalid input (no digits found).</p>`;
      return;
    }
    const isValid = validateCred(cardArr);
    if (isValid) {
      resultsDiv.innerHTML += `<p>Line ${index + 1}: ✅ Valid card number.</p>`;
    } else {
      const fixed = fixInvalidCard(cardArr);
      if (fixed) {
        resultsDiv.innerHTML += `<p>Line ${index + 1}: ❌ Invalid card number. Possible fix: ${fixed.join('')}</p>`;
      } else {
        resultsDiv.innerHTML += `<p>Line ${index + 1}: ❌ Invalid card number and could not be fixed.</p>`;
      }
    }
  });
});
