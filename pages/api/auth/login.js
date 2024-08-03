import connectDb from "@/utils/connectDb";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await connectDb();

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).send("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found with that email");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).send("Passwords do not match");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user. Please try again later.");
  }
};