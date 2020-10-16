const fs = require('fs');
const path = require('path');
const { notes } = require('./data/notes.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const router = require('express').Router();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// Make files available
app.use(express.static('public'));

// Create a new note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './data/notes.json'),
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

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// send to index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// send to notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/notes', (req, res) => {
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

// server setup
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});