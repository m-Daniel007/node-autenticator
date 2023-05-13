const db = require("../models");
const { hash } = require("bcryptjs");
const uuid = require("uuid");

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await db.usuarios.findOne({ where: { email: dto.email } });
    if (usuario) {
      throw new Error("Usuario já cadastrado");
    }
    try {
      const senhaHash = await hash(dto.senha, 8);
      const novoUsuario = await db.usuarios.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });
      return novoUsuario;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuario");
    }
  }
  async verificaUsuario(UsuarioId) {
    const usuario = await db.usuarios.findOne({
      where: {
        id: UsuarioId,
      },
      attributes: ["id", "nome", "createdAt", "updatedAt"],
    });
    if (!usuario) {
      throw new Error("Usuario não encontrado!");
    }
    return usuario;
  }

  async buscarTodosUsuarios() {
    const usuarios = await db.usuarios.findAll({
      include: [
        {
          model: db.roles,
          as: "usuarios_role",
          attributes: ["id", "nome", "descricao"],
          through: {
            attributes: [],
          },
        },
        {
          model: db.permissoes,
          as: "usuarios_permissao",
          attributes: ["id", "nome", "descricao"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return usuarios;
  }

  async buscarUsuariosPorId(id) {
    const usuario = await db.usuarios.findOne({
      include: [
        {
          model: db.roles,
          as: "usuarios_role",
          attributes: ["id", "nome", "descricao"],
          through: {
            attributes: [],
          },
        },
        {
          model: db.permissoes,
          as: "usuarios_permissao",
          attributes: ["id", "nome", "descricao"],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        id: id,
      },
    });

    if (!usuario) {
      throw new Error("Usuario informado não cadastrado!");
    }

    return usuario;
  }
  async editarUsuario(dto) {
    const usuario = await db.usuarios.findOne({
      where: {
        id: dto.id,
      },
    });

    try {
      usuario.nome = dto.nome;
      usuario.email = dto.email;
      await usuario.save();
      return usuario;
    } catch (error) {
      throw new Error("Erro ao editar usuario!");
    }
  }
  async deletarUsuario(id) {
    const usuario = await db.usuarios.findOne({
      where: {
        id: id,
      },
    });

    if (!usuario) {
      throw new Error("Usuario não encontrado!");
    }
    try {
      await usuario.destroy();
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
}
module.exports = new UsuarioService();
