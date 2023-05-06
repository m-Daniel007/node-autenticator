const { verify } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json("Token não informado!");
  }

  console.log("DATA ATUAL em ms ", Math.floor(Date.now() / 1000));
  try {
    const decoded = await verify(token, jsonSecret.secret);

    console.log("expira em: ", decoded.exp, "criado em: ", decoded.iat);

    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json("Token expirado!");
    }

    req.usuarioId = decoded.id;
    req.usuarioEmail = decoded.email;

    return next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(401).json("Token expirado!");
    }
  }
};
