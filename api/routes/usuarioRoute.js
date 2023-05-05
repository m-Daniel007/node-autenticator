const { Router } = require("express");
const router = Router();
const UsuarioController = require("../controllers/usuarioController.js");
const autenticado = require("../midleware/autenticado.js")


router
  .get("/usuarios", autenticado, UsuarioController.buscarTodosUsuarios)
  .get("/usuarios/id/:id", UsuarioController.buscarUsuariosPorId)
  .post("/usuarios", UsuarioController.cadastrar)
  .put("/usuarios/id/:id", UsuarioController.editarUsuario)
  .delete("/usuarios/id/:id", UsuarioController.deletarUsuario);

module.exports = router;
