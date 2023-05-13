const db = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

class AuthService {
  async login(dto) {
    const usuario = await db.usuarios.findOne({
      attributes: ["id", "email", "senha", "nome"],
      where: {
        email: dto.email,
      },
    });

    if (!usuario) {
      throw new Error("Usuario não cadastrado");
    }

    const senhaIguais = await compare(dto.senha, usuario.senha);

    if (!senhaIguais) {
      throw new Error("Usuario ou senha invalido");
    }

    const { secret, expiresIn } = jsonSecret;
    const accessToken = sign(
      {
        email: usuario.email,
      },
      secret,

      {
        expiresIn: expiresIn,
        subject: usuario.id.toString(),
      }
    );
    return { message: ` Você está logado, ${usuario.nome} `, accessToken };
  }
}

module.exports = AuthService;
