const db = require('../db')

function createPersonTable() {
    db.query(`
        CREATE TABLE IF NOT EXISTS person (
            id serial PRIMARY KEY,
            firstname text NOT NULL,
            lastname text NOT NULL,
            uuid text NOT NULL,
            agegroup int
        );
      `, (err, result) => {
        if (err) { 
            console.log("ERROR:", err)
        }
    })
}

async function create(firstname, lastname, uuid, agegroup) {
    await db.query('INSERT INTO person (firstname, lastname, uuid, agegroup) VALUES ($1, $2, $3, $4);', [firstname, lastname, uuid, agegroup])
}

async function getAll() {
    let { rows } = await db.query('SELECT * FROM person;')
    return rows
}

async function get(id) {
    let { rows } = await db.query('SELECT * FROM person WHERE id = $1;', [id])
    return rows[0]
}

async function update(id, firstname, lastname, uuid, agegroup) {
    await db.query('UPDATE person SET firstname = $2, lastname = $3, uuid = $4, agegroup = $5  WHERE id = $1;', [id, firstname, lastname, uuid, agegroup])
}

async function remove(id) {
    await db.query('DELETE FROM person WHERE id = $1;', [id])
}

createPersonTable()


module.exports = { create, get, getAll, update, remove }