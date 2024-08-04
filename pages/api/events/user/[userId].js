import connectDb from '@/utils/connectDb';
import Event from '@/models/event.model';
import withAuth from '@/middlewares/withAuth';

export default async (req, res) => {
  const { userId } = req.query;

  if (req.method === 'GET') {
    await connectDb();

    try {
      const events = await Event.find({ createdBy: userId }).sort({ startdate: -1 });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
