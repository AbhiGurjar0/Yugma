import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Corrected import
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
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
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use API key from .env

async function main(text) {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // adjust to your model
    const result = await model.generateContent(text);
    const response = await result.response;
    console.log(response.text());
}

main('HI how are you').catch(console.error);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
