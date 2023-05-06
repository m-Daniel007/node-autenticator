const { Router } = require("express");
const router = Router();
const UsuarioController = require("../controllers/usuarioController.js");
const autenticado = require("../midleware/autenticado.js");

router.use(autenticado);
router
  .post("/usuarios", UsuarioController.cadastrar)
  .get("/usuarios", UsuarioController.buscarTodosUsuarios)
  .get("/usuarios/id/:id", UsuarioController.buscarUsuariosPorId)
  .put("/usuarios/id/:id", UsuarioController.editarUsuario)
  .delete("/usuarios/id/:id", UsuarioController.deletarUsuario);

module.exports = router;
