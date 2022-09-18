const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");

const app = express();

const PORT = process.env.port || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.get("/api/notes/:id", (req, res) => {
  let savedNote = JSON.parse(fs.readFileSync("./db/db.json"));
  res.sendFile(savedNote[Number(req.params.id)]);
});

app.post("/api/notes", function (req, res) {
  let savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let userID = savedNote.length.toString();
  newNote.id = userID;
  savedNote.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(savedNote))

  console.log("note saved", savedNote);

  res.json(savedNote);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} ;)`)
);
