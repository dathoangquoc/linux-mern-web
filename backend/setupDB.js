const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ReallyEstate.db');

db.serialize(() => {
    db.run(' DROP TABLE IF EXISTS properties');

    db.run(`CREATE TABLE properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        image_link TEXT,
        location TEXT NOT NULL,
        price REAL NOT NULL
    )`);

    // Insert sample data
    const stmt = db.prepare("INSERT INTO properties (name, image_link, location, price) VALUES (?, ?, ?, ?)");
    stmt.run('Luxury Villa', 'https://images.unsplash.com/photo-1717167398882-15d1cefd22f6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Beverly Hills, CA', 2500000.00);
    stmt.run('Beachfront Apartment', 'https://images.unsplash.com/photo-1669071192880-0a94316e6e09?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhY2glMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D', 'Miami, FL', 1200000.00);
    stmt.run('Country House', 'https://images.unsplash.com/photo-1683923389483-3d78da3683e9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y291bnRyeSUyMGhvdXNlfGVufDB8fDB8fHww', 'Nashville, TN', 850000.00);
    stmt.finalize();
});

db.close();

