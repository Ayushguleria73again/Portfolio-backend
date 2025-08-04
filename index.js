require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; 
const mailRoute = require("./Routes/mail");

// Middleware
app.use(cors(
    {origin : ['http://localhost:5173/']}
)); 
app.use(express.json()); 

app.use("/api/mail", mailRoute);




// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server failed to start:", err);
  } else {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  }
});
