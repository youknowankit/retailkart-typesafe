import { env } from "#config/env.js";
import logger from "#shared/utils/logger.js";
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`${env.MONGO_URI}/retailkartts`);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error({ err: error }, "MongoDB connection failed");
    throw error;
  }
};

export default connectDB;
