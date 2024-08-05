import connectDb from "@/utils/connectDb";
import Order from "@/models/order.model";
import Event from "@/models/event.model";
import decodeToken from "@/utils/decodeToken";

export default async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDb();

        // Extract token and decode to get userId
        const token = req.headers.authorization.split(' ')[1];
        const decoded = decodeToken(token);
        const userId = decoded.userId;

        const events = await Event.find({ createdBy: userId });
        const eventIds = events.map((event) => event._id)
        const orders = await Order.find({ event: { $in: eventIds } });

        // Initialize an object to count tickets sold per month
        const ticketsPerMonth = {};

        const currentYear = new Date().getFullYear();
        for (let month = 1; month <= 12; month++) {
            const yearMonth = `${currentYear}-${month}`;
            ticketsPerMonth[yearMonth] = 0;
        }

        // Populate ticketsPerMonth with actual data
        orders.forEach(order => {
            const month = new Date(order.purchaseDate).getMonth() + 1; // getMonth returns 0 for January, 1 for February, etc.
            const year = new Date(order.purchaseDate).getFullYear();

            // Combine year and month to avoid mixing data from different years
            const yearMonth = `${year}-${month}`;

            // Increment the count of tickets for the corresponding month
            if (ticketsPerMonth[yearMonth] !== undefined) {
                order.items.forEach(item => {
                    ticketsPerMonth[yearMonth] += item.quantity;
                });
            }
        });

        // Convert the object to an array for easier use in the frontend
        const data = Object.keys(ticketsPerMonth).map(key => ({
            yearMonth: key,
            tickets: ticketsPerMonth[key],
        }));

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};