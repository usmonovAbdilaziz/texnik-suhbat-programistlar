import { connect } from "mongoose";
import config from "../config/index.js";

const connectDB = async () => {
  try {
    await connect(config.MONGO_URI);
    console.log("Databazaga muvaffaqiyatli ulandik!");
  } catch (error) {
    console.log("Bazaga ulanishda xatolik:", error);
  }
};

export default connectDB;
