import connectDb from "@/utils/connectDb";
import Event from "@/models/event.model";

export default async (req, res) => {
  if (req.method === "GET") {
    await connectDb();
    
    const { id } = req.query;

    if (!id) {
      return res.status(400).send("Missing event ID.");
    }
    
    try {
      const event = await Event.findById(id).populate("createdBy", "name");

      if (!event) {
        return res.status(404).send("Event not found.");
      }

      res.status(200).send(event);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error getting event.");
    }
  } else if (req.method === "PUT") {
    await connectDb();

    const { id } = req.query;

    if (!id) {
      return res.status(400).send("Missing event ID.");
    }

    try {
      const event = await Event.findById(id);

      if (!event) {
        return res.status(404).send("Event not found.");
      }

      // Generate unique random event string for eventCode
      let eventCode = "";

      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        eventCode += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      const updatedEvent = await Event.findByIdAndUpdate(id, { eventCode }, { new: true });

      res.status(200).send(updatedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating event.");
    }
  } else {
    res.status(405).send(`Method ${req.method} not allowed.`);
  }
}