const express = require('express')
const connectDatabase = require('./setupMongo')
const app = express()

const port = 3000

connectDatabase('mongodb://localhost:27017/lean-coffee-board')

app.use(express.json())

app.use('/api/cards', require('./routes/cards'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
