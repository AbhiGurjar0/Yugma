
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.render('App');
});

module.exports = app;