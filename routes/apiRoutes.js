const uuid = require("uuid/v1")
const router = require("express").Router();
const fs = require('fs');
var noteList = null;
function readFromDb () {
    return new Promise ((resolve, reject) => {

    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
            reject(err)
        }
        let notes = JSON.parse(data);
        console.log(notes);
        noteList = notes;
        resolve (notes);
    });
    })
}
    router.get("/notes", (req, res) => {
        let notes = readFromDb().then (notes => {
            res.send(notes);
        }) 
        
    }); 
    router.post("/notes", async (req, res) => {
        let newNotes = req.body;
        newNotes.id = uuid()
        noteList.push(newNotes);
        console.log(noteList);
        createFile();
        res.send(noteList);
    });

    function createFile() {
        fs.writeFile("./db/db.json", JSON.stringify(noteList), (err) => {
            if (err) {
                return console.log(err);
            }
        })
    }

    module.exports = router;