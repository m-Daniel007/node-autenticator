const autenticado = require("../middlewares/autenticado.js");
const usuarioService = require("../services/usuarioService.js");

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const usuario = await usuarioService.cadastrar({ nome, email, senha });

      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async verificaUsuario(req, res) {
    const { usuarioId } = req;
   
    try {
      const resultado = await usuarioService.verificaUsuario(usuarioId);
      if(resultado instanceof Error){
        return res.status(400).json({ message: resultado.message });
      }
      return res.json(resultado);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async buscarTodosUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.buscarTodosUsuarios();

      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async buscarUsuariosPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.buscarUsuariosPorId(id);
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  static async editarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
      const usuario = await usuarioService.editarUsuario({
        id,
        nome,
        email,
      });
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  static async deletarUsuario(req, res) {
    const { id } = req.params;
    try {
      await usuarioService.deletarUsuario(id);
      return res.status(200).send({ message: "Usuario deletado com sucesso!" });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
