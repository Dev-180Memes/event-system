import connectDb from "@/utils/connectDb";
import User from "@/models/user.model";
import decodeToken from "@/utils/decodeToken";
import bcrypt from "bcryptjs";

export default async (req, res) => {
    await connectDb();
    
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    
    const { userId } = decodeToken(token);
    
    if (!userId) {
        return res.status(401).send("Unauthorized");
    }
    
    if (req.method !== "POST") {
        return res.status(405).send("Request method not allowed");
    }
    
    const { currentPassword, newPassword } = req.body;
    
    if (currentPassword === "" || newPassword === "") {
        return res.status(422).send("Missing one or more required fields.");
    }
    
    try {
        const user = await User.findById(userId);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
    
        if (!isMatch) {
        return res.status(403).send("Current password is incorrect.");
        }
    
        const hash = await bcrypt.hash(newPassword, 10);
    
        await User.findByIdAndUpdate(userId, { password: hash });
    
        res.status(200).send("Password updated successfully.");
    } catch {
        res.status(500).send("Error updating password.");
    }
};