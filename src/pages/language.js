// pages/language.js
import { Markup } from "telegraf";

export const languageKeyboard = () =>
  Markup.keyboard([["🇺🇿 O'zbekcha", "🇷🇺 Русский"], ["🇬🇧 English"]])
    .resize()
    .oneTime();

export const showItLangButton = Markup.keyboard([["💻 Texnik suhbat tili"]])
  .resize()
  .oneTime();

export const handleLanguage = async (bot) => {
  bot.hears("🇺🇿 O'zbekcha", (ctx) => {
    ctx.reply("✅ Siz O'zbek tilini tanladingiz", showItLangButton);
  });
  bot.hears("🇷🇺 Русский", (ctx) => {
    ctx.reply("✅ Вы выбрали русский язык", showItLangButton);
  });
  bot.hears("🇬🇧 English", (ctx) => {
    ctx.reply("✅ You selected English", showItLangButton);
  });
};
