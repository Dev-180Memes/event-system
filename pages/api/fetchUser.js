import connectDb from "@/utils/connectDb";
import User from "@/models/user.model";
import decodeToken from "@/utils/decodeToken";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await connectDb();

        const token = req.headers.authorization.split(' ')[1];
        const decoded = decodeToken(token);
        const userId = decoded.userId;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}