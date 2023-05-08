const { Router } = require("express");
const RoleController = require("../controllers/roleController");
const router = Router();

router
  .post("/role", RoleController.cadastrarRole)
  .get("/role", RoleController.buscarTodasRoles)
  .get("/role/:id",RoleController.buscarRolePorId)
  .put("/role/:id",RoleController.editarRole)
  .delete("/role/:id",RoleController.deletarRolePorId);

module.exports = router;
