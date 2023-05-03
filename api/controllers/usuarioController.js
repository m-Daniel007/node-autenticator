const  usuarioService  = require("../services/usuarioService.js");

class UsuarioController {
  async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const usuario = await usuarioService.cadastrar({ nome, email, senha });

      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = new UsuarioController();