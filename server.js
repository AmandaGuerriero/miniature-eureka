const fs = require('fs');
const path = require('path');
const { notes } = require('./data/notes.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// Make files available
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// app.get('/api/animals', (req, res) => {
//     let results = animals;
//     if (req.query) {
//         results = filterByQuery(req.query, results);
//     }
//     res.json(results);
// });

// send to index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// send to notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// server setup
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});