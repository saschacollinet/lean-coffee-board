const express = require('express')
const Card = require('../models/Card')
const { nanoid } = require('nanoid')

const router = express.Router()

let cards = [
  {
    text: 'What is MongoDB?',
    author: 'John Doe',
    id: '1',
  },
  {
    text: 'What is Node.js',
    author: 'Jane Doe',
    id: '2',
  },
]

router.post('/', (request, response) => {
  const { text, author } = request.body
  if (text === '' || author === '') {
    const error = { message: 'Information missing.' }
    return response.status(404).json(error)
  } else {
    const newCard = { text, author, id: nanoid() }
    cards = [...cards, newCard]
    // cards.push(newPost) Zweite Variante wie Zeile 26
    return response.status(201).json(newCard)
  }
})

router.get('/', (request, response) => {
  Card.find()
    .then(data => response.status(200).json(data))
    .catch(error => response.status(404).json(error))
})

router.get('/:id', (request, response) => {
  const { id } = request.params
  Card.findById(id)
    .then(singleData => response.status(200).json(singleData))
    .catch(error => response.status(404).json(error))
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { text, author } = request.body

  if (!text || !author) {
    const error = { message: 'Information missing.' }
    return response.status(404).json(error)
  }

  const card = cards.find(card => card.id === id)

  if (!card) {
    const error = { message: 'Could not find object with that id.' }
    return response.status(404).json(error)
  }

  const newCard = {
    text,
    author,
    id: card.id,
  }
  const index = cards.findIndex(card => card.id === id)
  cards = [...cards.slice(0, index), newCard, ...cards.slice(index + 1)]
  return response.status(200).json(newCard)
})

router.patch('/:id', (request, response) => {
  const { id } = request.params
  const { text, author } = request.body

  if (!text && !author) {
    const error = { message: 'Information missing.' }
    return response.status(404).json(error)
  }

  const card = cards.find(card => card.id === id)

  if (!card) {
    const error = { message: 'Could not find object with that id.' }
    return response.status(404).json(error)
  }

  const newCard = {
    text: text ? text : card.text,
    author: author ? author : card.author,
    id: card.id,
  }
  const index = cards.findIndex(card => card.id === id)
  cards = [...cards.slice(0, index), newCard, ...cards.slice(index + 1)]
  return response.status(200).json(newCard)
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  Card.findByIdAndDelete(id)
    .then(deleteData => response.status(200).json(deleteData))
    .catch(error => response.status(404).json(error))
})

module.exports = router
