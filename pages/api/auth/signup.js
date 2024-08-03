import connectDb from "@/utils/connectDb";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await connectDb();

  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(422).send("Name, email, and password are required");
    }

    if (password.length < 8) {
      return res.status(422).send("Password must be at least 8 characters");
    }

    // Check that the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).send("Invalid email address");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send("User already exists with that email");
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await new User({
      name,
      email,
      password: hash
    })

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user. Please try again later.");
  }
};