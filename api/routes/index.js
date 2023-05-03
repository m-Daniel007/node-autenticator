const express = require('express')
 
const produto = require('./produtoRoute')

module.exports = app => {
  app.use(
  express.json(),
    produto
  )
}
