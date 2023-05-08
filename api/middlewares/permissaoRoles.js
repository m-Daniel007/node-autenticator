const db = require("../models");
const Sequelize = require("sequelize");

const permissoesRoles = (listaPermissoes) => {
  return async (req, res, next) => {
    const { usuarioId } = req;
    
    const usuario = await db.usuarios.findOne({
      include: [
        {
          model: db.roles,
          as: "usuarios_role",
          attributes: ["id", "nome"],
        },
      ],
      where: {
        id: usuarioId,
      },
    });
  

    if (!usuario) {
      return res.status(401).json("Usuario não cadastrado");
    }

    let listaRolesId = [];

    Object.values(usuario.usuarios_role).map((role) => {
      listaRolesId.push(role.id);
    });

   

    if (listaRolesId.length === 0) {
      return res.status(401).json("Usuario não possui acesso a essa rota");
    }

    const roles = await db.roles.findAll({
      include: [
        {
          model: db.permissoes,
          as: "roles_permissoes",
          attributes: ["id", "nome"],
        },
      ],
      where: {
        id: {
          [Sequelize.Op.in]: listaRolesId,
        },
      },
    });

 

    let possuiPermissao = false;

    roles.map((role) => {
      possuiPermissao = role.roles_permissoes
        .map((permissao) => permissao.nome)
        .some((permissao) => listaPermissoes.includes(permissao));
    });


    if (!possuiPermissao) {
      return res.status(401).json("Usuario não tem acesso a essa rota");
    }

    return next();
  };
};

module.exports = permissoesRoles;
