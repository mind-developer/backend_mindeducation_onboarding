const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ error: "Não foi possivel mostrar os usuarios" });
    }
  },
  async store(req, res) {
    try {
      const data = req.body;

      const user = await User.create(data);
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.json({ error: "Não foi possivel criar o usuario" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 8);
      }
      const user = await User.update(data, {
        where: { id },
      });

      return res.json({ message: "Atualizado com sucesso!" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Não foi possivel atualizar o usuario" });
    }
  },
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.destroy({
        where: { id },
      });
      return res.json({ message: "Deletado com sucesso!" });
    } catch (err) {
      return res.json({ error: "Não foi possivel deletar o usuario" });
    }
  },
};
