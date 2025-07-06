require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(3000, () => {
    console.log("Server running on port: 3000");
});