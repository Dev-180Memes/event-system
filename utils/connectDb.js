import mongoose from "mongoose";

// Connect to the db and return a success message after
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

export default connectDb;