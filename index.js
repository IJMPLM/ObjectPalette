async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard:', text);
  } catch (err) {
    console.error('Unable to copy text: ', err);
  }
}
