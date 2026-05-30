import tmi from "tmi.js";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: [process.env.TWITCH_CHANNEL || ""],
});

client.connect();

client.on("connected", () => {
  console.log("🐰 Riggy is alive in Twitch chat!");
});

client.on("message", async (channel, tags, message, self) => {
  if (self) return;

  const username = tags.username || "viewer";
  const text = message.trim();

  // Riggy replies naturally when mentioned or when chat is quiet
  const shouldReply =
    text.toLowerCase().includes("riggy") ||
    text.toLowerCase().includes("furrig") ||
    text.toLowerCase().includes("hello") ||
    Math.random() < 0.08;

  if (!shouldReply) return;

  try {
    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Riggy, the cute chaotic AI stream companion for FurRig AI. You are friendly, funny, helpful, energetic, and speak like a streamer pet. Keep Twitch replies short, natural, and under 350 characters. Do not say you are ChatGPT. Do not use commands.",
        },
        {
          role: "user",
          content: `${username} said in Twitch chat: ${text}`,
        },
      ],
    });

    const reply =
      ai.choices[0]?.message?.content ||
      "🐰 Riggy is thinking very hard right now... 💜";

    await client.say(channel, reply);
  } catch (error) {
    console.error("Riggy AI error:", error);
  }
});