const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access Denied. No Token Provided" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user info (e.g., ID) to request
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

module.exports = verifyToken;
