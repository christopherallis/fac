const db = require('../db')

function createEventTable() {
    db.query(`
    CREATE TABLE IF NOT EXISTS event (
        id serial PRIMARY KEY,
        eventname text NOT NULL,
        fromdate timestamp NOT NULL,
        todate timestamp NOT NULL,
        description text
    );      
    `, (err, result) => {
        if (err) { 
            console.log("ERROR:", err)
        }
    })
}

async function create(name, fromdate, todate) {
    await db.query('INSERT INTO event (name, fromdate, todate) VALUES ($1, $2, $3);', [name, fromdate, todate])
}

async function get(id) {
    let { rows } = await db.query('SELECT * FROM event WHERE id = $1;', [id])
    return rows[0]
}

async function update(id, name, fromdate, todate) {
    await db.query('UPDATE event SET name = $2, fromdate = $3, todate = $4  WHERE id = $1;', [id, name, fromdate, todate])
}

async function remove(id) {
    await db.query('DELETE FROM event WHERE id = $1;', [id])
}

createEventTable()


module.exports = { create, get, update, remove }