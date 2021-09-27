const { response, request } = require('express')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('This is a get request!')
})

app.post('/', (request, response) => {
  response.send('This is a post request!')
})

app.put('/', (request, response) => {
  response.send('This is a put request!')
})

app.patch('/', (request, response) => {
  response.send('This is a patch request!')
})

app.delete('/', (request, response) => {
  response.send('This is a delete request!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
