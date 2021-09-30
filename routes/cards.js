const express = require('express')
const Card = require('../models/Card')

const router = express.Router()

router.post('/', (request, response) => {
  const { text, author } = request.body
  if (text === '' || author === '') {
    const error = { message: 'Information missing.' }
    return response.status(400).json(error)
  }
  const newCard = { text, author }
  Card.create(newCard)
    .then(newCard => response.status(201).json(newCard))
    .catch(error => response.status(404).json(error))
})

router.get('/', (request, response) => {
  Card.find()
    .then(allCards => response.status(200).json(allCards))
    .catch(error => response.status(404).json(error))
})

router.get('/:id', (request, response) => {
  const { id } = request.params
  Card.findById(id)
    .then(singleCard => response.status(200).json(singleCard))
    .catch(error => response.status(404).json(error))
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { text, author } = request.body
  if (!text || !author) {
    const error = { message: 'Information missing.' }
    return response.status(404).json(error)
  }
  Card.findByIdAndUpdate(id, { text, author }, { new: true })
    .then(updateCard => response.status(200).json(updateCard))
    .catch(error => response.status(400).json(error))
})

router.patch('/:id', (request, response) => {
  const { id } = request.params
  const { text, author } = request.body
  if (!text && !author) {
    const error = { message: 'Information missing.' }
    return response.status(400).json(error)
  }
  Card.findByIdAndUpdate(id, { text, author }, { new: true })
    .then(updateCard => response.status(200).json(updateCard))
    .catch(error => response.status(400).json(error))
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  Card.findByIdAndDelete(id)
    .then(deleteCard => response.status(200).json(deleteCard))
    .catch(error => response.status(404).json(error))
})

module.exports = router
