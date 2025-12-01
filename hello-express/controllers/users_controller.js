const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CRUD operaties
const usersController = {
  getAll: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          isVerified: false,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          birthDate: true,
        },
      });
      res.json(users);
    } catch (error) {
      res.sendStatus(500);
    }
  },
  create: async (req, res) => {
    try {
      const userData = req.body;

      const hashedPassword = await bcrypt.hash(userData.password, 12);

      const newUser = await prisma.user.create({
        data: { ...userData, password: hashedPassword },
      });

      const token = jwt.sign({ sub: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });

      res
        .cookie("web3Token", token, {
          httpOnly: true,
          secure: false,
          expires: new Date(Date.now() + 5 * 60 * 1000),
        })
        .status(201)
        .json(newUser);
    } catch (error) {
      res.sendStatus(500);
    }
  },
  login: async (req, res) => {
    // TODO: Login methode
    // Email en wachtwoord uit body
    // findUnique({ where: { email: ...}})
    // const result = await bcrypt.compare(plainText, hash);
    // Dan stuur je server cookie met token in
  },
};

module.exports = usersController;
