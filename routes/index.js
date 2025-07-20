
const express = require('express');
const app = express();
const axios = require("axios");

app.get('/', (req, res) => {
    res.render('App');
});

// app.post('/trans', async (req, res) => {
//     // console.log("Received translation request:", req.body);
//     async function translateText(text ="No recent rain. Weather is clear.", srcLang = "eng_Latn", tgtLang = "hin_Deva") {
//         try {
//             const response = await axios.post("http://localhost:8000/translate", {
//                 sentences: [text],
//                 src_lang: srcLang,
//                 tgt_lang: tgtLang,
//             });

//             const translated = response.data.translations[0];
//             console.log("Translated:", translated);
//             res.json({ translated });
//         } catch (error) {
//             console.error("Translation failed:", error.response?.data || error.message);
//         }
//     }


//     // if (!text || !srcLang || !tgtLang) {
//     //     return res.status(400).json({ error: "Missing required parameters" });
//     // }
//     await translateText("No recent rain. Weather is clear.");

// });
app.get('/dash', (req, res) => {
    res.render('Dash');
});

module.exports = app;