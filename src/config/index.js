import { config } from "dotenv";
config();
export default {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  BOT_TOKEN: process.env.BOT_TOKEN,
};
