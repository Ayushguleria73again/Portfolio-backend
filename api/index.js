require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8888;
const mailRoute = require("../Routes/mail");

// ✅ Middleware
app.use(cors({
  origin: ['https://portfolio-frontend-gilt-omega.vercel.app'],
}));
app.use(express.json());

// ✅ Routes
app.use("/api/mail", mailRoute);

app.get("/", (req, res) => {
  res.send("📧 Mailer API is running.");
});

// ✅ Server start
app.listen(PORT, (err) => {
  if (err) {
    console.error("❌ Server failed to start:", err);
  } else {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  }
});
