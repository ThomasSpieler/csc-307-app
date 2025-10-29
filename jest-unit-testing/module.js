function sum(a, b) {
  return a + b;
}

function div(a, b) {
  let out;
  if (b == 0) {
    throw new Error("Division by zero.");
  } else {
    out = a / b;
  }

  if (isNaN(out)) {
    throw new Error("Result is not a number.");
  } else {
    return out;
  }
}

function containsNumbers(text) {
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if (code >= 48 && code <= 57) return true; // UTF-16 codes for 0-9 in decimal
  }
  return false;
}

export default { sum, div, containsNumbers };
