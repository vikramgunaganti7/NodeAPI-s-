const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, 'goodreads.db')

const initinlizeDBAndServer = async () => {
  try {
    db = await open({filename: dbPath, driver: sqlite3.Database})

    app.listen(3000, () => {
      console.log('Server Running  at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
app.get('/books/', async (request, response) => {
  const getBooksQueary = `SELECT * FROM BOOK ORDER BY book_id;`

  const bookArray = await db.all(getBooksQueary)
  response.send(bookArray)
})

initinlizeDBAndServer()
