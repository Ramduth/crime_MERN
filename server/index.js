require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./dbConnection");
const route = require("./routes");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 4042;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'upload')));
app.use(cors());

// Routes
app.use('/crime_reporting_api', route);

// AI-enhanced chat endpoint
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  console.log("🤖 Received message:", userMessage);

  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("Gemini API key is missing");

    const modelNames = [
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-1.0-pro",
      "gemini-pro"
    ];

    let model;
    for (const name of modelNames) {
      try {
        model = genAI.getGenerativeModel({ model: name });
        await model.generateContent("Hello");
        console.log(`✅ Using model: ${name}`);
        break;
      } catch (err) {
        console.log(`❌ Model ${name} failed:`, err.message);
      }
    }

    if (!model) throw new Error("No valid Gemini model found");

    const prompt = `You are an intelligent AI assistant for a crime reporting system. You should be helpful, professional, and knowledgeable about crime reporting procedures.

Context: This is a digital crime reporting platform where citizens can report crimes and get assistance.

User message: "${userMessage}"

Instructions:
- Be conversational and friendly like ChatGPT
- If asked about crime reporting, provide helpful step-by-step guidance
- If asked general questions, answer naturally and helpfully
- Keep responses under 300 words but be thorough
- Use a professional but approachable tone
- If asked about emergencies, remind them to call 911 for immediate help
- For legal advice, suggest consulting with legal professionals

Respond naturally and helpfully:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const botReply = response.text();

    res.json({ reply: botReply });

  } catch (error) {
    console.error("❌ AI Error:", error.message);

    const userMessageLower = userMessage.toLowerCase();
    const fallbackReplies = {
      hi: "Hello! 👋 I'm your AI assistant for the crime reporting system. How can I assist you today?",
      hello: "Welcome to the crime reporting system. How can I help you today?",
      help: "I'm here to help! You can ask me about crime reporting procedures, emergencies, or system guidance.",
      report: "To report a crime, use our online form with details like date, location, and any evidence.",
      emergency: "🚨 If you're in an emergency, please call 911 immediately. This system is for non-emergency reports.",
      thank: "You're welcome! I'm always here to help with crime reporting or related questions.",
      bye: "Goodbye! Stay safe and feel free to return with more questions anytime.",
      default: `I understand you said: "${userMessage}". I'm here to help with crime reporting or related questions.`
    };

    let reply = fallbackReplies.default;
    for (const [keyword, response] of Object.entries(fallbackReplies)) {
      if (userMessageLower.includes(keyword)) {
        reply = response;
        break;
      }
    }

    setTimeout(() => res.json({ reply }), 800); // Simulated AI thinking time
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    aiEnabled: !!process.env.GEMINI_API_KEY
  });
});

// AI Status
app.get("/ai-status", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    await model.generateContent("test");
    res.json({ status: "AI working perfectly!" });
  } catch (error) {
    res.json({ status: "AI error", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🤖 AI Status: ${process.env.GEMINI_API_KEY ? 'Enabled' : 'Disabled'}`);
});
