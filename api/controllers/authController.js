const AuthService = require("../services/authService.js");
const authService = new AuthService();

class AuthController {
  static async login(req, res) {
    const { email, senha } = req.body;

    console.log(senha)
    try {
      const login = await authService.login({ email, senha });
      return res.status(200).json(login);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
