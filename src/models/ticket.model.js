const db = require('../db')

function createTicketTable() {
    db.query(`
        CREATE TABLE IF NOT EXISTS ticket (
            id serial PRIMARY KEY,
            eventid int NOT NULL,
            personid int NOT NULL,
            dateused timestamp,
            consumed BOOLEAN DEFAULT FALSE
        );
    `, (err, result) => {
        if (err) { 
            console.log("ERROR:", err)
        }
    })
}

async function create(eventid, personid) {
    await db.query('INSERT INTO ticket (eventid, personid) VALUES ($1, $2);', [eventid, personid])
}

async function get(id) {
    let { rows } = await db.query('SELECT * FROM ticket WHERE id = $1;', [id])
    return rows[0]
}

async function getWithPerson(personid) {
    let { rows } = await db.query(`
        SELECT 
            tp.id as id, tp.dateused, tp.consumed as consumed, 
            p.id as personid, p.firstname as firstname, p.lastname as lastname, 
            e.id as eventid, e.eventname as eventname
        FROM ticket tp
        INNER JOIN event e ON e.id = tp.eventid
        INNER JOIN person p ON p.id = tp.personid
        WHERE tp.personid = $1;
    `, [personid])
    return rows
}

async function getWithPersonAndEvent(eventid, personid) {
    //TODO finish this
    let { rows } = await db.query(`
        SELECT 
            tp.id, tp.eventid, tp.personid, tp.usedate, tp.consumed, 
            p.firstname, p.lastname, 
            t.ticketname
        FROM ticket tp
        INNER JOIN ticket t ON t.id = tp.eventid
        INNER JOIN person p ON p.id = tp.personid
        WHERE tp.eventid = $1 AND tp.personid = $2;
    `, [eventid, personid])
    return rows[0]
}

async function getWithEvent(eventid) {
    let { rows } = await db.query(`
        SELECT 
            tp.id as id, tp.dateused, tp.consumed as consumed, 
            p.id as personid, p.firstname as firstname, p.lastname as lastname, 
            e.id as eventid, e.eventname as eventname, p.uuid as uuid
        FROM ticket tp
        INNER JOIN event e ON e.id = tp.eventid
        INNER JOIN person p ON p.id = tp.personid
        WHERE tp.eventid = $1;
    `, [eventid])
    return rows
}

async function consume(eventid, uuid) {
    let q1 = await db.query('SELECT * FROM person WHERE uuid = $1;', [uuid])
    if (q1.rows.length == 0) {
        throw 'User not found!'
    }

    let q2 = await db.query(`
        UPDATE ticket SET dateused = now(), consumed = TRUE 
        WHERE eventid = $1 AND personid = $2 AND consumed != TRUE;
    `, [eventid, q1.rows[0].id])
    console.log(q2.rowCount)
    if ( q2.rowCount > 0) {
        return [true, q1.rows[0]]
    }
    return [false, q1.rows[0]]
    
}

async function remove(id) {
    await db.query('DELETE FROM ticket WHERE id = $1;', [id])
}

createTicketTable()


module.exports = { create, get, getWithPerson, getWithEvent, getWithPersonAndEvent, remove, consume }