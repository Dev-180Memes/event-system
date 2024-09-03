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

    if (req.method !== "GET") {
        return res.status(405).send("Request method not allowed")
    }

    try {
        const user = await User.findById(userId).select("-password");

        res.status(200).send(user);
    } catch {
        res.status(500).send("Error fetching user.")
    }
}