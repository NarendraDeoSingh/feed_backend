import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

// import "dotenv";
const API_KEY = "AIzaSyDHnWd59yGfkkjICvPxMVfwkf3yelEsbFc";
const genAI = new GoogleGenerativeAI(API_KEY);
const app = express();
app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Failed to generate content");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running on port ", port);
});
