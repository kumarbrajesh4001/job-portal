function addPadding(number, digit = 2) {
  const padded = number.toString().padStart(digit, '0');
  return padded;
}

export default addPadding;
