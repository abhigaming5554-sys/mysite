const express = require("express");
const fetch = require("node-fetch");

const app = express(); // ✅ YE MISSING THA

app.use(express.json());

// ENV variables (Render से आएंगे)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// TEST ROUTE (optional)
app.get("/", (req, res) => {
  res.send("Server Running 😎");
});

// MAIN ROUTE
app.post("/send", async (req, res) => {

  console.log("🔥 Request received:", req.body);

  const { name, location, device } = req.body;

  let msg = `🔥 New Visitor

Name: ${name}
Location: ${location}
Device: ${device}
Time: ${new Date().toLocaleString()}`;

  try {

    console.log("📩 Sending to Telegram...");

    let response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: msg
      })
    });

    let data = await response.json();

    console.log("✅ Telegram Response:", data);

  } catch (err) {
    console.log("❌ Error:", err);
  }

  res.send({ status: "ok" });
});

// PORT (Render ke liye important)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
