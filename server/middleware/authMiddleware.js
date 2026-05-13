import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    // Check token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Save user data in request
    req.user = decoded;

    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err);

    return res.status(401).json({
      error: "Invalid token",
    });
  }
};

export default authMiddleware;