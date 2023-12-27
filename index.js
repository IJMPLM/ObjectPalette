const GenerativeAI = require('./generativeAI'); // Update the path

const generativeAI = new GenerativeAI();

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard:', text);
  } catch (err) {
    console.error('Unable to copy text: ', err);
  }
}

async function updateColorPalette(colors) {
  const objectInput = document.getElementById('objectInput').value;
  const prompt = `Object: ${objectInput}`;

  const response = await fetch('http://localhost:3000/generateColors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const result = await response.json();
  console.log(result.hexCodes);

  // Update the color palette with the received hex codes
  // ... (remaining code)
}

document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const objectInput = document.getElementById('objectInput').value;
  const prompt = `Object: ${objectInput}`;

  const colors = await generativeAI.generateColors(prompt);
  updateColorPalette(colors);
});