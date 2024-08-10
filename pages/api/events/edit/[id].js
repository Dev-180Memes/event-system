import connectDb from "@/utils/connectDb";
import Event from "@/models/event.model";

export default async (req, res) => {
    if(req.method === "PUT") {
        await connectDb();
    
        const { id } = req.query;
    
        if (!id) {
            return res.status(400).send("Missing event ID.");
        }
    
        const { name, description, imageurl, category, location, timezone, frequency, startdate, enddate, starttime, endtime, website, twitter, instagram, facebook, tickets, purchaseLimit } = req.body;
    
        try {
            const event = await Event.findById(id);
    
            if (!event) {
                return res.status(404).send("Event not found.");
            }

            const updatedEvent = await Event.findByIdAndUpdate(id, { name, description, imageurl, category, location, timezone, frequency, startdate, enddate, starttime, endtime, website, twitter, instagram, facebook, tickets, purchaseLimit }, { new: true });

            res.status(200).send(updatedEvent);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error updating event.");
        }
    }
};