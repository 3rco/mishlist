import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    const err = "Authentication failed!";

    return next(err);
  }

  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET || "Super Secret Key"
  );
  req.userData = { userId: decodedToken.userId };

  next();
};
