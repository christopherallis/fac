const db = require('../db')

function createPersonTable() {
    db.query(`
        CREATE TABLE IF NOT EXISTS person (
            id serial PRIMARY KEY,
            firstname text NOT NULL,
            lastname text NOT NULL,
            uuid text,
            email text,
            phone text
        );
      `, (err, result) => {
        if (err) { 
            console.log("ERROR:", err)
        }
    })
}

async function create(firstname, lastname) {
    await db.query('INSERT INTO person (firstname, lastname) VALUES ($1, $2);', [firstname, lastname])
}

async function getAll() {
    let { rows } = await db.query('SELECT * FROM person;')
    return rows
}

async function get(id) {
    let { rows } = await db.query('SELECT * FROM person WHERE id = $1;', [id])
    return rows[0]
}

async function update(id, firstname, lastname) {
    await db.query('UPDATE person SET firstname = $2,lastname = $3  WHERE id = $1;', [id, firstname, lastname])
}

async function setQRuuid(id, uuid) {
    await db.query('UPDATE person SET uuid = $2 WHERE id = $1;', [id, uuid])
}

async function remove(id) {
    await db.query('DELETE FROM person WHERE id = $1;', [id])
}

createPersonTable()


module.exports = { create, get, getAll, setQRuuid, update, remove }