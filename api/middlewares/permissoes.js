const db = require("../models");

const permissoes = (listaPermissoes) => {
  return async (req, res, next) => {
    const { usuarioId } = req;

    const usuario = await db.usuarios.findOne({
      include: [
        {
          model: db.permissoes,
          as: "usuarios_permissao",
          attributes: ["id", "nome"],
        },
      ],
      where: {
        id: usuarioId,
      },
    });
    console.log(usuario);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }
    const permissoesIguais = usuario.usuarios_permissao
      .map((permissao) => permissao.nome)
      .some((permissao) => listaPermissoes.includes(permissao));

    if (!permissoesIguais) {
      return res.status(401).json({ message: "Usuario não autorizado!" });
    }
    return next();
  };
};

module.exports = permissoes;
