const { verify, decode } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json("Token não informado!");
  }

  
  try {
    verify(token, jsonSecret.secret);
    //const { sub: usuarioId, email: usuarioEmail } = decode(token);
    const decoded =  decode(token);

    req.usuarioId = decoded.sub;
    req.usuarioEmail = decoded.email;

    console.log("DATA ATUAL em MS ", Math.floor(Date.now() / 1000));
    console.log("CRIADO EM : ", decoded.iat, "EXPIRA EM: ", decoded.exp);

    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json("Token expirado!");
    }

    // req.usuarioId = usuarioId;
    // req.usuarioEmail = usuarioEmail;
    next();

  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(401).json("Token expirado!");
    }
    return res.status(401).json({ message: error.message });
  }

  //   const decoded = await verify(token, jsonSecret.secret);

   

  //   req.usuarioId = decoded.id;
  //   req.usuarioEmail = decoded.email;

  //   return next();
  // } catch (error) {
  
  // }
};
