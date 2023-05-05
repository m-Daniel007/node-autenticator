const { verify } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  
  if (!token || !authHeader) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const decoded = verify(token, jsonSecret.secret);

    req.usuarioId = decoded.id;
    req.usuarioEmail = decoded.email;
    return next();
  } catch (error) {
    res.status(401).json("Token inválido!");
  }
};
