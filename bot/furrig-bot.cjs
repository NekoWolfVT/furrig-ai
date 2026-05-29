require("dotenv").config({ path: ".env.local" });

const tmi = require("tmi.js");

const client = new tmi.Client({
  options: { debug: true },

  connection: {
    reconnect: true,
    secure: true,
  },

  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
  },

  channels: [process.env.TWITCH_CHANNEL],
});

client.connect();

client.on("connected", () => {
  console.log("✅ Riggy connected!");
});

async function askRiggy(username, message) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/riggy/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          message,
        }),
      }
    );

    const data = await response.json();

    return data.reply;
  } catch (err) {
    console.error("Riggy AI Error:", err);

    return "Eep! My brain lagged 😭💜";
  }
}

async function sendToOverlay(message, mood = "talk") {
  try {
    await fetch("http://localhost:3000/api/riggy/event", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message,
        mood,
      }),
    });
  } catch (err) {
    console.error("Overlay Error:", err);
  }
}

const autoQuestions = [
  "Chat... are you still there? 🥺",
  "What snack should I eat next? 🍓",
  "Who wants tiny Riggy head pats? 💜",
  "Should I behave today or cause chaos? ✨",
];

setInterval(async () => {
  try {
    const question =
      autoQuestions[
        Math.floor(Math.random() * autoQuestions.length)
      ];

    await sendToOverlay(question, "talk");

    client.say(process.env.TWITCH_CHANNEL, question);
  } catch (err) {
    console.error(err);
  }
}, 1000 * 60 * 5);

client.on(
  "message",
  async (channel, tags, message, self) => {
    if (self) return;

    const username =
      tags["display-name"] || tags.username || "viewer";

    console.log(`${username}: ${message}`);

    const lower = message.toLowerCase();

    if (
      lower.includes("riggy") ||
      lower.startsWith("hi") ||
      lower.startsWith("hello")
    ) {
      const reply = await askRiggy(username, message);

      if (reply) {
        await sendToOverlay(reply, "talk");

        client.say(channel, reply);
      }
    }
  }
);