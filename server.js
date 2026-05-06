const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

// 🔐 ENV से token लो (GitHub में नहीं रहेगा)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/send", async (req, res) => {
  const { name, location, device } = req.body;

  let msg = `🔥 New Visitor

Name: ${name}
Location: ${location}
Device: ${device}
Time: ${new Date().toLocaleString()}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg
    })
  });

  res.send({ status: "ok" });
});

app.listen(3000, () => console.log("Server running..."));