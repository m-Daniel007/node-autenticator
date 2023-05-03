const { Router } = require("express");
const router = Router();
const usuarioController  = require("../controllers/usuarioController.js");

router
  .get("/usuarios")
  .post("/usuarios", usuarioController.cadastrar)
  .get("/usuarios/id/:id")
  .put("/usuarios/id/:id")
  .delete("/usuarios/id/:id");

module.exports = router;
