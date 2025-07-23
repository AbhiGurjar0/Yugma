import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Corrected import
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { error } from "console";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.render("App"); // make sure views/App.ejs exists
});

app.get("/dash", (req, res) => {
    res.render("Dash"); // make sure views/Dash.ejs exists
});

// Translate API
app.post("/trans", async (req, res) => {
    async function translateText(text = "No recent rain. Weather is clear.", srcLang = "eng_Latn", tgtLang = "hin_Deva") {
        try {
            const response = await axios.post("http://localhost:8000/translate", {
                sentences: [text],
                src_lang: srcLang,
                tgt_lang: tgtLang,
            });

            const translated = response.data.translations[0];
            console.log("Translated:", translated);
            res.json({ translated });
        } catch (error) {
            console.error("Translation failed:", error.response?.data || error.message);
            res.status(500).json({ error: "Translation failed" });
        }
    }

    await translateText(); // optional: take input from req.body if needed
});

// Gemini API
app.post("/genai", async (req, res) => {
    let { message } = req.body;
    console.log(message)
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use API key from .env

    async function main(mes = "hi") {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // adjust to your model
        const result = await model.generateContent(mes);
        const response = await result.response;
        const text = await response.text();
        res.status(200).json({ reply: text });

    }

    main(message).catch((err) => console.log(err));
    // res.send(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
