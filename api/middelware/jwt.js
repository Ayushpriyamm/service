import Jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).send("Token is missing or invalid");
  }

  Jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Token is invalid or expired");
    }
    req.user = user;
    next();
  });
};
