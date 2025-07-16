
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/dash', (req, res) => {
    res.render('dashboard');
});
app.get('/App', (req, res) => {
    res.render('App');
});
module.exports = app;