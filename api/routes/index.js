const express = require("express");
const morgan = require("morgan");
const produto = require("./produtoRoute");
const usuario = require("./usuarioRoute");
const auth = require("./authRoute");
const roles = require("./rolesRoute");
const permissao = require("./permissaoRoute");
const seguranca = require("./segurancaRoute");

module.exports = (app) => {
  app.use(
    express.json(),
    morgan("dev"),
    auth,
    usuario,
    produto,
    roles,
    permissao,
    seguranca
  );
};
