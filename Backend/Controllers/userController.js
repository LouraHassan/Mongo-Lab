import User from "../Models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signupUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already in use" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res
    .status(201)
    .json({
      message: "User registered successfully",
      user: newUser,
      token: token,
    });
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
