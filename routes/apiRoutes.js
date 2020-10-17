const router = require("express").Router()
const { notes } = require('../data/notes.json');
const fs = require('fs');
const path = require('path');

// Create a new note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
    path.join(__dirname, '../data/notes.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notes;
}

// Validate the Note has the proper information
function validateNote (note) {
    if(!note.title || typeof note.title !== 'string') {
        return false
    }
    if(!note.text || typeof note.text !== 'string') {
        return false
    }
    return true
}

// Get a note request
router.get('/notes', (req, res) => {
    res.json(notes);
});

// Post a note request
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    // Send 400 error if any data req is not passed
    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted');
    } else {
    // add note to json file
    const note = createNewNote(req.body, notes);

    res.json(note);
    }
});

module.exports = router