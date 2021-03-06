import express from "express";
import validator from "express-validator";

import {
  getUserByUserName,
  createUser,
  loginUser,
} from "../controllers/users-controllers.js";
import checkAuth from "../middleware/check-auth.js";

const { body } = validator;

const router = express.Router();

router.get("/:username", getUserByUserName);
router.post(
  "/signup",
  body("userName").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  createUser
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  loginUser
);

router.use(checkAuth);

export default router;
