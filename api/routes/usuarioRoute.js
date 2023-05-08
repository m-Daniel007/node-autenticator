const { Router } = require("express");
const router = Router();
const UsuarioController = require("../controllers/usuarioController.js");
const autenticado = require("../midleware/autenticado.js");


router
  .post("/usuarios", UsuarioController.cadastrar)
  .use(autenticado)
  .get("/usuarios",  UsuarioController.buscarTodosUsuarios)
  .get("/usuarios/:id", UsuarioController.buscarUsuariosPorId)
  .put("/usuarios/:id", UsuarioController.editarUsuario)
  .delete("/usuarios/:id", UsuarioController.deletarUsuario);

module.exports = router;
