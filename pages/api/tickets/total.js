import connectDb from "@/utils/connectDb";
import Order from "@/models/order.model";
import Event from "@/models/event.model";
import decodeToken from "@/utils/decodeToken";

export default async (req, res) => {
  await connectDb();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = decodeToken(token);
        const userId = decoded.userId;

        const events = await Event.find({ createdBy: userId });
        const eventIds = events.map((event) => event._id);
        const orders = await Order.find({ event: { $in: eventIds } });

        // console.log(orders);

        // Calculate the total number of tickets sold ever
        let totalTicketsSold = 0;

        orders.forEach((order) => {
          let numOfTicketsInOrder = 0
          order.items.forEach((item) => {
            numOfTicketsInOrder += item.quantity;
          });
          totalTicketsSold += numOfTicketsInOrder;
        });

        // Get the current month and previous month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const currentYear = currentDate.getFullYear();
        const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        // Calculate the number of tickets sold this month and last month
        let thisMonthTicketsSold = 0;
        let lastMonthTicketsSold = 0;

        orders.forEach((order) => {
          const orderDate = new Date(order.purchaseDate);
          const orderMonth = orderDate.getMonth();
          const orderYear = orderDate.getFullYear();

          if (orderMonth === currentMonth && orderYear === currentYear) {
            thisMonthTicketsSold += order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
          } else if (orderMonth === previousMonth && orderYear === previousMonthYear) {
            lastMonthTicketsSold += order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
          }
        });

        // Calculate the percentage increase from the last month
        const percentIncrease =
          lastMonthTicketsSold === 0
            ? thisMonthTicketsSold > 0
              ? 100
              : 0
            : ((thisMonthTicketsSold - lastMonthTicketsSold) / lastMonthTicketsSold) * 100;

        // Return the results
        res.status(200).json({
          totalTicketsSold,
          thisMonthTicketsSold,
          percentIncrease: percentIncrease.toFixed(2),
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
};
