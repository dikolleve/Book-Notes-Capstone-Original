require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM books ORDER BY id ASC");
        res.render("index", {
            books: response.rows
        });
    } catch (error) {
        console.log(error)
    }  
});

app.get("/book-notes/add", (req, res) => {
    res.render("add");
});

app.post("/book-notes/add", async (req, res) => {
    const { title, author, rating, isbn, notes } = req.body;
    try {
        const cover = `https://covers.openlibrary.org/b/ISBN/${isbn}-L.jpg`;
        await db.query("INSERT INTO books (title, author, rating, notes, cover) VALUES ($1, $2, $3, $4, $5)", [title, author, rating, notes, cover]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

app.post("/book-notes/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await db.query("DELETE FROM books WHERE id = $1", [id]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

app.listen(3000, () => {
    console.log("Server running on port: 3000");
});