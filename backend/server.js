const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./ReallyEstate.db');

// Get all properties
app.get('/api/properties', (req, res) => {
    db.all('SELECT * FROM properties', [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

// CREATE property
app.post('/api/properties', (req, res) => {
    const { name, image_link, location, price } = req.body;
    const sql = 'INSERT INTO properties (name, image_link, location, price) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, image_link, location, price], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ id: this.lastID, ...req.body });
    });
});

// Handle contact form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const contactInfo = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
    console.log(contactInfo);

});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


