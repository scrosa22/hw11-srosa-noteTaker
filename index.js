const express = require("express");
const path = require("path");
const fs = require("fs");

// const notesDatabase = require("./db/db.json");
const app = express();

const PORT = process.env.port || 3001;

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
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

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNote));
    
  
  
    res.json({
        message:'note created',
        status: true
    })


  console.log("note saved", newNote);

});

app.delete("/api/notes/:id", (req, res) => {
//   let noteToDelete = notesDatabase.find(x => x.id == req.params.id);

//   notesDatabase = notesDatabase.filter(x => x.id != req.params.id);

//   //Output
//   noteToDelete
//     ? res.json({
//         message: `note was deleted successfully..`,
//         status: true,
//       })
//     : res.json({
//         message: `note was not found..`,
//         status: false,
//       });

let savedNote = JSON.parse(fs.readFileSync("./db/db.json"));
res.json(savedNote[Number(req.params.id)])

});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);
