const jwt = require("jsonwebtoken");

function optionalAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) return next();

  if (!header.startsWith("Bearer "))
    return res.status(401).json({ message: "Authentication required" });

  verifyToken(header, req, next);
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "Authentication required" });

  verifyToken(header, req, next);
}

function verifyToken(header, req, next) {
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication required" });
  }
}

module.exports = { optionalAuth, requireAuth };
