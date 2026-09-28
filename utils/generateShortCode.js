function generateShortCode() {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  let shortCode = "";

  while (shortCode.length < 5) {
    const randomNumber = Math.floor(Math.random() * characters.length);
    const character = characters[randomNumber];

    shortCode += character;
  }

  return shortCode;
}

module.exports = generateShortCode;
