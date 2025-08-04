const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// POST /api/mail/send
router.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body; // Destructure the incoming data

  // Construct the email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to your own email or the specified recipient
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Include name and email in the message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

module.exports = router;
