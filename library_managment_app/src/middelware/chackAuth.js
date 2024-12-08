const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({ message: "Authorization header is missing" });
  }

  // Check if the header starts with 'Bearer'
  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(400)
      .json({
        message:
          "Malformed authorization header. Expected format: 'Bearer <token>'",
      });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token is invalid" });
    }
    req.user = decoded; // Assign decoded payload to `req.user`
    next();
  });
};

module.exports = checkAuth;
