import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log(`database connection is sucessful`);
  } catch (err) {
    console.log(`error in establishing database ${err}`);
  }
};
