const { DB_CONFIG } = require('./config')
const mysql = require('mysql2/promise')

async function getConnection() {
  return await mysql.createConnection(DB_CONFIG)
}

async function addPeople(name, conn) {
  const query = `INSERT INTO people (name) VALUES ('${ name }')`
  await conn.query(query)
}

async function readPeopleNames(conn) {
  const query = 'SELECT name FROM people'
  const [results] = await conn.query(query)
  return results.map(result => result.name)
}

module.exports = { getConnection, addPeople, readPeopleNames }