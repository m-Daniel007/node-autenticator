const express = require("express");
const morgan = require("morgan");
const produto = require("./produtoRoute");
const usuario = require("./usuarioRoute");

module.exports = (app) => {
  app.use(morgan("dev"), express.json(), produto, usuario);
};
