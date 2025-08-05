const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// ✅ Nodemailer Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // ✅ from .env
    pass: process.env.EMAIL_PASS, // ✅ Gmail App Password
  },
});

// ✅ POST /api/mail/send
router.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // fallback
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Message</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; color: #333;">
          <h2 style="color: #4CAF50; font-size: 24px; margin-bottom: 20px;">📬 New Contact Message</h2>
          
          <p style="font-size: 16px; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 16px; margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #4CAF50;">${email}</a></p>
          <p style="font-size: 16px; margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          
          <p style="font-size: 16px; margin-top: 20px;"><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 5px solid #4CAF50; font-size: 16px; line-height: 1.5;">
            ${message.replace(/\n/g, "<br>")}
          </div>
  
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          
          <p style="font-size: 12px; color: #777;">This message was sent via the contact form on your portfolio website.</p>
        </div>
      </body>
      </html>
    `,
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
