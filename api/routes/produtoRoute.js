const { Router } = require("express");
const ProdutoController = require("../controllers/produtoController");
const roles = require("../middlewares/roles.js");
const permissoes = require("../middlewares/permissoes.js");
const permissaoRoles = require("../middlewares/permissaoRoles.js")

const router = Router();

router
  .post("/produto", ProdutoController.cadastrarProduto)
  .get("/produto",permissoes(["cadastrar"]), ProdutoController.buscarTodosProdutos)
  .get("/produto/:id", ProdutoController.buscarProdutoPorId)
  .put("/produto/:id", ProdutoController.editarProduto)
  .delete("/produto/:id", ProdutoController.deletarProdutoPorId);

module.exports = router;
