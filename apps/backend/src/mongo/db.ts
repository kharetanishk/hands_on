import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL as string;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log(`database connnected`);
  } catch (err) {
    console.log(`unable to connect the database , ${err}`);
  }
};

export default connectDB;
