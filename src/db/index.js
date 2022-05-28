const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL

const isProd = process.env.NODE_ENV === 'production'

console.log(connectionString)

const pool = new Pool({
    connectionString: connectionString,
    ssl: isProd ? { rejectUnauthorized: false } : false,
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}