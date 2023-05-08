const db = require("../models");
const Sequelize = require("sequelize");

class SegurancaService {
  async cadastrarAcl(dto) {
    const usuario = await db.usuarios.findOne({
      include: [
        {
          model: db.roles,
          as: "usuarios_role",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: db.permissoes,
          as: "usuarios_permissao",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.usuarioId,
      },
    });
    if (!usuario) {
      throw new Error("Usuario não encontrado!");
    }

    const rolesCadastradas = await db.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles,
        },
      },
    });
    const permissoesCadastradas = await db.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });
    await usuario.removeUsuarios_role(usuario.usuario_role);
    await usuario.removeUsuarios_permissao(usuario.usuario_permissao);

    await usuario.addUsuarios_role(rolesCadastradas);
    await usuario.addUsuarios_permissao(permissoesCadastradas);

    const novoUsuario = await db.usuarios.findOne({
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
    return novoUsuario;
  }

  async cadastrarPermissoesRoles(dto) {
    const role = await db.roles.findOne({
      include: [
        {
          model: db.permissoes,
          as: "roles_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
    });
    if (!role) {
      throw new Error("Role não cadastrada!");
    }
    const permissoesCadastradas = await db.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });
    await role.removeRoles_permissoes(role.roles_permissoes);
    await role.addRoles_permissoes(permissoesCadastradas);

    const novaRole = await db.roles.findOne({
      include: [
        {
          model: db.permissoes,
          as: "roles_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.roleId,
      },
    });
    return novaRole;
  }
}

module.exports = new SegurancaService();
