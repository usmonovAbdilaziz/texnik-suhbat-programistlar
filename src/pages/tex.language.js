import { Markup } from "telegraf";
import {
  questions as pyQuestions,
  firstQuestion as pyFirst,
} from "../questions/pythonQuiz.js";
import { questionsjs, firstQuestionJS } from "../questions/nodeQuiz.js";
import { firstQuestionJava, questionsJV } from "../questions/javaQuiz.js";
import { firstQuestionCpp, questionsSP } from "../questions/cPlusQuiz.js";
import { firstQuestionCSharp, questionsCSH } from "../questions/cshQuiz.js";
import { firstQuestionGo, questionsGO } from "../questions/goQuiz.js";
import { firstQuestionRuby, questionsRB } from "../questions/rubyQuiz.js";
import { firstQuestionPHP, questionsPP } from "../questions/phpQuiz.js";
import { firstQuestionSwift, questionsSW } from "../questions/swiftQuiz.js";
import { firstQuestionKotlin, questionsKT } from "../questions/kotlinQuiz.js";
import { shuffle } from "../utils/shuffle.js";
import { readData, writeData } from "../utils/fs.js";
// import { analyzeAndSend } from "../db/ia.connected.js";

const saveDate = "question.json";
export const handleITLanguages = (bot) => {
  const langs = [
    "Python",
    "JavaScript",
    "Java",
    "C++",
    "C#",
    "Go",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
  ];

  bot.hears("💻 Texnik suhbat tili", (ctx) => {
    ctx.reply(
      "Iltimos, texnik suhbat tilini tanlang:",
      Markup.keyboard(langs.map((l) => [l]))
        .resize()
        .oneTime()
    );
  });

  langs.forEach((lang) => {
    bot.hears(lang, async (ctx) => {
      ctx.session.currentLang = lang;
      ctx.session.questionIndex = 0;
      ctx.session.answers = [];

      let pool = [];
      if (lang === "Python") {
        const randGroup =
          pyQuestions[Math.floor(Math.random() * pyQuestions.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [pyFirst, ...pool];

        await ctx.reply("🧠 Texnik suhbatni boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else if (lang === "JavaScript") {
        const randGroup =
          questionsjs[Math.floor(Math.random() * questionsjs.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [firstQuestionJS, ...pool];

        await ctx.reply("🧠 JavaScript testini boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else if (lang === "Java") {
        const randGroup =
          questionsJV[Math.floor(Math.random() * questionsJV.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [firstQuestionJava, ...pool];

        await ctx.reply("🧠 Java testini boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else if (lang === "C++") {
        const randGroup =
          questionsSP[Math.floor(Math.random() * questionsSP.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [firstQuestionCpp, ...pool];

        await ctx.reply("🧠 C++ testini boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else if (lang === "C#") {
        const randGroup =
          questionsCSH[Math.floor(Math.random() * questionsCSH.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [firstQuestionCSharp, ...pool];

        await ctx.reply("🧠 C# testini boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else if (lang === "Go") {
        const randGroup =
          questionsGO[Math.floor(Math.random() * questionsGO.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [firstQuestionGo, ...pool];

        await ctx.reply("🧠 Go testini boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else if (lang === "Ruby") {
        const randGroup =
          questionsRB[Math.floor(Math.random() * questionsRB.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [firstQuestionRuby, ...pool];

        await ctx.reply("🧠 Ruby testini boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else if (lang === "PHP") {
        const randGroup =
          questionsPP[Math.floor(Math.random() * questionsPP.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [firstQuestionPHP, ...pool];

        await ctx.reply("🧠 PHP testini boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else if (lang === "Swift") {
        const randGroup =
          questionsSW[Math.floor(Math.random() * questionsSW.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [firstQuestionSwift, ...pool];

        await ctx.reply("🧠 Swift testini boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else if (lang === "Kotlin") {
        const randGroup =
          questionsKT[Math.floor(Math.random() * questionsKT.length)];
        const shuffled = shuffle([...randGroup]);
        pool = shuffled.slice(0, 7);
        ctx.session.randomQuestions = [firstQuestionKotlin, ...pool];

        await ctx.reply("🧠 Kotlin testini boshlaymiz...");
        await ctx.reply(`1) ${ctx.session.randomQuestions[0]}`);
      } else {
        return ctx.reply(`🧠 ${lang} uchun savollar hali tayyor emas.`);
      }
    });
  });

  bot.on("text", async (ctx) => {
    const idx = ctx.session.questionIndex;
    const arr = ctx.session.randomQuestions;
    const uname = ctx.from.username || "ID" + ctx.from.id.toString();
    if (idx == null || !arr) return;

    const answer = ctx.message.text;
    const questionText = arr[idx].question || arr[idx];

    const db = readData(saveDate) || {};

    if (!db[uname]) db[uname] = {};

    db[uname][questionText] = answer;

    writeData(saveDate, db);

    const next = idx + 1;
    if (next < arr.length) {
      ctx.session.questionIndex = next;
      await ctx.reply(`${next + 1}) ${arr[next].question || arr[next]}`);
    } else {
      await ctx.reply("🎉 Test tugadi. Javoblaringiz saqlandi. Rahmat!");
      ctx.session.questionIndex = null;
      ctx.session.randomQuestions = null;
      // await analyzeAndSend(ctx);
    }
  });
};
