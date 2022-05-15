const db = require('../db')

function createTicketTable() {
    db.query(`
    CREATE TABLE IF NOT EXISTS ticket (
        id serial PRIMARY KEY,
        ticketname text NOT NULL,
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
    await db.query('INSERT INTO ticket (name, fromdate, todate) VALUES ($1, $2, $3);', [name, fromdate, todate])
}

async function get(id) {
    let { rows } = await db.query('SELECT * FROM ticket WHERE id = $1;', [id])
    return rows[0]
}

async function update(id, name, fromdate, todate) {
    await db.query('UPDATE ticket SET name = $2, fromdate = $3, todate = $4  WHERE id = $1;', [id, name, fromdate, todate])
}

async function remove(id) {
    await db.query('DELETE FROM ticket WHERE id = $1;', [id])
}

createTicketTable()


module.exports = { create, get, update, remove }