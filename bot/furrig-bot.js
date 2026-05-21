require("dotenv").config();

const tmi = require("tmi.js");

const OpenAI = require("openai");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const welcomedUsers = new Set();

async function sendRiggyEvent(type, message) {
  await fetch("http://localhost:3000/api/riggy-event", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      type,
      message,
    }),
  });
}

const client = new tmi.Client({
  options: {
    debug: true,
  },

  connection: {
    reconnect: true,
    secure: true,
  },

  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
  },

  channels: [`#${process.env.TWITCH_CHANNEL}`],
});

console.log("🐾 Starting FurRigBot...");

client.connect();

client.on("connected", (address, port) => {
  console.log("✅ FurRigBot connected!");
  console.log(`🌐 ${address}:${port}`);
});

client.on("join", (channel, username, self) => {
  if (self) {
    console.log(`✅ Joined channel: ${channel}`);
  }
});

client.on("message", async (channel, tags, message, self) => {
  if (self) return;

  const username =
    tags["display-name"] || tags.username;

  const msg = message.trim();

  console.log(`${username}: ${msg}`);

  // =========================
  // First time welcome
  // =========================

  if (!welcomedUsers.has(username)) {
    welcomedUsers.add(username);

    await sendRiggyEvent(
      "happy",
      `H-Hello ${username}!! 💖`
    );
  }

  // =========================
  // Commands
  // =========================

  if (msg.toLowerCase() === "!riggy") {
    client.say(
      channel,
      `Hi ${username}! I'm Riggy 💜 Created by NekoWolfVT at FurRig AI!`
    );
  }

  if (
    msg.toLowerCase() === "!feed" ||
    msg.toLowerCase() === "!food"
  ) {
    await sendRiggyEvent(
      "happy",
      "SNACKIES!! 🍓"
    );

    client.say(
      channel,
      `YIPPEE!! ${username} gave Riggy snackies! 🍓`
    );
  }

  if (msg.toLowerCase() === "!water") {
    await sendRiggyEvent(
      "happy",
      "GLUG GLUG!! 💧"
    );

    client.say(
      channel,
      `Riggy drinks some water happily 💧`
    );
  }

  if (msg.toLowerCase() === "!pet") {
    await sendRiggyEvent(
      "happy",
      "HEADPATS!! 💖"
    );

    client.say(
      channel,
      `${username} gives Riggy head pats! 💖`
    );
  }

  if (msg.toLowerCase() === "!lurk") {
    await sendRiggyEvent(
      "sleep",
      "Riggy is eepy... 💤"
    );

    client.say(
      channel,
      `Riggy will quietly protect ${username} while they lurk 💤`
    );
  }

  if (msg.toLowerCase() === "!commands") {
    client.say(
      channel,
      `Riggy commands: !riggy !feed !food !water !pet !lurk`
    );
  }

  // =========================
  // AI CHAT
  // =========================

  if (
    msg.toLowerCase().startsWith("riggy ")
  ) {
    const prompt = msg.slice(6);

    try {
      const response =
        await openai.chat.completions.create({
          model: "gpt-4.1-mini",

          messages: [
            {
              role: "system",
              content:
                "You are Riggy, a cute emotional stream mascot created by NekoWolfVT from FurRig AI. You are adorable, shy, funny, emotional, playful, and speak like a living stream pet. Keep responses short for Twitch chat.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],

          max_tokens: 80,
        });

      const aiReply =
        response.choices[0].message.content;

      await sendRiggyEvent(
        "talk",
        aiReply
      );

      client.say(channel, aiReply);
    } catch (err) {
      console.error(err);

      client.say(
        channel,
        "Riggy got confused and rolled down the stairs 😭"
      );
    }
  }
});

client.on("disconnected", (reason) => {
  console.log("❌ Disconnected:", reason);
});

client.on("reconnect", () => {
  console.log("🔄 Reconnecting...");
});