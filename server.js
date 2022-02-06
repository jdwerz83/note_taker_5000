const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5643;

app.use(express.static("./Develop/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/db/db.json"));
});

app.get("*", (rec, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
  let noteLength = noteList.length.toString();

  newNote.id = noteLength;
  noteList.push(newNote);

  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
