const db = require("../models");
const uuid = require("uuid");
class RoleService {
  async cadastrar(dto) {
    const role = await db.roles.findOne({
      where: {
        nome: dto.nome,
      },
    });
    if (role) {
      throw new Error("Role já cadastrada!");
    }
    try {
      const newRole = await db.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });
      return newRole;
    } catch (error) {
      throw new Error("Erro ao cadastrar role!");
    }
  }
  async buscarTodasRoles() {
    const role = await db.roles.findAll();

    try {
      return role;
    } catch (error) {
      throw new Error("Erro ao recuperar roles!");
    }
  }
  async buscarRolePorId(id) {
    const role = await db.roles.findOne({
      where: {
        id: id,
      },
    });

    if (!role) {
      throw new Error("Role informada não cadastrada!");
    }
    return role;
  }
  async editarRole(dto) {
    const role = await db.roles.findOne({
      where: {
        id: dto.id,
      },
    });
    if (!role) {
      throw new Error("Role informada não cadastrada!");
    }
    try {
      (role.nome = dto.nome), (role.descricao = dto.descricao);
      await role.save();
      return await role.reload();
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }
  async deletarRolePorId(id) {
    const role = await db.roles.findOne({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new Error("Role informada não cadastrada!");
    }
    try {
      await db.roles.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }
}

module.exports = new RoleService();
