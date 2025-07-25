import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
const app = express();
import axios from "axios";

app.get('/', (req, res) => {
    res.render('App');
});

app.post('/trans', async (req, res) => {
    // console.log("Received translation request:", req.body);
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
        }
    }


    // if (!text || !srcLang || !tgtLang) {
    //     return res.status(400).json({ error: "Missing required parameters" });
    // }
    await translateText("No recent rain. Weather is clear.");

});
app.get('/dash', (req, res) => {
    res.render('Dash');
});

// Please install OpenAI SDK first: `npm install openai`
const ai = new GoogleGenAI({});

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}

main();

export default app;