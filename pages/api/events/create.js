import connectDb from "@/utils/connectDb";
import Event from "@/models/event.model";
import decodeToken from "@/utils/decodeToken";

export default async (req, res) => {
  if (req.method === "POST") {
    await connectDb();

    // token is sent in the headers as a Bearer token
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("You must be logged in to create an event.");
    }
    
    const { userId } = decodeToken(token);
  
    if (!userId) {
      return res.status(401).send("You must be logged in to create an event.");
    }
  
    const { name, description, imageurl, category, location, timezone, frequency, startdate, enddate, starttime, endtime, website, twitter, instagram, facebook, tickets, purchaseLimit } = req.body;
  
    if (name === "" || description === "" || imageurl === "" || category === "" || location === "" || timezone === "" || frequency === "" || startdate === "" || enddate === "" || starttime === "" || endtime === "" || tickets.length === 0 || purchaseLimit === "") {
      return res.status(422).send("Missing one or more required fields.");
    }
  
    try {
      const newEvent = new Event({
        name,
        description,
        imageurl,
        category,
        location,
        timezone,
        frequency,
        startdate,
        enddate,
        starttime,
        endtime,
        website,
        twitter,
        instagram,
        facebook,
        tickets,
        purchaseLimit,
        createdBy: userId
      });
  
      await newEvent.save();
  
      res.status(201).send(newEvent);
    } catch (error) {
      res.status(500).send("Error creating event.");
    }
  } else {
    res.status(405).send("Request method not allowed.");
  }

}