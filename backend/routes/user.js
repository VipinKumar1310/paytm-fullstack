const express = require("express");
const router = express.Router();

const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config");

const signupBody = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({ userName: req.body.userName });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / inxorrect inputs",
    });
  }

  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_TOKEN
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_TOKEN
    );
  }

  res.status(411).json({
    message: "Error while logging",
  });
});

module.exports = router;
