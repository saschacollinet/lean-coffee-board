const express = require('express')
const connectDatabase = require('./setupMongo')
const errorHandler = require('./errorHandler')
require('dotenv').config()
// const dotenv = require('dotenv')
//dotenv.config()

const app = express()

const { PORT, MONGODB_URI } = process.env
// const port = process.env.PORT

connectDatabase(MONGODB_URI)

app.use(express.json())

app.use('/api/cards', require('./routes/cards'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
