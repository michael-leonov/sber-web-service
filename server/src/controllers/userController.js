const { User } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
};

const signUp = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return next(ApiError.badRequest("Некорректный логин или пароль"));
    }

    const candidate = await User.findOne({ where: { name } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким логином уже существует")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({ name, password: hashPassword });

    const token = generateAccessToken(user.id, user.name);

    return res.json({ user, token });
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

const signIn = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return next(ApiError.badRequest("Некорректный логин или пароль"));
    }

    const user = await User.findOne({ where: { name } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }

    const token = generateAccessToken(user.id, user.name);

    return res.json({ user, token });
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

const check = async (req, res) => {
  const token = generateAccessToken(req.user.id, req.user.name);

  return res.json({ token });
};

module.exports = { signUp, signIn, check };
