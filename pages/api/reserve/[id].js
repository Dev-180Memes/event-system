import connectDb from "@/utils/connectDb";
import Event from "@/models/event.model";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await connectDb();
    const { id } = req.query;

    const event = await Event.findOne({ eventCode: id }).populate("createdBy");

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(event);
  }
}