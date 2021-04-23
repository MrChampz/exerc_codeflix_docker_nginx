const { SERVER_CONFIG } = require('./config');
const faker = require('faker')

const express = require('express')
const db = require('./db');

const app = express()

app.get('/', async (req, res) => {
  const conn = await db.getConnection()
  await db.addPeople(faker.name.findName(), conn)
  const names = await db.readPeopleNames(conn)
  conn.end()

  let html = 
    '<h1>Full Cycle</h1>' +
    '<br>' +
    '<ul>'

  names.forEach(name => {
    html += `<li>${ name }</li>`
  })

  html += '</ul>'

  res.send(html)
})

app.listen(SERVER_CONFIG.port, () => {
  console.log(`App running on port ${ SERVER_CONFIG.port }`)
})