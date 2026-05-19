import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL as string;

const connectDB = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log(`mongoose database connection established`))
    .catch((error) =>
      console.log(`${error} mongoose database connection failed`),
    );
};
export default connectDB;
