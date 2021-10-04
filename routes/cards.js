const express = require('express')
const Card = require('../models/Card')

const router = express.Router()

router.post('/', (request, response, next) => {
  const { text, author } = request.body
  if (text === '' || author === '') {
    const error = { message: 'Information missing.' }
    return response.status(400).json(error)
  }
  const newCard = { text, author }
  Card.create(newCard)
    .then(newCard => response.status(201).json(newCard))
    .catch(error =>
      next({ status: 404, message: error.message || 'Document not found' })
    )
})

router.get('/', (request, response, next) => {
  Card.find()
    .then(allCards => response.status(200).json(allCards))
    .catch(error =>
      next({ status: 404, message: error.message || 'Document not found' })
    )
})

router.get('/:id', (request, response, next) => {
  const { id } = request.params
  Card.findById(id)
    .then(singleCard => {
      if (!singleCard) {
        throw new Error()
      }
      response.status(200).json(singleCard)
    })
    .catch(error =>
      next({ status: 404, message: error.message || 'Document not found' })
    )
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

router.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Card.findByIdAndDelete(id)
    .then(deleteCard => {
      if (!deleteCard) {
        throw new Error()
      }
      response.status(200).json(deleteCard)
    })
    .catch(error =>
      next({ status: 404, message: error.message || 'Document not found' })
    )
})

module.exports = router
