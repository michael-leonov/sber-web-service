const { Card } = require("../models/models");
const ApiError = require("../error/ApiError");

const create = async (req, res, next) => {
  try {
    const { title, description, userId } = req.body;

    if (title.length > 100) {
      return next(ApiError.badRequest("Слишком длинный заголовок"));
    }

    const card = await Card.create({ title, description, userId });
    return res.json(card);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

const getAll = async (req, res) => {
  let { userId, page, limit } = req.query;

  page = page || 1;
  limit = limit || 10;

  let offset = page * limit - limit;

  let cards;

  if (userId) {
    cards = await Card.findAll({
      where: { userId },
      limit: Number(limit),
      offset: Number(offset),
    });
  } else {
    cards = await Card.findAll({
      limit: Number(limit),
      offset: Number(offset),
    });
  }

  return res.json(cards);
};

module.exports = { create, getAll };
