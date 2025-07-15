const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const index = require('./routes/index');
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use('/', index);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 