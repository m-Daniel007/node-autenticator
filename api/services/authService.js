const db = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

class AuthService {
  async login(dto) {
    const usuario = await db.usuarios.findOne({
      atrributes: ["id", "email", "senha"],
      where: {
        email: dto.email,
      },
    });
    if (!usuario) {
      throw new Error("Usuário não encontrado !");
    }
    const senhasIguais = await compare(dto.senha, usuario.senha);

    if (!senhasIguais) {
      throw new Error("Usuário ou senha incorretos !");
    }
    
    const token = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      jsonSecret.secret,
      {
        expiresIn: 300,
      }
    );
    return {message:'Você está logado !', token };
  }
}

module.exports = AuthService;
