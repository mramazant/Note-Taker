const apiRoutes = require("./routes/apiRoutes");
const express = require('express');
const fs = require('fs');
const path = require('path');
// const note = require("./db/db.json")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use('/api', apiRoutes);
//routes

app.listen(PORT, () => {
    console.log('App listening on PORT' + PORT)
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
