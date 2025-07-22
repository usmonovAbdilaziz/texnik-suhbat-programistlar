import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import config from "./config/index.js";
import startComposer from "./utils/start.js";
import connectDB from "./db/server.js";
import { languageKeyboard, handleLanguage } from "./pages/language.js";
import { handleITLanguages } from "./pages/tex.language.js";

const bot = new Telegraf(config.BOT_TOKEN);

const localSession = new LocalSession({
  database: "session_db.json",
});
bot.use(localSession.middleware());
await connectDB();
bot.use(startComposer);
languageKeyboard(bot);
handleLanguage(bot);
handleITLanguages(bot);
bot.launch();
console.log("🚀 Bot ishga tushdi!");
