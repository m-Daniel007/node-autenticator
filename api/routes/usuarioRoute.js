const { Router } = require("express");
const router = Router();
const UsuarioController = require("../controllers/usuarioController.js");
const autenticado = require("../middlewares/autenticado.js");

router
  .post("/usuarios", UsuarioController.cadastrar)
  .use(autenticado)
  .post("/usuarios/me", UsuarioController.verificaUsuario)
  .get("/usuarios", UsuarioController.buscarTodosUsuarios)
  .get("/usuarios/:id", UsuarioController.buscarUsuariosPorId)
  .put("/usuarios/:id", UsuarioController.editarUsuario)
  .delete("/usuarios/:id", UsuarioController.deletarUsuario);

module.exports = router;
