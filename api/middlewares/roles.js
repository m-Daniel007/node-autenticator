const db = require("../models");

const roles = (listaRoles) => {
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
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }
    const rolesIguais = usuario.usuarios_role
      .map((role) => role.nome)
      .some((role) => listaRoles.includes(role));

    if (!rolesIguais) {
      return res.status(401).json({ message: "Usuario não autorizado!" });
    }
    return next();
  };
};
module.exports = roles;