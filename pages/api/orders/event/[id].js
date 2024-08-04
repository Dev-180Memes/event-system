import connectDb from "@/utils/connectDb";
import Order from "@/models/order.model";

export default async (req, res) => {
    const { id } = req.query;
    
    if (req.method === "GET") {
        await connectDb();

        // Find all orders with the event id
        try {
            const orders = await Order.find({ event: id }).sort({ createdAt: -1 });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: "Error fetching orders" });
        }

    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};