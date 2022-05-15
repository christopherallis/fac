
const db = require('../db')
const bcrypt = require('bcrypt')

const pepper = process.env.PEPPER || "dev"

const iterations = 10

/*
username string
hash string
email string
permission_level int

permissions:
0 - root (creates admin users, can do all actions)
1 - admin (creates/deletes users, can do all actions)
2 - user (can create events)
3 - readonly
*/

async function hashPassword(password) {
    return await bcrypt.hash(password + pepper, iterations)
}

function createUserTable() {
    db.query('CREATE TABLE IF NOT EXISTS user (id serial PRIMARY KEY, username text UNIQUE NOT NULL, hash text NOT NULL, email text NOT NULL, permission smallint DEFAULT 3);', (err, result) => {
        if (err) { 
            console.log("ERROR:", err)
        } else {
            db.query('SELECT EXISTS(SELECT 1 FROM user WHERE username = $1)',["root"]).then((result)=>{
                if (result.rows[0].exists == false) {
                    createUser("root", "password", "friendlyarabic@gmail.com", 0).then(()=>{
                        console.log("User `root` created.")
                    })
                }
            });
        }
    })
    
    
    
}

async function createUser(username, password, email, permission) {
    let hash = await hashPassword(password)

    await db.query('INSERT INTO user (username, hash, email, permission) VALUES ($1, $2, $3, $4);', [username, hash, email, permission])
}

async function checkCredentials(username, password) {

    let { rows } = await db.query('SELECT * FROM user WHERE username = $1;', [username])
    if (rows.length > 0) {
        if (await bcrypt.compare(password + pepper, rows[0].hash)) {
            console.log("success")
            return rows[0]
        }
    }
    return null
}


async function changePermission(sessionUserID, username, permissionLevel) {
    let { rows } = await db.query('SELECT * FROM user WHERE id = $1 OR username=$2;', [sessionUserID, username])
    if (rows.length == 2) { // one user means they are changing it for themselves
        let iSU = rows[0].id == sessionUserID ? 0 : 1 // session user
        let iU = indexSessionUser == 0 ? 1 : 0 // user

        if (rows[iSU].id == sessionUserID && rows[iSU].permission <= 1 && rows[iSU].permission > rows[iU].permission && permissionLevel < rows[iSU].permission) {
            // change
            await db.query('UPDATE user SET permission=$1 WHERE username=$2;', [permissionLevel, username])
        }
    }
    return 
}

async function changePassword(username, password) {
    let hash = await hashPassword(password)

    await db.query('UPDATE user SET hash=$1 WHERE username=$2;', [hash, username])
}

createUserTable() // this creates if empty, and also creates initial admin user account


module.exports = { createUser, changePermission, changePassword , checkCredentials}