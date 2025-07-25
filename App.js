import express from "express";
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Corrected import
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { error } from "console";
import cookieParser from "cookie-parser";
import { registerUser, loginUser } from './controllers/controller.js';
import flash from "connect-flash";
import session from "express-session";
import mongoose from "mongoose";
import connection from './config/mongoose-connection.js'; // Adjusted import path
import Field from './models/Fields.js'; // Adjusted import path

// Adjusted import path

const app = express();
app.use(flash());
const PORT = process.env.PORT || 3000;
app.use(session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using HTTPS
}));




// __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/register", registerUser);
app.use("/loginUser", loginUser);
// Routes
app.get("/", (req, res) => {
    res.render("App"); // make sure views/App.ejs exists
});

app.get("/dash", (req, res) => {
    res.render("Dash"); // make sure views/Dash.ejs exists
});
app.get('/dash/weather', (req, res) => {
    res.render('Weather');
});
app.get('/dash/waste', (req, res) => {
    res.render('Waste');
});
app.get('/dash/field', async (req, res) => {
    let field = await Field.find({});
    res.render('Fields', { field }); // make sure views/Fields.ejs exists
});
app.get("/login", (req, res) => {
    res.render("login"); // make sure views/App.ejs exists
});
app.post('/fields', async (req, res) => {
    try {
        const { cropName, Area } = req.body;
        const newField = new Field({ cropName, Area });
        await newField.save();
        res.redirect('/dash'); // or render success page
    } catch (err) {
        console.error(err);
        res.status(400).send("Error saving field data");
    }
});
app.post('/addIR', async (req, res) => {
    try {
        const { Id } = req.body;
        console.log(Id)
        const fields = await Field.findById(Id);
        if (!fields) {
            return res.status(404).send("Field not found");
        }
        fields.isIrrigationAdded = true;
        await fields.save();
        let field = await Field.find({});

        res.redirect('/dash/field'); // or render success page
    } catch (err) {
        console.error(err);
        res.status(400).send("Error saving field data");
    }
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
