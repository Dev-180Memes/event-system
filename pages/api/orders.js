import connectDb from '@/utils/connectDb';
import Event from '@/models/event.model';
import Order from '@/models/order.model';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDb();

    const { name, email, phone, tickets, eventId, subtotal } = req.body;

    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const orderItems = Object.entries(tickets).map(([ticketName, count]) => {
        const ticket = event.tickets.find(ticket => ticket.name === ticketName);
        return {
          name: ticketName,
          type: ticket.type,
          price: ticket.price,
          quantity: count,
          totalPrice: count * ticket.price
        };
      });

      const newOrder = await Order.create({
        buyerName: name,
        buyerEmail: email,
        buyerPhone: phone,
        items: orderItems,
        total: subtotal,
        event: eventId,
        status: 'Paid',
        purchaseDate: new Date()
      });

      // Reduce the ticket quantities in the event
      for (let [ticketName, count] of Object.entries(tickets)) {
        const ticketIndex = event.tickets.findIndex(ticket => ticket.name === ticketName);
        if (ticketIndex !== -1) {
          event.tickets[ticketIndex].quantity -= count;
        }
      }
      await event.save();

      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Order Confirmation',
        text: `Dear ${name},\n\nThank you for your order!\n\nHere are the details:\n\n${orderItems.map(item => `${item.quantity} x ${item.name} (${item.type}) - ₦${item.totalPrice}`).join('\n')}\n\nTotal: ₦${subtotal}\n\nBest regards,\nEvent Team`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Order created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create order' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
