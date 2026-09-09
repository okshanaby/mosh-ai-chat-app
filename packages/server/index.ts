import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World: " + process.env.OPENAI_API_KEY);
});

app.get("/api/v1/chat", (req, res) => {
    res.json({ message: "Hello World" });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
