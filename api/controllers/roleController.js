const roleService = require("../services/roleService");

class RoleController {
  static async cadastrarRole(req, res) {
    const { nome, descricao } = req.body;

    try {
      const role = await roleService.cadastrar({
        nome,
        descricao,
      });
      return res.status(201).json(role);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  static async buscarTodasRoles(req, res) {
    try {
      const role = await roleService.buscarTodasRoles();
      res.status(200).json(role);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async buscarRolePorId(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.buscarRolePorId(id);
      res.status(200).json(role);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
  static async editarRole(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    try {
      const role = await roleService.editarRole({ id, nome, descricao });
      res.status(200).json(role);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
  static async deletarRolePorId(req, res) {
    const { id } = req.params;
    try {
      await roleService.deletarRolePorId(id);
      res.status(200).send({ message: "Role deletada com sucesso!" });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = RoleController;
