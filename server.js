const fs = require('fs');
const path = require('path');
const { notes } = require('./data/notes.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// Make files available
app.use(express.static('public'));

// Route to api & hmtl files
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// server setup
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});