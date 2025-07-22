// analyzeUser.js
import { OpenAI } from "openai";
import dotenv from "dotenv";
import { readData } from "../utils/fs.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeAndSend = async (ctx) => {
  const uname = ctx.from.username || ctx.from.id.toString();
  const db = readData("question.json");

  const answers = db[uname];

  if (!answers) {
    return ctx.reply("❗ Sizga oid test ma'lumotlari topilmadi.");
  }

  const prompt = `
    Foydalanuvchi Python bo‘yicha texnik suhbatda quyidagi savollarga javob berdi.
    Har bir savol bo‘yicha:
    - 0–10 balli tizimda baholang
    - Nima uchun bu ball qo‘yildi
    - Yaxshi javob qanday bo‘lishi mumkin edi

    Yakunda:
    - O‘rtacha ballni hisoblang
    - Foydalanuvchining texnik suhbatga tayyorgarlik darajasini aniqlang (tayyor / qisman tayyor / tayyor emas)

    Savollar va javoblar:

${Object.entries(answers)
  .map(([q, a]) => `Savol: ${q}\nJavob: ${a}`)
  .join("\n\n")}
`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o", // yoki 'gpt-3.5-turbo'
      messages: [
        {
          role: "system",
          content: "Siz texnik intervyu baholovchi sifatida ishlaysiz.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const analysis = res.choices[0].message.content;
    await ctx.reply("📊 Sizning test javoblaringiz tahlili:");
    await ctx.reply(analysis.slice(0, 4096)); // Telegram message limiti (4096 char)
  } catch (err) {
    console.error("OpenAI xatosi:", err);
    await ctx.reply("⚠️ Tahlil qilishda xatolik yuz berdi.");
  }
};
