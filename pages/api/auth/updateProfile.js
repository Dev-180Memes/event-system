import connectDb from "@/utils/connectDb";
import User from "@/models/user.model";
import decodeToken from "@/utils/decodeToken";

export default async (req, res) => {
  await connectDb();

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Unauthorized")
  }

  const { userId } = decodeToken(token)

  if (!userId) {
    return res.status(401).send("Unauthorized")
  }

  if (req.method !== "POST") {
    return res.status(405).send("Request method not allowed")
  }

  const { name, email } = req.body;

  if (name === "" || email === "") {
    return res.status(422).send("Missing one or more required fields.")
  }

  // Check if email is already in use
  const user = await User.findOne({ email })
  if (user && user._id.toString() !== userId) {
    return res.status(422).send("Email is already in use.")
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

    res.status(200).send(updatedUser);
  } catch {
    res.status(500).send("Error updating profile.")
  }
};