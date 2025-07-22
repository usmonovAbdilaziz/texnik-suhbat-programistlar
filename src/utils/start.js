// start.js
import { Composer, Markup } from "telegraf";
import User from "../db/database.js";
import { languageKeyboard } from "../pages/language.js";

const startComposer = new Composer();

startComposer.command("start", async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || "";
  const fullName = `${ctx.from.first_name || ""} ${
    ctx.from.last_name || ""
  }`.trim();

  try {
    const existingUser = await User.findOne({ userId });

    if (existingUser) {
      // ✅ Foydalanuvchi mavjud bo‘lsa: ro‘yxatdan o‘tmasdan til tanlash
      await ctx.reply("🔄 Siz allaqachon ro‘yxatdan o‘tgansiz.");
      return ctx.reply("Iltimos, tilni tanlang:", languageKeyboard());
    }

    // ❌ Foydalanuvchi yo‘q — yangi ro‘yxatdan o‘tkazamiz
    ctx.session.userInfo = { userId, username, fullName };

    const requestPhoneKeyboard = Markup.keyboard([
      Markup.button.contactRequest("📞 Telefon raqamni yuborish"),
    ])
      .oneTime()
      .resize();

    await ctx.reply(
      `Salom, ${fullName}! Iltimos, telefon raqamingizni yuboring.`,
      requestPhoneKeyboard
    );
  } catch (err) {
    console.error("❌ Xatolik:", err);
    await ctx.reply("Xatolik yuz berdi. Keyinroq urinib ko‘ring.");
  }
});

startComposer.on("contact", async (ctx) => {
  const phoneNumber = ctx.message.contact.phone_number;
  const userInfo = ctx.session.userInfo;

  if (!userInfo) {
    return ctx.reply("Iltimos, avval /start buyrug'ini bering.");
  }

  try {
    await User.create({
      userId: userInfo.userId,
      username: userInfo.username,
      fullName: userInfo.fullName,
      phoneNumber,
    });

    await ctx.reply("✅ Ma'lumotlaringiz saqlandi. Rahmat!");
    await ctx.reply("Iltimos, tilni tanlang:", languageKeyboard());
  } catch (err) {
    console.error("❌ Saqlashda xatolik:", err);
    return ctx.reply("❌ Xatolik yuz berdi. Keyinroq urinib ko‘ring.");
  }
});

export default startComposer;
