import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  // Check for Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Save user ID in request
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, invalid token",
      });
    }
  } else {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

export default protect;