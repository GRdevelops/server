const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:4173', 'http://localhost:4174', 'https://open-ai-workout-generator.vercel.app'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 8000;

app.post("/generate-workout", async (req, res) => {
  console.log("Received data:", req.body);

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "user", content: req.body.message }],
      temperature: 0.8,
      max_tokens: 500,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));

