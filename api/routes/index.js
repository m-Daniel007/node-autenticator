const express = require("express");
const morgan = require("morgan");
const produto = require("./produtoRoute");
const usuario = require("./usuarioRoute");
const auth = require("./authRoute");

module.exports = (app) => {
  app.use(morgan("dev"), express.json(), auth, produto, usuario);
};
