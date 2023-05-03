const { Router } = require("express");
const router = Router();
const UsuarioController = require("../controllers/usuarioController.js");

router
  .get("/usuarios",UsuarioController.buscarTodosUsuarios)
  .get("/usuarios/id/:id", UsuarioController.buscarUsuariosPorId)
  .post("/usuarios", UsuarioController.cadastrar)
  .put("/usuarios/id/:id", UsuarioController.editarUsuario)
  .delete("/usuarios/id/:id", UsuarioController.deletarUsuario);

module.exports = router;
