function isValidUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return true;
  } catch (error) {
    return false;
  }
}

module.exports = isValidUrl;
