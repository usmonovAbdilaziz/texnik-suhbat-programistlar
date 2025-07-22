import { saveAnswer } from "../pages/saveAnswers.js";

export function pythonController(bot) {
  bot.on("text", async (ctx) => {
    if (!ctx.session || ctx.session.currentLang !== "python") return;

    const idx = ctx.session.questionIndex;
    const questionsArr = ctx.session.randomQuestions;
    const userId = String(ctx.from.id);
    const groupName = ctx.session.currentGroupName || "defaultGroup";

    ctx.session.answers.push({
      question: questionsArr[idx],
      answer: ctx.message.text,
    });

    await saveAnswer(userId, groupName, questionsArr[idx], ctx.message.text);

    ctx.session.questionIndex++;

    if (ctx.session.questionIndex < questionsArr.length) {
      await ctx.reply(
        `${ctx.session.questionIndex + 1}) ${
          questionsArr[ctx.session.questionIndex]
        }`
      );
    } else {
      await ctx.reply("✅ Suhbat yakunlandi! Javoblaringiz uchun rahmat.");
      ctx.session = null;
    }
  });
}
