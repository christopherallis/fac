const db = require('../db')

function createTicketTable() {
    db.query(`
        CREATE TABLE IF NOT EXISTS ticketperson (
            id serial PRIMARY KEY,
            ticketid int NOT NULL,
            personid int NOT NULL,
            dateused timestamp,
            consumed BOOLEAN
        );
    `, (err, result) => {
        if (err) { 
            console.log("ERROR:", err)
        }
    })
}

async function create(ticketid, personid) {
    await db.query('INSERT INTO ticketperson (ticketid, personid) VALUES ($1, $2);', [ticketid, personid])
}

async function get(id) {
    let { rows } = await db.query('SELECT * FROM ticketperson WHERE id = $1;', [id])
    return rows[0]
}

async function getTicketWithPerson(ticketid, personid) {
    //TODO finish this
    let { rows } = await db.query(`
        SELECT 
            tp.id, tp.ticketid, tp.personid, tp.usedate, tp.consumed, 
            p.firstname, p.lastname, 
            t.ticketname
        FROM ticketperson tp
        INNER JOIN ticket t ON t.id = tp.ticketid
        INNER JOIN person p ON p.id = tp.personid
        WHERE tp.ticketid = $1 AND tp.personid = $2;
    `, [ticketid, personid])
    return rows[0]
}

async function consume(id) {
    await db.query('UPDATE ticketperson SET dateused = now(), consumed = $2 WHERE id = $1;', [id, true])
}

async function remove(id) {
    await db.query('DELETE FROM ticketperson WHERE id = $1;', [id])
}

createTicketTable()


module.exports = { create, get, getTicketWithPerson, remove, consume }