app.post("/send", async (req, res) => {

  // 🔥 1. Request आया या नहीं
  console.log("🔥 Request received:", req.body);

  const { name, location, device } = req.body;

  let msg = `🔥 New Visitor

Name: ${name}
Location: ${location}
Device: ${device}
Time: ${new Date().toLocaleString()}`;

  console.log("📩 Sending to Telegram...");

  try {

    let response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: msg
      })
    });

    let data = await response.json();

    // 🔥 2. Telegram response
    console.log("✅ Telegram Response:", data);

  } catch (err) {

    // ❌ error
    console.log("❌ Error:", err);
  }

  res.send({ status: "ok" });
});